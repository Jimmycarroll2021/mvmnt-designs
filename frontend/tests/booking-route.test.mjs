// Tests for app/api/booking/route.ts.
// Run with: npm test --workspace=frontend  (Node's built-in test runner, no dependency).
// fetch is replaced in every test, so no request ever leaves the machine.
import assert from 'node:assert/strict'
import {afterEach, beforeEach, test} from 'node:test'

const {POST} = await import(new URL('../app/api/booking/route.ts', import.meta.url).href)

const ENV_KEYS = ['RESEND_API_KEY', 'ENQUIRY_TO_EMAIL', 'ENQUIRY_FROM_EMAIL']
const TEST_KEY = 're_test_key_not_real'
const LONG_NOTES = `We run a two-site physiotherapy practice. ${'Detail about the rebuild. '.repeat(20)}END-OF-NOTES`

const realFetch = globalThis.fetch
const realConsole = {error: console.error, log: console.log, warn: console.warn, info: console.info}
let savedEnv = {}
let calls = []
let logLines = []
let providerReply = () => new Response(JSON.stringify({id: 'email_test_1'}), {status: 200})

beforeEach(() => {
  savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]))
  process.env.RESEND_API_KEY = TEST_KEY
  process.env.ENQUIRY_TO_EMAIL = 'owner@example.test'
  delete process.env.ENQUIRY_FROM_EMAIL

  calls = []
  logLines = []
  providerReply = () => new Response(JSON.stringify({id: 'email_test_1'}), {status: 200})
  globalThis.fetch = async (url, init) => {
    calls.push({url: String(url), init})
    return providerReply()
  }
  for (const level of Object.keys(realConsole)) {
    console[level] = (...args) => {
      logLines.push(args.map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg))).join(' '))
    }
  }
})

afterEach(() => {
  globalThis.fetch = realFetch
  Object.assign(console, realConsole)
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key]
    else process.env[key] = savedEnv[key]
  }
})

function enquiry(overrides = {}) {
  return {
    name: 'Dr Jane Smith',
    email: 'jane@practice.example',
    website: 'practice.example',
    packageTier: '02. Flagship Studio Build ($8,800 AUD)',
    scopeNotes: LONG_NOTES,
    honeypot: '',
    ...overrides,
  }
}

