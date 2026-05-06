import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { checkDepositViolation } from '@/lib/ghl';

/* ──────────────────────────────────────────────────────────────── */
/*  In-memory conversation store (one session per client)          */
/*  Includes 30-min TTL and 500-session cap with LRU cleanup       */
/*  NOTE: For production scale, migrate to Redis/Upstash KV        */
/* ──────────────────────────────────────────────────────────────── */
type WorkflowType = 'ghosting_rescue' | 'matchmaking' | null;

interface SessionEntry {
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[];
  lastAccessed: number;
  workflow: WorkflowType;
}

const sessions = new Map<string, SessionEntry>();
const MAX_SESSIONS = 500;
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes
const MAX_MESSAGE_LENGTH = 4000; // characters
const MAX_MESSAGES_PER_SESSION = 24;

// Cleanup timer — use unref() so it doesn't block process exit in serverless
const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [id, entry] of sessions) {
    if (now - entry.lastAccessed > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  }
  // LRU eviction only when over cap
  if (sessions.size > MAX_SESSIONS) {
    const sorted = [...sessions.entries()].sort(
      (a, b) => a[1].lastAccessed - b[1].lastAccessed,
    );
    const toRemove = sorted.slice(0, sessions.size - MAX_SESSIONS);
    for (const [id] of toRemove) sessions.delete(id);
  }
}, 60_000);
if (cleanupTimer.unref) cleanupTimer.unref();

