# UniVerse Coding Rules

## General

Use TypeScript.

Use ESLint.

Use Prettier.

Write clean and readable code.

Avoid unnecessary complexity.

---

## Naming

Components

PascalCase

Example:

LoginCard.tsx

---

Functions

camelCase

Example:

createLostItem()

---

Variables

camelCase

Example:

userData

---

Constants

UPPER_CASE

Example:

MAX_UPLOAD_SIZE

---

## Folder Rules

One component per file.

Reusable code goes into components.

API calls go into services.

Utilities go into utils.

---

## Backend

Use MVC Architecture.

controllers/

models/

routes/

middleware/

services/

---

## API

REST API only.

Proper HTTP status codes.

Consistent JSON responses.

---

## Error Handling

Always return meaningful error messages.

Never expose sensitive information.

---

## Security

Validate all inputs.

Hash passwords.

Protect private routes.

Store secrets in .env.

---

## Git

Commit after every feature.

Examples:

feat: add authentication

feat: implement lost and found

fix: resolve login issue

refactor: optimize API structure

---

## Code Quality

Reusable components.

Readable functions.

Avoid duplicate code.

Keep files modular.