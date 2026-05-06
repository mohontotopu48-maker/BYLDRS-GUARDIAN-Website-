import { NextRequest, NextResponse } from 'next/server';
import { pushRescueLeadToGHL, validateRescueLead, checkDepositViolation } from '@/lib/ghl';
import { db } from '@/lib/db';

/* ──────────────────────────────────────────────────────────────── */
/*  POST /api/ghl/rescue-lead                                      */
/*  Capture Guardian AI rescue leads → GHL CRM + local DB          */
/* ──────────────────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  try {
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

    const validation = validateRescueLead({ zipCode, trade, amountPaid, email });
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: validation.errors },
        { status: 400 },
      );
    }

    // Check for deposit violation if amount is provided
    let depositWarning: string | null = null;
    if (amountPaid) {
      const amount = parseFloat(amountPaid.replace(/[$,]/g, ''));
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
        zipCode,
        trade,
        amountPaid,
        workPercentDone,
        projectTimeline,
        contractorName,
        email,
        phone,
        name,
      });
    } catch (err) {
      console.error('[Rescue Lead] GHL push failed (non-blocking):', err);
    }

    // Always save to local database
    try {
      await db.rescueLead.create({
        data: {
          workflow,
          zipCode,
          trade,
          amountPaid: amountPaid || null,
          workPercentDone: workPercentDone || null,
          projectTimeline: projectTimeline || null,
          contractorName: contractorName || null,
          email: email || null,
          phone: phone || null,
          name: name || null,
          depositViolation: depositWarning ? true : false,
          crmSynced: ghlResult.success,
          crmId: ghlResult.crmId || null,
        },
      });
    } catch (dbErr) {
      console.error('[Rescue Lead] DB save failed:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: workflow === 'ghosting_rescue'
        ? '🛡️ Your Priority Rescue Lead has been submitted. A Tier 3 Certified Guardian will be matched to your area within 24 hours.'
        : '🔍 Your Concierge Match Request is being processed. We\'re sourcing and auditing a verified Pro in your area.',
      crmSynced: ghlResult.success,
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
