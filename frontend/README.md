# UniVerse

**Everything a student needs, in one universe.** A responsive, multi-page student super app for
university life, starting with Lovely Professional University (LPU). This is the **frontend-only
demo build**: it runs without a backend, database or API keys.

> UniVerse is an independent student-built project. It is not affiliated with or endorsed by any university.

## 1. Overview

Eight connected modules share one profile, one design system and one saved-items list:
Lost & Found, Team Finder, Roommate Finder, Nova AI, CGPA Calculator, Clubs, Events, Campus Navigation.
All data is **sample data** stored in your browser (localStorage).

## 2. Tech stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui (base-nova, `@base-ui/react`)
· Lucide · Motion · React Hook Form + Zod · Recharts (lazy) · Leaflet (lazy, client-only) · Vitest · Geist (local font package)

## 3. Install and 4. Run

```bash
cd frontend
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run lint
npm test             # vitest: CGPA, compatibility, filters, ICS
npm run build && npm start
```

Click **Continue with demo account** on `/login`.

## 5. Folder structure

```
app/                 routes. (marketing) public, (auth) login/signup, (platform) signed-in app
components/
  ui/                shadcn primitives          layout/    shell: sidebar, header, mobile nav
  shared/            reusable cards, forms, states   marketing/ landing sections
  dashboard/         dashboard widgets          features/landing/  hero + navbar
features/            one folder per module (views, schemas, filters)
services/
  contracts/         typed service interfaces (what the UI depends on)
  mock/              localStorage-backed implementations     index.ts  the swap point
data/mock/           deterministic seed data
config/ constants/   brand, routes, navigation, features, universities, demo user
lib/                 pure logic: cgpa, compatibility, ics, storage, format
types/               domain models          tests/  unit tests
```

## 6. Routes

Public: `/`, `/features`, `/about`. Auth: `/login`, `/signup`, `/forgot-password`.
App: `/dashboard`, `/lost-found` (+ `/create`, `/[id]`), `/team-finder` (+ `/create`, `/[id]` for a student `stu_*` or project `tm_*`),
`/roommate-finder` (+ `/create`, `/[id]`), `/nova`, `/cgpa-calculator`, `/clubs` (+ `/[id]`), `/events` (+ `/[id]`),
`/campus-navigation` (`?to=<locationId>`), `/profile`, `/profile/edit`, `/settings`, `/notifications`, `/saved`.
Editing a Lost & Found listing uses `/lost-found/create?edit=<id>`; the roommate form edits your listing if you already have one.

## 7. Demo authentication

`services/mock/index.ts > auth` stores a **flag and profile in localStorage**. It is **not secure and not JWT**.
Passwords are validated in the form but never stored or checked, and any valid email signs in. Route guards run
client-side in `AppShell`. Password recovery is intentionally unavailable and never claims an email was sent.

## 8. Mock data

Seed files live in `data/mock/`. Each collection is persisted by `services/mock/collection.ts` under versioned keys
(`lib/storage.ts`, bump `STORAGE_VERSION` after schema changes). **Settings > Reset demo data** clears everything.
Sample event dates are fixed (Nov-Dec 2026); edit `data/mock/events.ts` once they pass.

## 9. Changing colors

Edit the CSS variables at the top of `app/globals.css`. Components use semantic names (`bg-card`, `text-muted-foreground`,
`bg-primary-strong`). `primary-strong`, `primary-soft`, `secondary-soft` and `error-soft` are AA-contrast variants of the brand colors.

## 10. Logo and typography

Logos are in `public/logo/` and used by `components/shared/BrandMark.tsx`. Fonts are loaded in `app/layout.tsx`
(Geist via the `geist` package); to change, swap the font imports and the `--font-sans` token in `globals.css`.
Name, tagline and disclaimer: `config/app.ts`.

## 11. Adding a university

1. Add an entry to `constants/universities.ts` (programs, grade scale).
2. Add campus data (copy `data/mock/campus.ts`) and make `services/mock` return it per `universityId`.
3. Set `ACTIVE_UNIVERSITY_ID` in `config/activeUniversity.ts` (later: derive from the signed-in user).
The CGPA grade scale is an **unverified example**; replace it with the official scale.

## 12. Adding a module

1. Types in `types/domain.ts`; contract in `services/contracts`; mock in `services/mock`.
2. `features/<module>/` for views, schema and filters; route files in `app/(platform)/<module>/`.
3. Register in `constants/navigation.ts` and `constants/features.ts`.

## 13. Connecting a real backend

Implement each interface in `services/contracts/index.ts` against the Express API (JWT in httpOnly cookies), then change
`services/index.ts` to export those instead of `./mock`. UI code does not import mock data directly. Nova: implement
`NovaService.ask` as a POST (or stream) to your endpoint; keep AI keys on the server. Replace the `auth` adapter and
move the route guard to middleware. Needed server-side: verified ownership checks and messaging for Lost & Found,
notifications, image storage, and verified campus data plus a routing graph for Campus Navigation.

## 14. Known limitations

- Everything is sample data in your browser; nothing is sent to anyone (requests, applications, "interest" are local notes).
- Demo auth is not secure. Nova is a keyword-based mock and cannot answer open-ended questions.
- Campus map is a **schematic sample**, not real LPU geography; only 6 demo routes exist, with no distances or turn-by-turn.
- Grade scale is an example, not verified. Club and event details are samples.
- Dark theme only. No Nova streaming. No component-level or visual regression tests.
- Lost & Found photos are stored as data URLs (max 400 KB) in localStorage.

## Verification (last run)

`tsc`, `eslint`, `vitest` (9 tests) and `next build` pass. A Playwright run covered login, guards, each module's main flow,
and overflow at 320-1920px. axe-core WCAG 2.x A/AA found 0 violations on all 29 routes.
