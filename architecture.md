# CeroLlamadas — Master Architecture (MVP)

## Status
Planning → Ready to Build / In Progress

## Mode
Cursor-first development. JavaScript only. Next.js Pages Router. shadcn/ui. Netlify Functions. Mailgun. Cloudflare Turnstile.

## Goal
Allow Colombian citizens to exercise Habeas Data rights and request cessation of communications from companies through a single, legally-strong email flow.

## Core Constraints
- **Language:** JavaScript only (no TypeScript)
- **Framework:** Next.js (Pages Router, NOT App Router)
- **UI:** shadcn/ui (minimal, accessible, elegant)
- **Backend:** Netlify Functions
- **Email:** Mailgun. From: notificaciones@cerollamadas.co. Reply-To: user email.
- **CAPTCHA:** Cloudflare Turnstile
- **Logs:** Console only (no DB, no persistent storage)
- **Max companies per submission:** 5
- **Email delay:** 3–5 seconds (ENV: `EMAIL_DELAY_MS`)

## User Flow
Landing (CTA) → Educational (Habeas Data) → Form → Preview → Netlify Function (send-emails) → Direct User ↔ Companies communication.

**Legal principle:** After the email is sent, all future communication is between the user and the entity. CeroLlamadas acts only as a facilitation channel, not as an intermediary.

## Project Structure
- `pages/` — index, educacion, formulario, preview; no API route (Option A: Netlify Function only)
- `components/` — ui/, CompanySelector, LegalDisclaimer, EmailPreview, TurnstileWidget
- `lib/` — companies.js, mailgun.js, emailTemplate.js, delay.js
- `netlify/functions/` — send-emails.js

## ENV (required for send-emails)
- `EMAIL_DELAY_MS`
- `MAILGUN_API_KEY`
- `MAILGUN_DOMAIN`
- `TURNSTILE_SECRET_KEY`

## Out of Scope (Post-MVP)
Company API auto-updates, PDF export, tracking dashboard, multi-country, digital signature, legal audit trail.
