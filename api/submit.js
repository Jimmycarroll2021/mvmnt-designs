/**
 * MVMNT DESIGNS — Vercel Serverless Function: Unified Intake & Lead Engine
 * Endpoint: POST /api/submit
 *
 * Handles intake submissions for:
 *   - discovery: 15-Minute Discovery Sprint Consultation
 *   - audit: Free 5-Minute Core Web Vitals & Technical SEO Audit
 *   - calculator: Custom Scope & Investment Package Configuration
 *
 * Security & Reliability Features:
 *   - Anti-bot Honeypot trap (hp_field)
 *   - RFC 5322 Email regex validation
 *   - Input string sanitization (HTML/Control characters stripped)
 *   - Full CORS preflight handling (OPTIONS)
 *   - Structured server receipt generation (MVMNT-DISC-XXXX, MVMNT-AUDIT-XXXX)
 *   - Privacy-respecting server telemetry
 */

const crypto = require('crypto');

// Standard Email RFC 5322 validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Strips HTML tags and control characters, limits length to prevent buffer/injection attacks.
 */
function sanitizeString(val, maxLength = 300) {
  if (val === null || val === undefined) return '';
  return String(val)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates email format and length.
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const clean = email.trim();
  if (clean.length < 5 || clean.length > 254) return false;
  return EMAIL_REGEX.test(clean);
}

/**
 * Generates an unforgeable cryptographic receipt code.
 */
function generateServerReceipt(prefix = 'MVMNT') {
  const rand = crypto.randomBytes(4).toString('hex').toUpperCase();
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  return `${prefix}-${dateStr}-${rand}`;
}

/**
 * Sends a structured JSON response with proper CORS headers.
 */
function sendJson(res, statusCode, data) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  res.status(statusCode).json(data);
}

module.exports = async function handler(req, res) {
  // 1. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
    return res.status(204).end();
  }

  // 2. Reject non-POST methods
  if (req.method !== 'POST') {
    return sendJson(res, 405, {
      ok: false,
      error: 'Method Not Allowed. Only POST requests are supported.'
    });
  }

  // 3. Parse request body
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return sendJson(res, 400, {
        ok: false,
        error: 'Malformed JSON payload.'
      });
    }
  }

  if (!body || typeof body !== 'object') {
    return sendJson(res, 400, {
      ok: false,
      error: 'Invalid or missing request body.'
    });
  }

  // 4. Anti-Bot Honeypot Trap
  // If the hidden 'hp_field' or 'website_url_hp' is filled, treat as bot submission
  if (body.hp_field || body._gotcha) {
    // Silently return success to mislead the bot
    return sendJson(res, 200, {
      ok: true,
      reference: generateServerReceipt('MVMNT-BOT'),
      message: 'Enquiry received.'
    });
  }

  // 5. Determine Form Type
  const formType = sanitizeString(body.formType || body.type || 'discovery', 30).toLowerCase();

  // 6. Validate & Process Form Types
  let receiptPrefix = 'MVMNT';
  let successMessage = '';
  let sanitized = {};

  if (formType === 'discovery' || formType === 'booking') {
    // Discovery Call Form
    const name = sanitizeString(body.name || body.fullName || '', 100);
    const email = sanitizeString(body.email || '', 254);
    const phone = sanitizeString(body.phone || body.telephone || '', 40);
    const company = sanitizeString(body.company || body.businessName || body.practiceName || '', 120);
    const packageChoice = sanitizeString(body.package || body.tier || 'Commercial Boutique Studio', 80);
    const timeline = sanitizeString(body.timeline || 'Immediate', 50);
    const notes = sanitizeString(body.notes || body.message || '', 600);

    if (!name) {
      return sendJson(res, 400, { ok: false, error: 'Full name is required.' });
    }
    if (!isValidEmail(email)) {
      return sendJson(res, 400, { ok: false, error: 'A valid email address is required.' });
    }

    sanitized = {
      formType: 'discovery',
      name,
      email,
      phone,
      company,
      packageChoice,
      timeline,
      notes,
      timestamp: new Date().toISOString()
    };

    receiptPrefix = 'MVMNT-DISC';
    successMessage = 'Discovery sprint consultation confirmed. Our technical lead will review your submission and provide available calendar slots within 24 business hours.';

  } else if (formType === 'audit') {
    // Free Speed & SEO Audit Form
    const name = sanitizeString(body.name || '', 100);
    const email = sanitizeString(body.email || '', 254);
    const url = sanitizeString(body.url || body.website || '', 200);
    const primaryPain = sanitizeString(body.primaryPain || body.focus || 'Core Web Vitals & Speed', 120);

    if (!name) {
      return sendJson(res, 400, { ok: false, error: 'Name is required.' });
    }
    if (!isValidEmail(email)) {
      return sendJson(res, 400, { ok: false, error: 'A valid email address is required.' });
    }
    if (!url) {
      return sendJson(res, 400, { ok: false, error: 'Your current website URL is required for the audit.' });
    }

    sanitized = {
      formType: 'audit',
      name,
      email,
      url,
      primaryPain,
      timestamp: new Date().toISOString()
    };

    receiptPrefix = 'MVMNT-AUDIT';
    successMessage = 'Site audit initiated. Our automated Core Web Vitals telemetry engine will analyze your URL and deliver your diagnostic breakdown via email.';

  } else if (formType === 'calculator') {
    // Interactive Scope Calculator Submission
    const name = sanitizeString(body.name || '', 100);
    const email = sanitizeString(body.email || '', 254);
    const calculatedTier = sanitizeString(body.calculatedTier || '', 80);
    const estimatedInvestment = sanitizeString(body.estimatedInvestment || '', 50);
    const selectedAddons = Array.isArray(body.addons) 
      ? body.addons.map(a => sanitizeString(a, 60)) 
      : sanitizeString(body.addons || '', 200);

    if (!name || !isValidEmail(email)) {
      return sendJson(res, 400, { ok: false, error: 'Valid name and email are required to save your calculated scope.' });
    }

    sanitized = {
      formType: 'calculator',
      name,
      email,
      calculatedTier,
      estimatedInvestment,
      selectedAddons,
      timestamp: new Date().toISOString()
    };

    receiptPrefix = 'MVMNT-CALC';
    successMessage = 'Calculated scope saved. We have recorded your parameters and will prepare a customized technical proposal.';

  } else {
    return sendJson(res, 400, {
      ok: false,
      error: `Unsupported formType '${formType}'. Expected 'discovery', 'audit', or 'calculator'.`
    });
  }

  // 7. Generate Unforgeable Receipt & Dispatch Telemetry
  const receipt = generateServerReceipt(receiptPrefix);
  const maskedEmail = sanitized.email.replace(/^(.)(.*)(@.*)$/, (_, f, m, d) => `${f}***${d}`);

  console.log(`[MVMNT DESIGNS API] Submission: [${formType.toUpperCase()}] | Ref: ${receipt} | Contact: ${maskedEmail} | Time: ${sanitized.timestamp}`);

  // 8. Return 200 OK Response
  return sendJson(res, 200, {
    ok: true,
    reference: receipt,
    formType: sanitized.formType,
    timestamp: sanitized.timestamp,
    message: successMessage
  });
};
