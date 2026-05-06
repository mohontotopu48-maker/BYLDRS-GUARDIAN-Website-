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
 * Check if a deposit amount violates CA BPC §7159
 */
export function checkDepositViolation(amount: number): {
  isViolation: boolean;
  maxAllowed: number;
  overage: number;
  code: string;
} {
  const maxAllowed = 1000;
  return {
    isViolation: amount > maxAllowed,
    maxAllowed,
    overage: Math.max(0, amount - maxAllowed),
    code: 'CA Business & Professions Code §7159',
  };
}
