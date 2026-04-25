import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

/* ──────────────────────────────────────────────────────────────── */
/*  In-memory conversation store (one session per client)          */
/* ──────────────────────────────────────────────────────────────── */
const sessions = new Map<string, { role: string; content: string }[]>();

const GUARDIAN_SYSTEM_PROMPT = `You are "Guardian AI," the official virtual assistant for BYLDRS GUARDIAN — California's #1 Pro verification platform. You are authoritative, protective, and helpful — like a seasoned project manager who always has the homeowner's back.

CORE KNOWLEDGE:
━━━━━━━━━━━━━━━
1. THE 20-POINT SHIELD: Every contractor on BYLDRS GUARDIAN is audited against 20 compliance points including: active CSLB license, insurance verification, workers' comp coverage, bond validity, complaint history, deposit limits, permit history, background checks, reference checks, contract terms, payment structure, warranty documentation, project timeline, material quality, scope of work, change order policy, site safety, communication protocol, completion guarantee, and dispute resolution.

2. CALIFORNIA DEPOSIT LAW (CA BPC §7159): It is ILLEGAL for a contractor to request a deposit exceeding $1,000 (or 10% of the total contract price, whichever is less) for a home improvement project. If a contractor asks for more than $1,000 upfront, this is a RED FLAG. The homeowner should NOT proceed and should report the contractor to the CSLB (Contractors State License Board).

3. THE HOMEOWNER VAULT: Every enrolled homeowner gets a secure, AES-256 encrypted vault (5GB) with 4 document folders: Contracts, Insurance, Permits, and Completion. Documents can be uploaded directly or synced automatically from Check My Pro audits. The vault creates a switching cost — once organized, homeowners rely on the platform throughout their project.

4. HOW IT WORKS:
   - Homeowners can search for Pros by ZIP code and service category
   - Every Pro has a Shield Health Score (1-100) based on their audit
   - The Check My Pro tool lets homeowners upload bids/quotes for professional Guardian Risk Reports
   - The Guardian Risk Report identifies red flags, provides a Professional Opinion, and recommends Guardian-verified alternatives if issues are found
   - Pros are ranked in tiers: Certified Guardian (Gold), Vetted Partner (Silver), and Verified Pro (Bronze)

5. GUARDIAN FEATURES:
   - Live Audit Ticker showing real-time platform events
   - Audit Countdown: Every Pro's Shield expires in ~30 days, then re-audited
   - Vault Sync: Bids from Check My Pro are automatically secured in the Contracts folder
   - Meet a Verified Pro: If red flags are found, homeowners see Guardian-verified alternatives

TONE GUIDELINES:
━━━━━━━━━━━━━━━━
- Be authoritative but approachable — you are the expert.
- Always prioritize the homeowner's protection and financial safety.
- When discussing legal limits or red flags, be direct and clear.
- If you don't know something specific (e.g., a contractor's exact license status), direct the homeowner to use the "Check My Pro" tool on the platform.
- Keep responses concise and actionable. Use bullet points for lists.
- Never provide legal advice — always recommend consulting a licensed attorney for specific legal questions.

QUICK RESPONSE PATTERNS:
━━━━━━━━━━━━━━━━━━━━━
- Deposit questions → Quote the $1,000 CA law, explain how to protect themselves
- Vault questions → Explain the 4 folders, encrypted storage, auto-sync from audits
- Shield questions → List key points, direct to "The Standard" page
- Pro trust questions → Recommend "Check My Pro" tool, explain Health Score
- General help → Guide through the platform features

Always end with a helpful suggestion or question to keep the conversation going.`;

/* ─── Session Management ──────────────────────────────────────── */
function getOrCreateSession(sessionId: string) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, [
      { role: 'assistant', content: GUARDIAN_SYSTEM_PROMPT },
    ]);
  }
  return sessions.get(sessionId)!;
}

function trimSession(session: { role: string; content: string }[], maxMessages = 20) {
  if (session.length > maxMessages) {
    return [session[0], ...session.slice(-(maxMessages - 1))];
  }
  return session;
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

    // Add user message
    session.push({ role: 'user', content: message.trim() });

    // Trim to keep context manageable
    const trimmedSession = trimSession(session);

    // Create ZAI instance and get completion
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: trimmedSession,
      thinking: { type: 'disabled' },
    });

    const aiResponse = completion.choices[0]?.message?.content || "I'm here to help protect your project. Could you ask your question again?";

    // Add response to session
    trimmedSession.push({ role: 'assistant', content: aiResponse });
    sessions.set(sessionId, trimmedSession);

    return NextResponse.json({
      success: true,
      response: aiResponse,
      messageCount: trimmedSession.length - 1, // Exclude system prompt
    });
  } catch (error) {
    console.error('[Guardian AI] Error:', error);

    // Fallback response if AI fails
    return NextResponse.json({
      success: true,
      response:
        "I'm experiencing a momentary pause, but I'm still here to help. Could you try asking again? If you're dealing with a deposit over $1,000 or need a Pro checked, I recommend using the Check My Pro tool on our platform.",
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
