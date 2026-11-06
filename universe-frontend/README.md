# UniVerse — Student Operating System (Frontend Demo)

**Everything a student needs, in one universe.**

UniVerse is an independent, student-built product concept for a connected university experience. This repository package contains a responsive Next.js frontend with eight core modules, a mock service/data layer, and browser-local demo persistence.

> **Important:** This is a frontend demo, not an official Lovely Professional University service. Sample listings, club entries, event dates, profile data and campus place entries are illustrative. The campus preview intentionally does not invent geographic coordinates or walking routes. Demo actions do not contact other students or publish information to a server.

## Included experience

- Public landing page, Features and About pages.
- Demo Login, Signup and Forgot Password screens.
- Student dashboard and shared responsive app shell.
- Lost & Found directory, listing details and create flow.
- Team Finder directory, opportunity details and create flow.
- Roommate Finder directory, preference-focused profiles and details.
- Nova conversational demo assistant with deterministic responses.
- SGPA / CGPA calculator with multi-semester weighted calculations and editable example grade-point scale.
- Clubs directory and details.
- Events directory, details and calendar export-ready data model.
- Campus Navigation directory prototype with search, category filters, location selection and honest route-unavailable states.
- Student profile, profile editing, settings, notifications and saved items.
- Not-found page, responsive layouts, reduced-motion support and accessible labels on core controls.

## Technology

- Next.js App Router
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4 (project configured; detailed visual styling uses central CSS tokens)
- Lucide React icons
- Browser `localStorage` demo adapter with versioned keys and safe parsing

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production build:

```bash
npm run typecheck
npm run build
npm run start
```

## Demo authentication

Open `/login` or `/signup`. Use any email and any non-empty password for demo sign-in; signup requires at least 8 characters. You can also use **Continue with demo profile**. This creates a non-secure browser-local demo session. It is not JWT authentication, does not verify passwords and must not be used for real accounts.

Sign out with the top-right icon. Use Settings → Reset demo data to clear all `universe.demo.*` local-storage keys.

## Project structure

```text
src/
  app/
    (marketing)/        Landing, features, about
    (auth)/             Login, signup, forgot password
    (platform)/         Protected demo workspace routes
    globals.css         Centralized cosmic tokens and responsive styling
  components/           Shared UI, app shell, auth and module workspaces
  data/mock.ts          Deterministic sample data and default profile
  lib/
    config.ts           Brand, navigation and module configuration
    hooks.ts            Browser-persistent state and toast hooks
    storage.ts          Safe/versioned local-storage adapter
```

## Customization

### Brand and theme

- Change product name, tagline and university labels in `src/lib/config.ts`.
- Change colors, spacing, surfaces and responsive rules in `src/app/globals.css` under `:root` and the responsive sections.
- Replace the `U` brand mark in shared branding components (`app-shell.tsx`, marketing pages and `auth-panel.tsx`).

### Demo data

Edit the deterministic seeds in `src/data/mock.ts`. Keep unverified university information clearly marked as sample content. Module UI reads through the persistent state hook using keys under `universe.demo.data.v1.*`.

### Add a university

Add a university configuration layer before introducing additional institutions. Keep `universityId` in domain models and move campus data, branding and grade rules into university-scoped configuration. The current UI deliberately labels LPU as the initial demo context only.

### Add a module

1. Add module metadata and navigation in `src/lib/config.ts`.
2. Define typed seed data or domain types in `src/data/`.
3. Add service functions behind a module interface instead of importing arrays into UI components.
4. Add routes under `src/app/(platform)/` and reuse the shared `AppShell`.
5. Add the module to saved-item indexing and document backend requirements.

## Backend integration roadmap

The production backend is intentionally not implemented in this stage. Recommended next steps:

1. Add a Node.js / Express API and MongoDB / Mongoose domain models.
2. Replace demo authentication with secure server-side sessions or JWT flows and appropriate password hashing.
3. Create service interfaces for listings, teams, roommates, Nova, academics, clubs, events, campus navigation and profiles.
4. Add real upload storage and safe image processing for Lost & Found.
5. Add privacy-aware connection requests / messaging with authorization and moderation.
6. Connect Nova to a backend AI adapter; do not expose AI credentials in browser code.
7. Import verified LPU campus place data and a real pedestrian path graph before calculating walking directions.
8. Verify official academic grade rules before setting university-specific CGPA defaults.
9. Replace sample clubs and event listings with verified, attributed sources or organizer-managed submissions.

## Known limitations

- Demo auth is non-secure and browser-only.
- Data is local to the current browser; there is no shared database or cross-user sync.
- Nova uses deterministic local answers; no external AI API is connected.
- Campus navigation is a directory / concept map preview. It does not provide coordinates, GPS, distances, accessibility routes or turn-by-turn directions.
- Events and clubs use illustrative entries. The app does not confirm registrations or joining requests.
- Student connection requests show local feedback only; no message is sent.
- The grade point scale is a configurable example, not a verified official LPU scheme.
- No production authorization, moderation, file upload service, privacy audit or security review has been performed.

## Quality checks

- The four pure-logic tests in `tests/academic.test.cjs` pass (`npm test`). They cover weighted SGPA, empty/zero-credit handling, weighted CGPA and transparent preference overlap.
- All 28 App Router page files were checked for route coverage.
- TypeScript/TSX source syntax was transpiled and checked, and internal `@/` alias imports were checked for missing targets.
- A full `npm run typecheck`, `npm run build` and browser smoke test were **not verified** in the generation environment because project dependencies were not installed and the environment could not reach the npm package registry. Run `npm install`, `npm run typecheck`, `npm test` and `npm run build` in a network-enabled development environment before deployment.
