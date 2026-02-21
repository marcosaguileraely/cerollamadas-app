const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN
const FROM_EMAIL = 'notificaciones@cerollamadas.co'
const FROM_NAME = 'CeroLlamadas'

const getAuth = () => {
  if (!MAILGUN_API_KEY) throw new Error('MAILGUN_API_KEY is not set')
  return Buffer.from(`api:${MAILGUN_API_KEY}`).toString('base64')
}

const sendOne = async ({ to, replyTo, cc, subject, text }) => {
  const domain = MAILGUN_DOMAIN
  if (!domain) throw new Error('MAILGUN_DOMAIN is not set')

  const form = new URLSearchParams()
  form.append('from', `${FROM_NAME} <${FROM_EMAIL}>`)
  form.append('to', Array.isArray(to) ? to.join(', ') : to)
  form.append('subject', subject)
  form.append('text', text)
  if (replyTo) form.append('h:Reply-To', replyTo)
  if (cc) form.append('cc', cc)

  const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${getAuth()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  })

  if (!res.ok) {
    const errText = await res.text()
    console.error('Mailgun error:', res.status, errText)
    throw new Error(`Mailgun send failed: ${res.status}`)
  }

  return res.json()
}

module.exports = { sendOne, FROM_EMAIL, FROM_NAME }
