# AGENTS.md

## Cursor Cloud specific instructions

**Product:** `fenrir-foundation-ua` — a single self-contained **Next.js 15 (App Router)** marketing/donation website for a Ukrainian charity. TypeScript, Tailwind CSS 4, `next-intl` for i18n. There is **no backend, database, API, auth, or external service** — all content is static in `src/content/*` and translations in `messages/{uk,en}.json`. No environment variables or secrets are required.

**Node:** use Node 20+ (repo pins `22` in `.nvmrc`); the VM already has Node 22.

**Commands** (defined in `package.json`, also mirrored by `.github/workflows/ci.yml`):
- Dev server: `npm run dev` (Turbopack, serves on port 3000)
- Lint: `npm run lint`
- Build: `npm run build`
- Prod start (after build): `npm start`

**i18n routing** (`localePrefix: "as-needed"`): Ukrainian (default) is at the root `/`; English is under `/en`. Example pages: `/`, `/en`, `/en/donate`, `/uk/projects`.

**Notes / gotchas:**
- `next lint` prints a deprecation warning ("deprecated and will be removed in Next.js 16") — this is expected and not an error.
- The donate form's "Continue to payment (MVP)" button is an intentional placeholder; clicking it does nothing (payments/CMS are planned future work, not in the MVP). Do not treat this as a bug.