function post(body, headers = {'Content-Type': 'application/json'}) {
  return POST(
    new Request('http://localhost/api/booking', {
      method: 'POST',
      headers,
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  )
}

test('success: sends exactly one email with recipient, reply_to and every field', async () => {
  const res = await post(enquiry())
  const data = await res.json()

  assert.equal(calls.length, 1, 'exactly one request to the mail provider')
  const [{url, init}] = calls
  assert.equal(url, 'https://api.resend.com/emails')
  assert.equal(init.method, 'POST')
  const headers = new Headers(init.headers)
  assert.equal(headers.get('authorization'), `Bearer ${TEST_KEY}`)
  assert.match(headers.get('content-type') ?? '', /application\/json/)
  assert.ok(init.signal instanceof AbortSignal, 'the send carries a timeout signal')

  const sent = JSON.parse(init.body)
  assert.deepEqual([sent.to].flat(), ['owner@example.test'])
  assert.equal(sent.reply_to, 'jane@practice.example')
  assert.equal(sent.from, 'MVMNT Design <onboarding@resend.dev>')
  assert.equal(sent.html, undefined, 'plain text only')

  assert.equal(res.status, 200)
  assert.equal(data.success, true)
  assert.match(data.receiptId, /^MVMNT-[A-Z0-9]+-[A-Z0-9]+$/)
  assert.ok(sent.subject.includes('Dr Jane Smith'), 'subject names the visitor')
  assert.ok(sent.subject.includes(data.receiptId), 'subject carries the receipt ID')

  for (const value of [
    'Dr Jane Smith',
    'jane@practice.example',
    'practice.example',
    '02. Flagship Studio Build ($8,800 AUD)',
    LONG_NOTES,
    data.receiptId,
  ]) {
    assert.ok(sent.text.includes(value), `email body contains: ${value.slice(0, 40)}`)
  }
})

test('success: ENQUIRY_FROM_EMAIL overrides the default sender', async () => {
  process.env.ENQUIRY_FROM_EMAIL = 'MVMNT Design <enquiries@example.test>'
  const res = await post(enquiry())
  assert.equal(res.status, 200)
  assert.equal(JSON.parse(calls[0].init.body).from, 'MVMNT Design <enquiries@example.test>')
})

for (const missing of ['RESEND_API_KEY', 'ENQUIRY_TO_EMAIL']) {
  test(`missing ${missing}: 5xx, nothing sent, no success`, async () => {
    delete process.env[missing]
    const res = await post(enquiry())
    const data = await res.json()

    assert.ok(res.status >= 500 && res.status <= 599, `status ${res.status} is 5xx`)
    assert.notEqual(data.success, true)
    assert.equal(typeof data.error, 'string')
    assert.equal(calls.length, 0)
    assert.equal(logLines.length, 1, 'one log line')
    assert.match(logLines[0], /delivery failed/i)
  })
}

test('provider 500: 5xx, no success, one log line without message text or key', async () => {
  providerReply = () => new Response(JSON.stringify({name: 'internal_server_error', message: 'boom'}), {status: 500})
  const res = await post(enquiry())
  const data = await res.json()

  assert.equal(calls.length, 1)
  assert.ok(res.status >= 500 && res.status <= 599, `status ${res.status} is 5xx`)
  assert.notEqual(data.success, true)
  assert.equal(typeof data.error, 'string')

  assert.equal(logLines.length, 1, 'one log line')
  assert.match(logLines[0], /delivery failed/i)
  assert.match(logLines[0], /MVMNT-[A-Z0-9]+-[A-Z0-9]+/, 'log line carries the receipt ID')
  assert.match(logLines[0], /500/, 'log line carries the provider status')
  assert.ok(!logLines[0].includes('physiotherapy'), 'log line omits the message text')
  assert.ok(!logLines[0].includes('jane@practice.example'), 'log line omits the visitor email')
  assert.ok(!logLines[0].includes(TEST_KEY), 'log line omits the API key')
})

test('provider 403 (unverified sender domain): 5xx, no success', async () => {
  providerReply = () => new Response(JSON.stringify({name: 'validation_error'}), {status: 403})
  const res = await post(enquiry())
  assert.ok(res.status >= 500 && res.status <= 599, `status ${res.status} is 5xx`)
  assert.notEqual((await res.json()).success, true)
})

test('send times out or network fails: 5xx, no success, key not logged', async () => {
  globalThis.fetch = async (url, init) => {
    calls.push({url: String(url), init})
    throw new DOMException('The operation was aborted due to timeout', 'TimeoutError')
  }
  const res = await post(enquiry())
  const data = await res.json()

  assert.equal(calls.length, 1)
  assert.ok(res.status >= 500 && res.status <= 599, `status ${res.status} is 5xx`)
  assert.notEqual(data.success, true)
  assert.equal(logLines.length, 1, 'one log line')
  assert.match(logLines[0], /delivery failed/i)
  assert.ok(!logLines[0].includes(TEST_KEY))
  assert.ok(!logLines[0].includes('physiotherapy'))
})

test('network error that is not a timeout: 5xx, no success', async () => {
  globalThis.fetch = async (url, init) => {
    calls.push({url: String(url), init})
    throw new TypeError('fetch failed')
  }
  const res = await post(enquiry())
  const data = await res.json()

  assert.equal(calls.length, 1)
  assert.ok(res.status >= 500 && res.status <= 599, `status ${res.status} is 5xx`)
  assert.notEqual(data.success, true)
  assert.equal(typeof data.error, 'string')
  assert.equal(logLines.length, 1, 'one log line')
  assert.match(logLines[0], /delivery failed/i)
})

test('provider 302 redirect: 5xx, no success', async () => {
  providerReply = () => new Response(null, {status: 302, headers: {Location: 'https://example.test/elsewhere'}})
  const res = await post(enquiry())
  const data = await res.json()

  assert.equal(calls.length, 1)
  assert.ok(res.status >= 500 && res.status <= 599, `status ${res.status} is 5xx`)
  assert.notEqual(data.success, true)
  assert.equal(typeof data.error, 'string')
})

for (const [name, value, label] of [
  ['RESEND_API_KEY', '', 'empty'],
  ['RESEND_API_KEY', '   ', 'spaces only'],
  ['ENQUIRY_TO_EMAIL', '', 'empty'],
  ['ENQUIRY_TO_EMAIL', ' \t\n', 'whitespace only'],
]) {
  test(`${name} set but ${label}: 503, nothing sent, no success`, async () => {
    process.env[name] = value
    const res = await post(enquiry())
    const data = await res.json()

    assert.equal(res.status, 503)
    assert.notEqual(data.success, true)
    assert.equal(typeof data.error, 'string')
    assert.equal(calls.length, 0, 'nothing sent to the mail provider')
  })
}

test('timeout: the single log line omits the visitor email, name and message text', async () => {
  globalThis.fetch = async (url, init) => {
    calls.push({url: String(url), init})
    throw new DOMException('The operation was aborted due to timeout', 'TimeoutError')
  }
  const res = await post(enquiry())

  assert.ok(res.status >= 500 && res.status <= 599, `status ${res.status} is 5xx`)
  assert.equal(logLines.length, 1, 'one log line')
  assert.match(logLines[0], /delivery failed/i)
  assert.ok(!logLines[0].includes('jane@practice.example'), 'log line omits the visitor email')
  assert.ok(!logLines[0].includes('Jane Smith'), 'log line omits the visitor name')
  for (const fragment of ['physiotherapy', 'Detail about the rebuild', 'END-OF-NOTES']) {
    assert.ok(!logLines[0].includes(fragment), `log line omits the message text: ${fragment}`)
  }
})

for (const [label, status] of [
  ['NaN', Number.NaN],
  ['undefined', undefined],
  ["the string '200'", '200'],
  ['the non-integer 200.5', 200.5],
]) {
  test(`provider status ${label}: treated as a failure, 5xx, no success`, async () => {
    globalThis.fetch = async (url, init) => {
      calls.push({url: String(url), init})
      return {status}
    }
    const res = await post(enquiry())
    const data = await res.json()

    assert.equal(calls.length, 1)
    assert.ok(res.status >= 500 && res.status <= 599, `status ${res.status} is 5xx`)
    assert.notEqual(data.success, true)
    assert.equal(typeof data.error, 'string')
  })
}

test('honeypot filled: normal-looking success, nothing sent', async () => {
  const res = await post(enquiry({honeypot: 'http://spam.example'}))
  const data = await res.json()
  assert.equal(res.status, 200)
  assert.equal(data.success, true)
  assert.equal(calls.length, 0)
})

test('invalid email: 400, nothing sent', async () => {
  const res = await post(enquiry({email: 'not-an-email'}))
  assert.equal(res.status, 400)
  assert.equal(typeof (await res.json()).error, 'string')
  assert.equal(calls.length, 0)
})

test('missing name: 400, nothing sent', async () => {
  const res = await post(enquiry({name: '   '}))
  assert.equal(res.status, 400)
  assert.equal(calls.length, 0)
})

test('non-JSON body: 400, nothing sent', async () => {
  const res = await post('name=Jane&email=jane@practice.example', {'Content-Type': 'text/plain'})
  assert.equal(res.status, 400)
  assert.equal(calls.length, 0)

  const broken = await post('{"name": "Jane"', {'Content-Type': 'application/json'})
  assert.equal(broken.status, 400)
  assert.equal(calls.length, 0)

  const notAnObject = await post('["Jane"]')
  assert.equal(notAnObject.status, 400)
  assert.equal(calls.length, 0)
})

test('field over its length cap or of the wrong type: 400, nothing sent', async () => {
  const tooLong = await post(enquiry({scopeNotes: 'x'.repeat(5001)}))
  assert.equal(tooLong.status, 400)

  const longName = await post(enquiry({name: 'n'.repeat(201)}))
  assert.equal(longName.status, 400)

  const wrongType = await post(enquiry({website: {nested: true}}))
  assert.equal(wrongType.status, 400)

  assert.equal(calls.length, 0)
})

test('a newline in the name cannot break the subject line', async () => {
  const res = await post(enquiry({name: 'Jane\r\nBcc: other@example.test'}))
  assert.equal(res.status, 200)
  assert.doesNotMatch(JSON.parse(calls[0].init.body).subject, /[\r\n]/)
})
