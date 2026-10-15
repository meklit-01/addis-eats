# AUTH.md — Addis Eats security layers

> **Exercise limitation:** this version uses fixed demo identities with salted PBKDF2 password hashes and static order fixtures. It is for learning and attack testing, not production authentication. Orders are not persisted, and the signing secret must be configured. Replace this with a database, password hashing, rate limiting, CSRF/origin policy, revocable server-side sessions and audit logging before production.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Customer A | `ada@example.com` | `EatsDemo2026!` |
| Customer B | `biru@example.com` | `EatsDemo2026!` |
| Staff | `staff@addiseats.test` | `StaffDemo2026!` |

## Session design

- `lib/session.js` signs a short-lived session payload using HMAC-SHA-256 and `SESSION_SECRET`.
- Cookie: `httpOnly: true`, `sameSite: "strict"`, `secure: true` in production, `path: "/"`, eight-hour lifetime.
- `getSession()` is the common page/action/handler helper. Middleware uses the same token verifier because middleware does not run as a React Server Component.
- Do not put the signing secret in a `NEXT_PUBLIC_` variable. The HMAC secret stays on the server.
- The middleware matcher is only `/orders/:path*`, `/staff/:path*`, and `/tracking/:path*`; image, CSS, JS and public files are not intercepted.
- Login validates `next` as a local path. Protocol-relative paths, backslashes, newlines and external origins are rejected.

## Protected routes and proof layers

| Route | Middleware | Render/handler check | What it proves |
|---|---|---|---|
| `/orders` | Signed session required | `getSession()` + filter `ownerId === session.id` | Authenticated user sees only their seeded orders |
| `/tracking/[id]` | Signed session required | `getSession()` + `getOwnedOrder(id, session)` | URL order ID cannot bypass ownership |
| `/api/tracking/[id]` | Not matched by middleware; handler protects itself | `getSession()` + ownership check | SSE stream cannot expose another account's delivery |
| `/api/orders/[id]/export` | Not matched by middleware; handler protects itself | `getSession()` + ownership check | CSV export is user-scoped |
| `/staff` | Signed session required | role must equal `staff` in middleware and page | Staff-only data is refused server-side |
| Server actions | Not a substitute for middleware | `getSession()` and ownership/role checks inside action | Direct action calls still must pass authorization |

## Three attack exercises

1. **Call a server action while signed out.** `updateOrderNoteAction` calls `getSession()` and throws `Authentication required.` before looking up the order. Note that Next.js server actions should also be tested from a fresh private window; UI hiding is not the control.
2. **Use Customer A's session with Customer B's order ID.** `getOwnedOrder(orderId, session)` matches both the ID and `ownerId === session.id`. `AE-1043` should return not found for Customer A, including on the tracking route, SSE route and CSV route.
3. **External `next` redirect.** `signInAction` passes the supplied value through `safeNext`. `https://example.com`, `//example.com`, backslashes and newline tricks fall back to `/orders`.

## Staff-only access

The `/staff` link is not the security boundary. Middleware checks the signed role and the page repeats the check. A customer navigating directly to `/staff` is redirected to `/orders?error=staff`.

## Before production

- Use a real user store and Argon2id/bcrypt password hashes; never store plaintext passwords. The demo uses PBKDF2 to avoid embedding plaintext credentials in source.
- Use database-backed sessions or a vetted auth library, session rotation/revocation, rate limiting, CSRF/origin checks, and persistent orders.
- Keep secret environment variables server-only. Use a cryptographically random `SESSION_SECRET` of at least 32 characters.


## Attack test log (manual verification required)

The checks below are implemented as defenses, but they have **not been executed in a browser in this environment**. Run them locally and record your observed status/result before submission.

| Attack | Expected result | Guard to inspect | Observed result |
|---|---|---|---|
| Submit the tracking-page server action while signed out | Action throws `Authentication required.` | `app/actions/auth.js` → `updateOrderNoteAction` calls `getSession()` before order lookup | Not yet run; fill in after testing |
| As Customer A, replace order `AE-1042` with Customer B order `AE-1043` | Tracking/API/export return 404/not found; action refuses ownership mismatch | `lib/orders.js` → `getOwnedOrder` checks both ID and session owner ID | Not yet run; fill in after testing |
| Open `/login?next=https://example.com` and sign in | Redirect stays on `/orders`, never the external host | `app/actions/auth.js` → `safeNext` | Not yet run; fill in after testing |
| Customer opens `/staff` directly | Middleware and page refuse staff route | `middleware.js` role check and `app/staff/page.js` role check | Not yet run; fill in after testing |
