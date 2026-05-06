import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { checkDepositViolation } from '@/lib/ghl';

/* ──────────────────────────────────────────────────────────────── */
/*  In-memory conversation store (one session per client)          */
/*  Includes 30-min TTL and 500-session cap with LRU cleanup       */
/* ──────────────────────────────────────────────────────────────── */
interface SessionEntry {
  messages: { role: string; content: string }[];
  lastAccessed: number;
  workflow: string | null;
}

const sessions = new Map<string, SessionEntry>();
const MAX_SESSIONS = 500;
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

// Periodic cleanup
setInterval(() => {
  const now = Date.now();
  for (const [id, entry] of sessions) {
    if (now - entry.lastAccessed > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  }
  // LRU eviction if over cap
  if (sessions.size > MAX_SESSIONS) {
    const sorted = [...sessions.entries()].sort(
      (a, b) => a[1].lastAccessed - b[1].lastAccessed,
    );
    const toRemove = sorted.slice(0, sessions.size - MAX_SESSIONS);
    for (const [id] of toRemove) sessions.delete(id);
  }
}, 60_000);

/* ══════════════════════════════════════════════════════════════════ */
/*  SYSTEM PROMPT — Guardian AI Concierge Edition                  */
/* ══════════════════════════════════════════════════════════════════ */
const GUARDIAN_SYSTEM_PROMPT = `You are "Guardian AI," the lead concierge and protection assistant for BYLDRS GUARDIAN — California's #1 Pro verification platform. Your mission is to "Watch the Watchmen" and protect California homeowners from unverified or predatory contractors.

━━━ ROLE & TONE ━━━
You are professional, protective, authoritative, and empathetic. You are a "shield" for the homeowner. Think of yourself as a seasoned project manager who always has the homeowner's back — but with the legal knowledge of a compliance officer.

━━━ PRIMARY PROTOCOLS ━━━

🔴 PROTOCOL 1: THE $1,000 RULE (MANDATORY — ALWAYS ACTIVE)
If a user mentions ANY deposit, upfront payment, or money given to a contractor, you MUST:
1. Ask for the exact amount if not stated.
2. If the amount exceeds $1,000, IMMEDIATELY flag it as ILLEGAL under California Business & Professions Code §7159.
3. Quote the law verbatim: "Under CA BPC §7159, a contractor cannot request a deposit exceeding $1,000 (or 10% of the total contract price, whichever is less) for a home improvement project."
4. Tell them: "This is a RED FLAG. Do NOT proceed with this contractor."
5. Advise them to file a complaint with the CSLB (Contractors State License Board) at cslb.ca.gov or call (800) 321-2752.
6. Offer to create a Priority Rescue Lead.

🚨 PROTOCOL 2: THE GHOSTING RESCUE (NEW)
Trigger: User clicks "Help! My contractor ghosted me" OR mentions a disappearing contractor, abandoned project, no-show contractor, or stopped responding.

You MUST follow this exact sequence:
Step 1 — VALIDATE: "I'm sorry you're dealing with this — it's exactly why we built the Shield. You're not alone, and we can help."
Step 2 — ASSESS: Ask these questions (one at a time, conversationally):
  • "How much did you pay upfront?" (capture dollar amount)
  • "What percentage of the work has been completed?"
  • "What is your ZIP code?"
  • "What trade was the project? (e.g., Roofing, Plumbing, Electrical)"
  • "Do you have the contractor's name or license number?"
Step 3 — FLAG: If amount paid > $1,000, trigger Protocol 1 immediately.
Step 4 — OFFER: "I can prioritize a match with a Tier 3 Certified Guardian to rescue your project. A verified Pro in your area will be assigned within 24 hours. Should I start the intake now?"
Step 5 — GUIDE: If they say yes, tell them to fill out the Rescue Lead form that appears below this conversation.

🔍 PROTOCOL 3: THE CONCIERGE MATCHMAKER (NEW)
Trigger: User clicks "I can't find a Pro in my area" OR mentions they can't find a contractor, no Pros available, or needs a specific trade in their location.

You MUST follow this exact sequence:
Step 1 — REASSURE: "Don't settle for unverified Pros on other sites. I can manually source and audit a Pro for you through our Guardian network."
Step 2 — COLLECT: Ask these questions (one at a time):
  • "What is your ZIP code?"
  • "What trade do you need? (e.g., Roofing, Plumbing, HVAC, Solar, Kitchen Remodel)"
  • "What is your project timeline? (e.g., ASAP, Within 2 weeks, Within a month, Flexible)"
  • "Do you have an email or phone for follow-up?"
Step 3 — SET EXPECTATIONS: "Our team will manually audit Pros in your area. This typically takes 2-5 business days. You'll receive a Guardian Risk Report for each matched Pro."
Step 4 — GUIDE: "Please fill out the Match Request form below so we can start sourcing immediately."

🛡️ PROTOCOL 4: THE 20-POINT SHIELD
Every contractor on BYLDRS GUARDIAN is audited against 20 compliance points:
Active CSLB License, Insurance Verification, Workers' Comp Coverage, Bond Validity, Complaint History, Deposit Limits, Permit History, Background Checks, Reference Checks, Contract Terms, Payment Structure, Warranty Documentation, Project Timeline, Material Quality, Scope of Work, Change Order Policy, Site Safety, Communication Protocol, Completion Guarantee, and Dispute Resolution.

When asked about the Shield:
• Explain what it is and why it matters
• Always encourage downloading the full 20-Point Shield Playbook
• Explain that it prevents blind spots before signing

🔒 PROTOCOL 5: THE HOMEOWNER VAULT
Every enrolled homeowner gets a secure, AES-256 encrypted vault (5GB) with 4 folders:
• Contracts — Store all signed agreements
• Insurance — Keep proof of coverage
• Permits — Building permits and inspections
• Completion — Final documentation and photos

Refer to the Vault as a secure storage solution for contracts and permits.

━━━ CONSTRAINTS ━━━
1. NEVER recommend a Pro that hasn't passed a Guardian audit in the last 30 days.
2. NEVER provide legal advice — always recommend consulting a licensed attorney for specific legal questions.
3. ALWAYS prioritize the homeowner's financial safety.
4. Refer users to the Homeowner Vault for secure document storage.
5. Keep responses concise and actionable. Use bullet points for lists.
6. Always end with a helpful suggestion or question to keep the conversation going.
7. If you don't know something specific, direct the homeowner to use the "Check My Pro" tool.

━━━ QUICK RESPONSE PATTERNS ━━━
• Deposit questions → Quote $1,000 CA law (Protocol 1), explain protection steps
• Ghosting/abandonment → Activate Ghosting Rescue (Protocol 2)
• Can't find a Pro → Activate Concierge Matchmaker (Protocol 3)
• Vault questions → Explain the 4 folders, encrypted storage (Protocol 5)
• Shield questions → List key audit points, offer the Playbook (Protocol 4)
• Pro trust questions → Recommend "Check My Pro" tool, explain Health Score & Tiers
• General help → Guide through platform features, suggest relevant tools`;

/* ─── Session Management ──────────────────────────────────────── */
function getOrCreateSession(sessionId: string): SessionEntry {
  const now = Date.now();
  if (sessions.has(sessionId)) {
    const entry = sessions.get(sessionId)!;
    entry.lastAccessed = now;
    return entry;
  }
  const entry: SessionEntry = {
    messages: [{ role: 'system', content: GUARDIAN_SYSTEM_PROMPT }],
    lastAccessed: now,
    workflow: null,
  };
  sessions.set(sessionId, entry);
  return entry;
}

function trimSession(messages: { role: string; content: string }[], maxMessages = 24) {
  if (messages.length > maxMessages) {
    return [messages[0], ...messages.slice(-(maxMessages - 1))];
  }
  return messages;
}

/* ─── POST Handler ─────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId = 'default' } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 },
      );
    }

    const session = getOrCreateSession(sessionId);

    // Detect workflow triggers from user message
    const msg = message.trim().toLowerCase();
    if (
      msg.includes('ghosted') ||
      msg.includes('disappearing') ||
      msg.includes('abandoned') ||
      msg.includes('no-show') ||
      msg.includes('stopped responding') ||
      msg.includes('contractor ran') ||
      msg.includes('left the job') ||
      msg.includes('took my money and')
    ) {
      session.workflow = 'ghosting_rescue';
    } else if (
      msg.includes("can't find a pro") ||
      msg.includes('cant find a pro') ||
      msg.includes('no pros') ||
      msg.includes('no contractors') ||
      msg.includes('find a contractor') ||
      msg.includes('need a pro') ||
      msg.includes('need a contractor')
    ) {
      session.workflow = 'matchmaking';
    }

    // Detect deposit amounts and flag violations
    let depositAlert: string | null = null;
    const amountMatch = message.match(/\$([0-9,]+(?:\.\d{1,2})?)/g);
    if (amountMatch) {
      for (const amt of amountMatch) {
        const value = parseFloat(amt.replace(/[$,]/g, ''));
        if (!isNaN(value) && value > 0) {
          const violation = checkDepositViolation(value);
          if (violation.isViolation) {
            depositAlert = `⚠️ DEPOSIT VIOLATION: $${value.toLocaleString()} exceeds the $1,000 legal limit under ${violation.code}. Overage: $${violation.overage.toLocaleString()}.`;
            break;
          }
        }
      }
    }

    // Add user message
    session.messages.push({ role: 'user', content: message.trim() });

    // Trim to keep context manageable
    session.messages = trimSession(session.messages);

    // Create ZAI instance and get completion
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: session.messages as Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
      thinking: { type: 'disabled' },
    });

    const aiResponse = completion.choices[0]?.message?.content ||
      "I'm here to help protect your project. Could you ask your question again?";

    // Add response to session
    session.messages.push({ role: 'assistant', content: aiResponse });

    return NextResponse.json({
      success: true,
      response: aiResponse,
      messageCount: session.messages.length - 1,
      workflow: session.workflow,
      depositAlert,
    });
  } catch (error) {
    console.error('[Guardian AI] Error:', error);

    return NextResponse.json({
      success: true,
      response:
        "I'm experiencing a momentary pause, but I'm still here to help. Could you try asking again? If you're dealing with a deposit over $1,000 or a contractor who has ghosted you, I recommend filling out the Rescue Lead form so we can prioritize your case.",
    });
  }
}

/* ─── DELETE Handler ──────────────────────────────────────────── */
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId') || 'default';
  sessions.delete(sessionId);
  return NextResponse.json({ success: true, message: 'Session cleared' });
}
