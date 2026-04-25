import { NextRequest, NextResponse } from 'next/server';
import { upsertGHLContact } from '@/lib/ghl';

/* ──────────────────────────────────────────────────────────────── */
/*  Go High Level — Contact / Form Submission API                  */
/*  Creates or updates a contact in GHL and optionally tags them.  */
/* ──────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      zipCode,
      city,
      state,
      tags,
      source,
      formType,
    } = body;

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'At least email or phone is required' },
        { status: 400 },
      );
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      );
    }

    const result = await upsertGHLContact({
      firstName,
      lastName,
      email,
      phone,
      zipCode,
      city,
      state,
      tags,
      source,
      formType,
    });

    if (!result) {
      return NextResponse.json(
        { error: 'GHL API not configured or request failed' },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      contactId: result.contactId,
      action: result.action,
    });
  } catch (error) {
    console.error('[GHL Contact] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
