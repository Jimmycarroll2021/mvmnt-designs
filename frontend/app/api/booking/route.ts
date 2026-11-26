// Enquiry form endpoint. Delivers each enquiry by email through the Resend REST API and
// answers "success" only when Resend has accepted the message (2xx).
//
// Server-side environment variables (never NEXT_PUBLIC_):
//   RESEND_API_KEY      Resend API key.
//   ENQUIRY_TO_EMAIL    Inbox that receives enquiries.
//   ENQUIRY_FROM_EMAIL  Optional sender; defaults to Resend's shared test sender.
//
// Uses the Web Response API rather than NextResponse so the handler has no framework import
// and can be exercised directly by tests/booking-route.test.mjs.

export const runtime = 'nodejs'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const DEFAULT_FROM = 'MVMNT Design <onboarding@resend.dev>'
const SEND_TIMEOUT_MS = 8000
const MAX_BODY_CHARS = 20000

// Simplified address check: one "@", a dot in the domain, no whitespace.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELD_LIMITS = {
  name: 200,
  email: 254,
  website: 300,
  packageTier: 200,
  scopeNotes: 5000,
} as const

type FieldName = keyof typeof FIELD_LIMITS
type Enquiry = Record<FieldName, string>

const RECEIVED_MESSAGE = 'Thank you. Your enquiry has been received.'
const NOT_SENT_MESSAGE = 'Sorry, your enquiry could not be sent. Please try again in a few minutes.'

function createReceiptId(): string {
  const time = Date.now().toString(36).toUpperCase()
  const suffix = Math.random().toString(36).substring(2, 6).toUpperCase().padEnd(4, '0')
  return `MVMNT-${time}-${suffix}`
}

function badRequest(error: string): Response {
  return Response.json({error}, {status: 400})
}

// One line per failed delivery: receipt ID and status only. Never the enquiry text or the API key.
function deliveryFailed(receiptId: string, status: string, httpStatus: number): Response {
  console.error(`[booking] delivery failed receipt=${receiptId} status=${status}`)
  return Response.json({error: NOT_SENT_MESSAGE, receiptId}, {status: httpStatus})
}

function singleLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim()
}

async function readJsonObject(req: Request): Promise<Record<string, unknown> | null> {
  const contentType = req.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) return null

  let raw: string
  try {
    raw = await req.text()
  } catch {
    return null
  }
  if (raw.length > MAX_BODY_CHARS) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null
    return parsed as Record<string, unknown>
  } catch {
    return null
  }
}

function readEnquiry(body: Record<string, unknown>): Enquiry | string {
  const enquiry: Enquiry = {name: '', email: '', website: '', packageTier: '', scopeNotes: ''}

  for (const field of Object.keys(FIELD_LIMITS) as FieldName[]) {
    const value = body[field]
    if (value === undefined || value === null) continue
    if (typeof value !== 'string') return 'Please check the form and try again.'
    const trimmed = value.trim()
    if (trimmed.length > FIELD_LIMITS[field]) {
      return 'One of the fields is too long. Please shorten it and try again.'
    }
    enquiry[field] = trimmed
  }

  if (!enquiry.name || !enquiry.email) return 'Please provide both your name and email address.'
  if (!EMAIL_PATTERN.test(enquiry.email)) return 'Please provide a valid email address.'
  return enquiry
}

function buildEmailText(enquiry: Enquiry, receiptId: string): string {
  return [
    'New enquiry from the MVMNT Design website form.',
    '',
    `Receipt: ${receiptId}`,
    `Sent: ${new Date().toISOString()}`,
    '',
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Current website / handle: ${enquiry.website || 'Not provided'}`,
    `Starting scope / package: ${enquiry.packageTier || 'Not specified'}`,
    '',
    'What they want to change or achieve:',
    enquiry.scopeNotes || 'Not provided',
    '',
    'Reply to this email to answer the visitor directly.',
  ].join('\n')
}

export async function POST(req: Request): Promise<Response> {
  const body = await readJsonObject(req)
  if (!body) return badRequest('Please submit the enquiry form again.')

  // Honeypot spam trap: a hidden field real visitors never fill. Answer as if it worked, send nothing.
  if (body.honeypot) {
    return Response.json({success: true, receiptId: createReceiptId(), message: RECEIVED_MESSAGE})
  }

  const enquiry = readEnquiry(body)
  if (typeof enquiry === 'string') return badRequest(enquiry)

  const receiptId = createReceiptId()
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const to = process.env.ENQUIRY_TO_EMAIL?.trim()
  const from = process.env.ENQUIRY_FROM_EMAIL?.trim() || DEFAULT_FROM

  if (!apiKey || !to) return deliveryFailed(receiptId, 'not_configured', 503)

  let providerStatus: number
  try {
    const providerResponse = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: enquiry.email,
        subject: `Website enquiry from ${singleLine(enquiry.name)} [${receiptId}]`,
        text: buildEmailText(enquiry, receiptId),
      }),
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    })
    providerStatus = providerResponse.status
  } catch (err: unknown) {
    const timedOut = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError')
    return timedOut
      ? deliveryFailed(receiptId, 'timeout', 504)
      : deliveryFailed(receiptId, 'network_error', 502)
  }

  if (providerStatus < 200 || providerStatus > 299) {
    return deliveryFailed(receiptId, `provider_http_${providerStatus}`, 502)
  }

  return Response.json({success: true, receiptId, message: RECEIVED_MESSAGE})
}
