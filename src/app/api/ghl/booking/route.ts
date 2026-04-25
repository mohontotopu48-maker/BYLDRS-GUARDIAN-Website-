import { NextRequest, NextResponse } from 'next/server';
import { upsertGHLContact, createGHLAppointment } from '@/lib/ghl';

/* ──────────────────────────────────────────────────────────────── */
/*  Go High Level — Booking / Calendar API                         */
/*  Creates a calendar appointment and links it to a contact.      */
/* ──────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      contactId,
      firstName,
      lastName,
      email,
      phone,
      calendarId,
      selectedTime,
      selectedDate,
      meetingType = 'Discovery Meeting',
      notes = '',
    } = body;

    if (!email && !phone && !contactId) {
      return NextResponse.json(
        { error: 'Contact ID, email, or phone is required' },
        { status: 400 },
      );
    }

    if (!selectedTime || !selectedDate) {
      return NextResponse.json(
        { error: 'selectedTime and selectedDate are required' },
        { status: 400 },
      );
    }

    // Step 1: Ensure contact exists (create if needed)
    let targetContactId = contactId;

    if (!targetContactId && (email || phone)) {
      const contactResult = await upsertGHLContact({
        firstName,
        lastName,
        email,
        phone,
        formType: 'booking',
        source: 'BYLDRS GUARDIAN Website',
        tags: [`meeting:${meetingType}`],
      });

      if (contactResult) {
        targetContactId = contactResult.contactId;
      }
    }

    if (!targetContactId) {
      return NextResponse.json(
        { error: 'Could not create or find contact' },
        { status: 400 },
      );
    }

    // Step 2: Create calendar appointment
    const appointmentResult = await createGHLAppointment({
      contactId: targetContactId,
      calendarId,
      startTime: selectedTime,
      selectedDate,
      title: `${meetingType} — BYLDRS GUARDIAN`,
      description: notes || `Scheduled via BYLDRS GUARDIAN platform. Meeting type: ${meetingType}.`,
    });

    if (!appointmentResult) {
      return NextResponse.json(
        {
          success: false,
          error: 'Booking failed',
          contactId: targetContactId,
          contactCreated: true,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      appointmentId: appointmentResult.appointmentId,
      contactId: targetContactId,
      calendarId: calendarId || 'default',
      message: 'Booking confirmed',
    });
  } catch (error) {
    console.error('[GHL Booking] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
