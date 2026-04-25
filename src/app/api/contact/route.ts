import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;

const ipRateLimits = new Map<string, { count: number; windowStart: number }>();

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    let rateInfo = ipRateLimits.get(clientIp);
    if (!rateInfo || now - rateInfo.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateInfo = { count: 0, windowStart: now };
      ipRateLimits.set(clientIp, rateInfo);
    }
    rateInfo.count++;
    if (rateInfo.count > RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json(
        { success: false, error: 'Too many messages. Please try again later.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 200) {
      return NextResponse.json({ success: false, error: 'Valid name is required' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Valid email is required' }, { status: 400 });
    }
    if (phone && typeof phone === 'string' && phone.trim().length > 0) {
      if (!/^\+?[\d\s\-()]{7,20}$/.test(phone.trim())) {
        return NextResponse.json({ success: false, error: 'Invalid phone format' }, { status: 400 });
      }
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ success: false, error: 'Message must be at least 10 characters' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ success: false, error: 'Message is too long' }, { status: 400 });
    }

    // Store in database using dedicated ContactSubmission model
    let dbSaved = false;
    try {
      await db.contactSubmission.create({
        data: {
          name: name.trim().slice(0, 200),
          email: email.trim().slice(0, 254),
          phone: phone?.trim().slice(0, 20) || null,
          subject: subject || null,
          message: message.trim().slice(0, 5000),
        },
      });
      dbSaved = true;
    } catch (dbErr) {
      console.error('[Contact] DB save failed:', dbErr);
      // Non-blocking — still return success to user
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! We'll get back to you within 24 hours.",
      dbSaved,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process your request' },
      { status: 500 },
    );
  }
}
