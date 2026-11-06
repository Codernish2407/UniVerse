# UniVerse Project Rules

## Vision

UniVerse is an AI-powered student super app designed to solve real campus problems through one platform.

---

## Development Principles

- Every feature must solve a real student problem.
- Build scalable solutions.
- Write reusable components.
- Mobile-first design.
- Keep the UI clean and modern.
- Prioritize user experience over adding more features.

---

## Frontend v1 Scope (updated)

The initial frontend covers eight modules, all running on a mock service layer:

- Lost & Found
- Team Finder
- Roommate Finder
- Nova AI (mock assistant)
- CGPA Calculator
- Clubs
- Events
- Campus Navigation (sample layout)

Plus demo authentication, dashboard, profile and settings.

Authentication is a frontend-only demo adapter. Firebase (or JWT via Express) remains the planned
production option and plugs in by replacing `services/index.ts`.

No new modules should be added until this scope is tested and the real backend work begins.

---

## Coding Workflow

Feature Request
↓

UI Design
↓

Backend API
↓

Frontend Integration
↓

Testing
↓

Git Commit

---

## Git Rules

- Commit after every completed feature.
- Use meaningful commit messages.
- Never push broken code.

---

## Folder Structure

frontend/

backend/

docs/

branding/

assets/

---

## Goal

Build UniVerse as a real startup product, not a college assignment.