import { NextRequest, NextResponse } from 'next/server';
import { pushRescueLeadToGHL, validateRescueLead, checkDepositViolation } from '@/lib/ghl';
import { db } from '@/lib/db';

const MAX_MESSAGE_LENGTH = 2000;
const MAX_FIELD_LENGTH = 200;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5; // rescue leads are expensive

// Simple IP-based rate limiting (in-memory)
const ipRateLimits = new Map<string, { count: number; windowStart: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  let info = ipRateLimits.get(ip);
  if (!info || now - info.windowStart > RATE_LIMIT_WINDOW_MS) {
    info = { count: 0, windowStart: now };
    ipRateLimits.set(ip, info);
  }
  info.count++;
  return info.count <= RATE_LIMIT_MAX_REQUESTS;
}

/* ──────────────────────────────────────────────────────────────── */
/*  POST /api/ghl/rescue-lead                                      */
/*  Capture Guardian AI rescue leads → GHL CRM + local DB          */
/* ──────────────────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await request.json();

    const {
      workflow,
      zipCode,
      trade,
      amountPaid,
      workPercentDone,
      projectTimeline,
      contractorName,
      email,
      phone,
      name,
    } = body;

    // Basic validation
    if (!workflow || !['ghosting_rescue', 'matchmaking'].includes(workflow)) {
      return NextResponse.json(
        { success: false, error: 'Invalid workflow type' },
        { status: 400 },
      );
    }

    // Sanitize string lengths
    const sanitize = (val: string | undefined, max: number): string | undefined => {
      if (!val || typeof val !== 'string') return undefined;
      return val.trim().slice(0, max);
    };

    const cleanZipCode = sanitize(zipCode, 10);
    const cleanTrade = sanitize(trade, 100);
    const cleanAmountPaid = sanitize(amountPaid, 20);
    const cleanWorkPercentDone = sanitize(workPercentDone, 4);
    const cleanTimeline = sanitize(projectTimeline, 100);
    const cleanContractorName = sanitize(contractorName, MAX_FIELD_LENGTH);
    const cleanEmail = sanitize(email, 254);
    const cleanPhone = sanitize(phone, 20);
    const cleanName = sanitize(name, MAX_FIELD_LENGTH);

    const validation = validateRescueLead({
      zipCode: cleanZipCode,
      trade: cleanTrade,
      amountPaid: cleanAmountPaid,
      email: cleanEmail,
      phone: cleanPhone,
      workPercentDone: cleanWorkPercentDone,
    });
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validation.errors },
        { status: 400 },
      );
    }

    // Check for deposit violation if amount is provided
    let depositWarning: string | null = null;
    if (cleanAmountPaid) {
      const amount = parseFloat(cleanAmountPaid.replace(/[$,]/g, ''));
      if (!isNaN(amount)) {
        const check = checkDepositViolation(amount);
        if (check.isViolation) {
          depositWarning = `⚠️ DEPOSIT VIOLATION FLAGGED: $${amount.toLocaleString()} exceeds the $${check.maxAllowed.toLocaleString()} limit under ${check.code}. Overage: $${check.overage.toLocaleString()}. This has been flagged as HIGH priority.`;
        }
      }
    }

    // Push to GHL CRM (non-blocking — don't fail if GHL is down)
    let ghlResult: { success: boolean; crmId?: string; error?: string } = { success: false };
    try {
      ghlResult = await pushRescueLeadToGHL({
        workflow,
        zipCode: cleanZipCode!,
        trade: cleanTrade!,
        amountPaid: cleanAmountPaid,
        workPercentDone: cleanWorkPercentDone,
        projectTimeline: cleanTimeline,
        contractorName: cleanContractorName,
        email: cleanEmail,
        phone: cleanPhone,
        name: cleanName,
      });
    } catch (err) {
      console.error('[Rescue Lead] GHL push failed (non-blocking):', err);
    }

    // Save to local database — FAIL LOUD if DB write fails
    let dbSaved = false;
    try {
      await db.rescueLead.create({
        data: {
          workflow,
          zipCode: cleanZipCode!,
          trade: cleanTrade!,
          amountPaid: cleanAmountPaid || null,
          workPercentDone: cleanWorkPercentDone || null,
          projectTimeline: cleanTimeline || null,
          contractorName: cleanContractorName || null,
          email: cleanEmail || null,
          phone: cleanPhone || null,
          name: cleanName || null,
          depositViolation: depositWarning ? true : false,
          crmSynced: ghlResult.success,
          crmId: ghlResult.crmId || null,
        },
      });
      dbSaved = true;
    } catch (dbErr) {
      console.error('[Rescue Lead] DB save FAILED:', dbErr);
      // DB failure is critical — don't lie to the client
      return NextResponse.json(
        { success: false, error: 'Your request was received but could not be saved. Please try again.' },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      message: workflow === 'ghosting_rescue'
        ? '🛡️ Your Priority Rescue Lead has been submitted. A Tier 3 Certified Guardian will be matched to your area within 24 hours.'
        : '🔍 Your Concierge Match Request is being processed. We\'re sourcing and auditing a verified Pro in your area.',
      crmSynced: ghlResult.success,
      dbSaved,
      depositWarning,
    });
  } catch (error) {
    console.error('[Rescue Lead] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
