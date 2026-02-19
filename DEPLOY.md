# CeroLlamadas — Deployment (Phase E)

## Netlify production deploy

1. **Connect repository** to Netlify (cerollamadas.co).
2. **Build settings** (already in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `out`
   - Functions directory: `netlify/functions`
3. **Environment variables** (Site settings → Environment variables):
   - `EMAIL_DELAY_MS` — e.g. `5000` (milliseconds between emails).
   - `MAILGUN_API_KEY` — Mailgun API key.
   - `MAILGUN_DOMAIN` — Sending domain (e.g. for notificaciones@cerollamadas.co).
   - `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key.
4. **Client-side Turnstile**: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` so the form page can load the widget.
5. **Deploy**: trigger deploy from Netlify dashboard or push to the connected branch.

## Email domain

Ensure the sending domain is verified in Mailgun and that `notificaciones@cerollamadas.co` is allowed (e.g. configured as From address for the domain).

## Post-deploy

- Test the flow: Landing → Educacion → Formulario → Preview → send-emails.
- Confirm emails are received at company addresses and that Reply-To is the user email.
