/**
 * GoHighLevel (NXLBYLDR CRM) Integration Module
 * ──────────────────────────────────────────────
 * Handles lead creation, contact syncing, and CRM operations
 * for the Guardian AI concierge workflows.
 */

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_REQUEST_TIMEOUT_MS = 10_000;

interface GHLContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: {
    zip?: string;
  };
  customFields?: Array<{
    id: string;
    field_key: string;
    value: string;
  }>;
  tags?: string[];
}

interface RescueLeadData {
  workflow: 'ghosting_rescue' | 'matchmaking';
  zipCode: string;
  trade: string;
  amountPaid?: string;
  workPercentDone?: string;
  projectTimeline?: string;
  contractorName?: string;
  email?: string;
  phone?: string;
  name?: string;
}

/**
 * Push a rescue lead to GoHighLevel CRM
 */
export async function pushRescueLeadToGHL(lead: RescueLeadData): Promise<{
  success: boolean;
  crmId?: string;
  error?: string;
}> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    return {
      success: false,
      error: 'GHL credentials not configured',
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GHL_REQUEST_TIMEOUT_MS);

  try {
    const contact: GHLContactPayload = {
      tags: [
        'BYLDRS GUARDIAN',
        lead.workflow === 'ghosting_rescue'
          ? 'Priority Rescue Lead'
          : 'Concierge Match Request',
        lead.trade ? `Trade: ${lead.trade}` : '',
        'Source: Guardian AI',
      ].filter(Boolean),
      address: {
        zip: lead.zipCode,
      },
      customFields: [
        { id: '', field_key: 'workflow_type', value: lead.workflow },
        { id: '', field_key: 'trade_needed', value: lead.trade },
        { id: '', field_key: 'zip_code', value: lead.zipCode },
        { id: '', field_key: 'project_timeline', value: lead.projectTimeline || '' },
        { id: '', field_key: 'amount_paid', value: lead.amountPaid || '' },
        { id: '', field_key: 'work_percent_done', value: lead.workPercentDone || '' },
        { id: '', field_key: 'contractor_name', value: lead.contractorName || '' },
        { id: '', field_key: 'lead_source', value: 'Guardian AI Concierge' },
        { id: '', field_key: 'priority_level', value: lead.workflow === 'ghosting_rescue' ? 'HIGH' : 'MEDIUM' },
      ],
    };

    // Parse name
    if (lead.name) {
      const parts = lead.name.trim().split(/\s+/);
      contact.firstName = parts[0];
      contact.lastName = parts.slice(1).join(' ') || undefined;
    }

    if (lead.email) contact.email = lead.email;
    if (lead.phone) contact.phone = lead.phone;

    const response = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[GHL] Contact creation failed:', response.status, errorBody);
      return {
        success: false,
        error: `GHL API error: ${response.status}`,
      };
    }

    const data = await response.json();
    const crmId = data?.contact?.id || data?.id;

    if (!crmId) {
      console.warn('[GHL] Contact created but no ID returned');
      return {
        success: false,
        error: 'GHL returned no contact ID',
      };
    }

    console.log(`[GHL] Rescue lead created: ${crmId} (${lead.workflow})`);

    return {
      success: true,
      crmId,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('[GHL] Request timed out after', GHL_REQUEST_TIMEOUT_MS, 'ms');
      return { success: false, error: 'GHL request timed out' };
    }
    console.error('[GHL] pushRescueLeadToGHL error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Validate a lead payload before submission
 */
export function validateRescueLead(lead: Partial<RescueLeadData>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // ZIP: must be 5 digits
  if (!lead.zipCode || !/^\d{5}$/.test(lead.zipCode.trim())) {
    errors.push('Valid 5-digit ZIP code is required');
  }

  if (!lead.trade || lead.trade.trim().length < 2) {
    errors.push('Trade/service type is required');
  }

  if (lead.amountPaid) {
    const amount = parseFloat(lead.amountPaid.replace(/[$,]/g, ''));
    if (isNaN(amount) || amount < 0) {
      errors.push('Amount paid must be a valid number');
    }
  }

  if (lead.workPercentDone) {
    const pct = parseInt(lead.workPercentDone, 10);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      errors.push('Work percent done must be between 0 and 100');
    }
  }

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    errors.push('Invalid email format');
  }

  if (lead.phone) {
    // Basic phone format: allow digits, spaces, dashes, parens, plus
    if (!/^\+?[\d\s\-()]{7,20}$/.test(lead.phone.trim())) {
      errors.push('Invalid phone format');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Upsert a contact in GoHighLevel CRM
 * Creates a new contact or finds and updates an existing one.
 */
export async function upsertGHLContact(data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  tags?: string[];
  source?: string;
  formType?: string;
}): Promise<{ contactId: string; action: 'created' | 'updated' } | null> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.warn('[GHL] Credentials not configured for upsertGHLContact');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GHL_REQUEST_TIMEOUT_MS);

  try {
    // Try to find existing contact by email or phone first
    let existingContactId: string | null = null;

    if (data.email) {
      const searchResponse = await fetch(
        `${GHL_API_BASE}/contacts/?query=${encodeURIComponent(data.email)}`,
        {
          signal: controller.signal,
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28',
            'Accept': 'application/json',
          },
        },
      );

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const match = searchData?.contacts?.find(
          (c: Record<string, unknown>) => c.email === data.email,
        );
        if (match?.id) {
          existingContactId = String(match.id);
        }
      }
    }

    const payload: GHLContactPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.zipCode ? { zip: data.zipCode } : undefined,
      tags: [
        'BYLDRS GUARDIAN',
        data.formType ? `Form: ${data.formType}` : '',
        data.source || 'Website',
        ...(data.tags || []),
      ].filter(Boolean),
      customFields: [
        { id: '', field_key: 'lead_source', value: data.source || 'Website' },
        { id: '', field_key: 'form_type', value: data.formType || '' },
        ...(data.zipCode ? [{ id: '', field_key: 'zip_code', value: data.zipCode }] : []),
      ],
    };

    const action: 'created' | 'updated' = existingContactId ? 'updated' : 'created';
    const method = existingContactId ? 'PUT' : 'POST';
    const url = existingContactId
      ? `${GHL_API_BASE}/contacts/${existingContactId}`
      : `${GHL_API_BASE}/contacts/`;

    const response = await fetch(url, {
      method,
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[GHL] Contact upsert failed:', response.status, errorBody);
      return null;
    }

    const responseData = await response.json();
    const contactId = responseData?.contact?.id || responseData?.id || existingContactId;

    if (!contactId) {
      console.warn('[GHL] Contact upsert succeeded but no ID returned');
      return null;
    }

    console.log(`[GHL] Contact ${action}: ${contactId}`);
    return { contactId: String(contactId), action };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('[GHL] Upsert request timed out');
      return null;
    }
    console.error('[GHL] upsertGHLContact error:', error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Create a calendar appointment in GoHighLevel
 */
export async function createGHLAppointment(data: {
  contactId: string;
  calendarId?: string;
  startTime: string;
  selectedDate: string;
  title: string;
  description?: string;
}): Promise<{ appointmentId: string } | null> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.warn('[GHL] Credentials not configured for createGHLAppointment');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), GHL_REQUEST_TIMEOUT_MS);

  try {
    const calendarId = data.calendarId || 'default';

    const payload = {
      contactId: data.contactId,
      calendarId,
      title: data.title,
      description: data.description || '',
      startTime: `${data.selectedDate}T${data.startTime}`,
      endTime: `${data.selectedDate}T${data.startTime}`, // Default to same time
      location: { type: 'online' } as const,
    };

    const response = await fetch(`${GHL_API_BASE}/calendars/events/appointments`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[GHL] Appointment creation failed:', response.status, errorBody);
      return null;
    }

    const responseData = await response.json();
    const appointmentId = responseData?.appointment?.id || responseData?.id;

    if (!appointmentId) {
      console.warn('[GHL] Appointment created but no ID returned');
      return null;
    }

    console.log(`[GHL] Appointment created: ${appointmentId}`);
    return { appointmentId: String(appointmentId) };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('[GHL] Appointment request timed out');
      return null;
    }
    console.error('[GHL] createGHLAppointment error:', error);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Check if a deposit amount violates CA BPC §7159
 */
export function checkDepositViolation(amount: number, totalContractPrice?: number): {
  isViolation: boolean;
  maxAllowed: number;
  overage: number;
  code: string;
} {
  const flatLimit = 1000;
  const percentLimit = totalContractPrice ? totalContractPrice * 0.1 : Infinity;
  const maxAllowed = Math.min(flatLimit, percentLimit);
  return {
    isViolation: amount > maxAllowed,
    maxAllowed,
    overage: Math.max(0, amount - maxAllowed),
    code: 'CA Business & Professions Code §7159',
  };
}
