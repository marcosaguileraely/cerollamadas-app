const { companies } = require('../../lib/companies')
const { buildEmailBody } = require('../../lib/emailTemplate')
const { sendOne } = require('../../lib/mailgun')
const { delay } = require('../../lib/delay')

const EMAIL_DELAY_MS = parseInt(process.env.EMAIL_DELAY_MS || '5000', 10)
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY
const SUBJECT = 'Solicitud de ejercicio del derecho de Habeas Data — Cese de comunicaciones'

const verifyTurnstile = async (token) => {
  if (!TURNSTILE_SECRET) {
    console.warn('TURNSTILE_SECRET_KEY not set; skipping verification')
    return true
  }
  const form = new URLSearchParams()
  form.append('secret', TURNSTILE_SECRET)
  form.append('response', token)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  })
  const data = await res.json()
  return data.success === true
}

const validatePayload = (body) => {
  if (!body || typeof body !== 'object') return { valid: false, error: 'Invalid payload' }
  const { fullName, idNumber, email, phone, address, companyIds, turnstileToken } = body
  if (!fullName?.trim()) return { valid: false, error: 'fullName required' }
  if (!idNumber?.trim()) return { valid: false, error: 'idNumber required' }
  if (!email?.trim()) return { valid: false, error: 'email required' }
  if (!phone?.trim()) return { valid: false, error: 'phone required' }
  if (!address?.trim()) return { valid: false, error: 'address required' }
  if (!Array.isArray(companyIds) || companyIds.length === 0) {
    return { valid: false, error: 'At least one company required' }
  }
  if (companyIds.length > 5) return { valid: false, error: 'Max 5 companies' }
  if (!turnstileToken?.trim()) return { valid: false, error: 'Turnstile verification required' }
  return { valid: true }
}

const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) }
  }

  const validation = validatePayload(body)
  if (!validation.valid) {
    return { statusCode: 400, body: JSON.stringify({ error: validation.error }) }
  }

  const turnstileOk = await verifyTurnstile(body.turnstileToken)
  if (!turnstileOk) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Turnstile verification failed' }) }
  }

  const userData = {
    fullName: body.fullName,
    idNumber: body.idNumber,
    email: body.email,
    phone: body.phone,
    address: body.address,
    sendAllChannels: body.sendAllChannels !== false,
  }

  const text = buildEmailBody(userData)
  const replyTo = body.email
  const cc = body.cc?.trim() || undefined
  const results = []

  const companyList = companies.filter((c) => body.companyIds.includes(c.name))

  for (let i = 0; i < companyList.length; i++) {
    const company = companyList[i]
    if (i > 0) await delay(EMAIL_DELAY_MS)

    try {
      await sendOne({
        to: company.emails,
        replyTo,
        cc,
        subject: SUBJECT,
        text,
      })
      results.push({ company: company.name, success: true })
      console.log('Sent to', company.name)
    } catch (err) {
      console.error('Send failed for', company.name, err)
      results.push({ company: company.name, success: false, error: err.message })
    }
  }

  const allOk = results.every((r) => r.success)
  return {
    statusCode: allOk ? 200 : 207,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ results }),
  }
}

module.exports = { handler }