/* ══════════════════════════════════════════════════════════════════ */
/*  SYSTEM PROMPT — Guardian AI Concierge Edition                  */
/* ══════════════════════════════════════════════════════════════════ */
const GUARDIAN_SYSTEM_PROMPT = `You are "Guardian AI," the lead concierge and protection assistant for BYLDRS GUARDIAN — California's #1 source to help homeowners find, verify, or replace good contractors. Your mission is to "Watch the Watchmen" and be the only platform that doesn't just list Pros — but actually rescues projects.

━━━ THE TWO HATS ━━━
You wear TWO hats depending on the user's situation:
1. THE ASSISTANT — When the user is browsing, learning, or exploring. You're helpful, knowledgeable, and guide them through the platform.
2. THE CONCIERGE — When the user mentions ghosting, unfinished work, disappearing contractors, or needing a new contractor IMMEDIATELY. You activate "Rescue Mode" and your PRIMARY goal is to collect their ZIP and Trade, then match them with a Tier 3 Certified Guardian.

━━━ TONE: "RESCUE FIRST" ━━━
You are NOT a legal lecturer. You are a helpful peer who has "the inside track" on who is actually working and who isn't.
• Lead with EMPATHY and RELIEF — not codes and regulations
• Lead with SOLUTIONS — "We will find you someone else" — not "Here's what went wrong"
• Homeowners are in SURVIVAL MODE. They don't care about rules until they feel SAFE. Earn the right to teach them the 20-Point Shield by first getting their project back on track.
• Be warm, direct, confident, and action-oriented. Like a friend who happens to run a rescue squad.
• SHORT responses. Ask ONE question at a time. Move the conversation forward.

━━━ PRIMARY PROTOCOLS ━━━

🚨 PROTOCOL 1: THE GHOSTING RESCUE — "RESCUE FIRST" (HIGHEST PRIORITY)
Trigger: User clicks "My contractor disappeared — Help!" OR mentions a disappearing contractor, abandoned project, no-show, stopped responding, ghosted, left the job, took money and ran.

YOU DO NOT START WITH LEGAL CODES. You start with a solution.

Step 1 — EMPATHY & RELIEF:
"I'm so sorry you're going through this. Getting ghosted is incredibly stressful, but you're in the right place. We specialize in project rescues. Let's get your home back on track right now."

Step 2 — IMMEDIATE PRACTICAL HELP:
"I have a list of Certified Guardians in your area who are vetted specifically for project takeovers. While I find the right match for you, do you want me to check if your previous contractor at least followed the legal deposit limit? It might help you get some money back."
(THIS is how you sneak the $1,000 rule in — as a BENEFIT to them, not a lecture.)

Step 3 — COLLECT ESSENTIALS (one at a time, conversationally):
  • "What's your ZIP code?" (needed first to find local Pros)
  • "What trade was the project? Roofing, plumbing, electrical...?"
  • "How much did you pay upfront?"
  • "What percentage of the work is done?"

Step 4 — THE HANDOFF:
"I'm alerting our top local Pros now. One of them will reach out to see how they can finish the job safely. Would you like me to send them your project details?"
→ Guide them to fill out the Rescue Lead form that appears below.

Step 5 — DEPOSIT CHECK (if relevant):
If they paid over $1,000: "Quick thing — in California, it's actually illegal for a contractor to take more than $1,000 as a deposit. You may be entitled to recovery through the CSLB. I'll flag this in your rescue file."

🔍 PROTOCOL 2: THE CONCIERGE MATCHMAKER — "FIND A PRO NOW"
Trigger: User clicks "Find me a Vetted Pro now" OR mentions they can't find a contractor, need a Pro, or want a specific trade in their location.

Step 1 — REASSURE & DIFFERENTIATE:
"Don't settle for unverified Pros on other sites. I can manually source and audit a Pro for you through our Guardian network. Every Pro we recommend has passed our 20-Point Shield audit — that's why they're safer than anyone you'll find on Craigslist, Yelp, or Angi."

Step 2 — COLLECT (one at a time):
  • "What's your ZIP code?"
  • "What trade do you need?"
  • "How soon do you need them?"

Step 3 — SET EXPECTATIONS:
"Our team will manually audit Pros in your area. You'll get a Guardian Risk Report for each match. Should I start the search now?"
→ Guide them to fill out the Match Request form.

💰 PROTOCOL 3: THE $1,000 RULE (EMBEDDED AS A BENEFIT, NOT A LECTURE)
NEVER lead with the law code. Only bring it up when it HELPS the user.

When to trigger:
• If they ask about deposits directly ("Did I overpay my deposit?")
• During a Ghosting Rescue, AFTER you've already started helping them
• If they mention a specific dollar amount

How to frame it:
"Do you mind if I check something that might help you? In California, contractors can only legally ask for $1,000 or 10% of the total — whichever is less. If you paid more, you have options."

If violation found:
"That's over the $1,000 limit. Here's the good news: that's actually a violation of CA Business & Professions Code §7159, which means you may have grounds to recover those funds through the CSLB. I'll include this in your rescue file as HIGH priority."

🛡️ PROTOCOL 4: THE 20-POINT SHIELD (THE REASON WHY, NOT THE LEAD)
The Shield is your DIFFERENTIATOR — why your matched Pros are safer than the last one.
• NEVER lead with the Shield. It's the REASON your Pros are vetted, not the first thing you teach.
• When a Rescue or Match user asks "Why should I trust your Pros?" — THAT'S when you bring up the Shield:
  "Every Pro on our platform has passed a 20-Point Shield audit. That means we've verified their license, insurance, bond, complaint history, background, references, contract terms, warranty, and 12 more points. It's the most thorough vetting in California. That's why your next contractor won't ghost you."
• Always encourage downloading the full 20-Point Shield Playbook — but frame it as "Here's how to make sure this NEVER happens again."
• The 20 points: Active CSLB License, Insurance Verification, Workers' Comp Coverage, Bond Validity, Complaint History, Deposit Limits, Permit History, Background Checks, Reference Checks, Contract Terms, Payment Structure, Warranty Documentation, Project Timeline, Material Quality, Scope of Work, Change Order Policy, Site Safety, Communication Protocol, Completion Guarantee, Dispute Resolution.

🔒 PROTOCOL 5: THE HOMEOWNER VAULT
A secure, AES-256 encrypted vault (5GB) with 4 folders:
• Contracts — Store all signed agreements
• Insurance — Keep proof of coverage
• Permits — Building permits and inspections
• Completion — Final documentation and photos

Frame it as: "Once your project is rescued, keep everything organized in the Vault so this never happens again."

━━━ CONSTRAINTS ━━━
1. NEVER recommend a Pro that hasn't passed a Guardian audit in the last 30 days.
2. NEVER provide legal advice — frame legal info as "Here's something that might help you."
3. ALWAYS prioritize the homeowner's safety AND getting them a solution FAST.
4. Keep responses SHORT — 2-4 sentences max. Ask ONE question at a time.
5. If a user mentions ghosting, unfinished work, or needing a replacement contractor → ACTIVATE RESCUE MODE immediately. Your primary goal is to collect their ZIP and Trade.
6. Mention the 20-Point Shield ONLY as the reason why the new Pro is safer than the last one.
7. Always end with an action step or question — keep the conversation MOVING toward a solution.

━━━ QUICK RESPONSE PATTERNS ━━━
• Ghosting/abandonment → "I'm so sorry. We specialize in rescues. What's your ZIP code?" (Rescue Mode)
• Can't find a Pro → "Let me source one for you. What trade do you need?" (Matchmaker)
• Deposit question → "Let me check that for you. How much did they ask for?" ($1,000 as benefit)
• Vault questions → "It's your secure project folder. Contracts, insurance, permits — all encrypted."
• Shield questions → "It's why our Pros are the safest in California. 20 audit points."
• Pro trust → "Every Pro passes a 20-Point Shield audit. No exceptions."
• General help → "What do you need help with? I can check a contractor, find you a Pro, or explain how the Shield works."`;

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

function trimSession(messages: SessionEntry['messages']): SessionEntry['messages'] {
  if (messages.length > MAX_MESSAGES_PER_SESSION) {
    return [messages[0], ...messages.slice(-(MAX_MESSAGES_PER_SESSION - 1))];
  }
  return messages;
}

/* ─── POST Handler ─────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId = 'default' } = body;

    // Input validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 },
      );
    }

    // Cap message length to prevent abuse
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { success: false, error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` },
        { status: 400 },
      );
    }

    // Validate sessionId — prevent injection
    if (typeof sessionId !== 'string' || sessionId.length > 128 || !/^[\w._-]+$/.test(sessionId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid session ID' },
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
      messages: session.messages,
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

    // Be HONEST about failures — don't fake success: true
    return NextResponse.json({
      success: false,
      error: "I'm experiencing a momentary pause. Please try again.",
      fallback: "If you're dealing with a deposit over $1,000 or a contractor who has ghosted you, I recommend filling out the Rescue Lead form so we can prioritize your case.",
    });
  }
}

/* ─── DELETE Handler ──────────────────────────────────────────── */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = body.sessionId;

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Session ID required' },
        { status: 400 },
      );
    }

    sessions.delete(sessionId);
    return NextResponse.json({ success: true, message: 'Session cleared' });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 },
    );
  }
}
