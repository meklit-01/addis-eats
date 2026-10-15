# Addis Eats

A mobile-first Ethiopian food ordering demo built with Next.js App Router, JavaScript, and CSS. This project is a frontend-only demo: it does **not** send orders to a server or process payments.

## Features

- Search and filter dishes; browse dish detail pages.
- Add dishes to a cart, update quantities, and remove items.
- Cart and latest demo receipt persist in the current browser using `localStorage`.
- Checkout uses a real form `onSubmit`, native validation, a pending/disabled submit button, and a synchronous submit lock to prevent rapid duplicate submissions in one page session.
- Keyboard skip link, visible focus rings, semantic links/buttons, reduced-motion support, and mobile-friendly touch targets.
- Open Graph image and metadata for shared links.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`.

## Pre-flight checklist

Run these before deployment:

```bash
npm run lint
npm run build
npm start
```

Then manually verify:

- [ ] Use Tab / Shift+Tab to reach every link, button, filter, input, and form control; focus is always visible.
- [ ] Complete a demo order using only the keyboard, including validation errors.
- [ ] Double-click/tap **Place demo order** quickly; only one receipt/order should be created.
- [ ] Check at narrow mobile width (320–390px) and on an actual phone if available; no horizontal page overflow and controls are easy to tap.
- [ ] Verify the menu works when there is no localStorage/session data (private window).
- [ ] Inspect browser-downloaded JavaScript and confirm there are no secrets. This demo has no secret keys and no real payment integration.
- [ ] Share the deployed home URL in a messaging app or social preview checker and verify the Addis Eats title, description, and Open Graph image.
- [ ] Confirm the live URL and all navigation routes load without console errors.

## Deploy to Vercel

1. Push this project to its own GitHub repository. Ensure `package.json`, `app/`, `components/`, `data/`, `lib/`, and `public/` are at the repository root.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js settings. Build command: `npm run build`.
3. In **Project → Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` and `SESSION_SECRET` separately for **Preview** and **Production**:
   - Preview: the Vercel preview URL/domain you intend to use, e.g. `https://addis-eats-git-branch-your-team.vercel.app`.
   - Production: your final production domain, e.g. `https://your-production-domain.vercel.app`.
   - `SESSION_SECRET`: use a different cryptographically random value (at least 32 characters) for Preview and Production. This variable is server-only; never prefix it with `NEXT_PUBLIC_`.
   - For local work, `.env.local` uses `http://localhost:3000`.
4. There are **no API keys or secret environment variables** in this frontend-only demo. Do not invent or add payment credentials. `NEXT_PUBLIC_` values are public and must never contain secrets.
5. Redeploy after changing environment variables. Test both the Preview deployment and the Production deployment.
6. Copy the final production URL into the **Live URL** section below and commit the README.

### Post-deployment verification

- [ ] Production deployment reports Ready and the build succeeds.
- [ ] Open the URL in a private/incognito window and verify menu, cart, checkout, and receipt flow.
- [ ] Complete checkout by keyboard only.
- [ ] Rapid double-submit produces one local demo order.
- [ ] Mobile layout and touch targets work on a real phone.
- [ ] Shared link preview displays the title, description, and image.
- [ ] No secrets are exposed in source or browser JavaScript.
- [ ] Rollback drill: Vercel → **Deployments** → select the last known-good deployment → **⋯** → **Promote to Production** (or use Vercel's rollback option if shown). Verify the production URL afterward.

## Live URL

**Not deployed yet.** After deploying, replace this line with the real public production URL so another person can open the app.

## Demo limitations

The cart and checkout receipt remain browser-local. The security/tracking exercises use static seeded order fixtures and demo accounts, not a database. This is not production authentication or a real courier GPS feed. Read `AUTH.md` for protected routes and the three attack tests.


## Day 42 — Securing Addis Eats

Configure `SESSION_SECRET` in `.env.local` (at least 32 characters) before testing sign-in. Demo credentials and limitations are documented in `AUTH.md`. Routes `/orders`, `/tracking/[id]`, `/api/tracking/[id]`, `/api/orders/[id]/export`, and `/staff` use session and ownership/role checks. Middleware uses a narrow matcher.

## Delivery tracking exercise

- `/tracking/AE-1042` is visible to Customer A (`ada@example.com`).
- `/tracking/AE-1043` is visible to Customer B (`biru@example.com`).
- The Leaflet map is client-only with a fixed-height placeholder, attribution, text alternatives, and an EventSource that closes on unmount. The stream is seeded from server-rendered data and emits SSE `data:` frames.
- CSV export quotes commas, double quotes and newlines through `lib/format.js`.
- The stream repeats the seeded status as a demonstration; it is not connected to live courier telemetry.

### Local setup for auth/tracking

```bash
# copy .env.example to .env.local, then replace SESSION_SECRET with a random secret
npm install
npm run lint
npm run build
npm run dev
```

For PowerShell: `Copy-Item .env.example .env.local`. Do not use a `NEXT_PUBLIC_` prefix for `SESSION_SECRET`.
