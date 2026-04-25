'use client';

import { useCallback } from 'react';

interface GHLContactParams {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  formType: 'contact' | 'enroll' | 'audit' | 'pro-onboarding' | 'newsletter' | 'blog-subscribe';
  tags?: string[];
  source?: string;
}

interface GHLResult {
  success: boolean;
  contactId?: string;
  action?: 'created' | 'updated';
  error?: string;
}

/**
 * Hook for submitting contact data to Go High Level.
 * Used by all forms across the platform to unify lead capture.
 */
export function useGHL() {
  const submitToGHL = useCallback(async (params: GHLContactParams): Promise<GHLResult> => {
    try {
      const res = await fetch('/api/ghl/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          source: params.source || 'BYLDRS GUARDIAN Website',
        }),
      });

      const data = await res.json();
      return data as GHLResult;
    } catch {
      console.error('[useGHL] Submission failed');
      return { success: false, error: 'Network error' };
    }
  }, []);

  const submitBooking = useCallback(async (params: {
    contactId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    calendarId?: string;
    selectedTime: string;
    selectedDate: string;
    meetingType?: string;
    notes?: string;
  }): Promise<GHLResult & { appointmentId?: string }> => {
    try {
      const res = await fetch('/api/ghl/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await res.json();
      return data;
    } catch {
      console.error('[useGHL] Booking failed');
      return { success: false, error: 'Network error' };
    }
  }, []);

  return { submitToGHL, submitBooking };
}
