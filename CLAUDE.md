# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the dev server (also regenerates the `@AGENTS.md` breaking-changes block above)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- `npm run db:generate` — generate a Drizzle migration from `src/db/schema.ts`
- `npm run db:migrate` — apply pending Drizzle migrations
- `npm run db:push` — push schema changes directly to the DB (no migration file)
- `npm run db:studio` — open Drizzle Studio

There is no test runner configured in this repo.

## Architecture

- **Next.js 16.3.6 App Router**, React 19. Before writing code, read the relevant guide under `node_modules/next/dist/docs/` — this version has breaking changes vs. training data (see `AGENTS.md`).
- **Database**: Neon serverless Postgres accessed via `@neondatabase/serverless` + `drizzle-orm/neon-http`. Connection is created once in `src/db/index.ts` (throws at import time if `DATABASE_URL` is unset).
- **Schema**: `src/db/schema.ts` defines `categories`, `products`, `stock`. `drizzle.config.ts` points at this file, dialect `postgresql`, migrations output to `./drizzle`. Conventions:
  - Prices are integer cents + a `currency` column — never float/whole-dollar numbers.
  - Stock is a single `quantity` int; the `in-stock`/`low-stock`/`out-of-stock` status is always derived via `src/lib/stock.ts`, never stored.
  - Product routes are slug-based (`/products/[slug]`), not id-based.
  - Scope is intentionally minimal: no carts, orders, payments, wishlists, reviews, warehouses, or product variants — don't add these without asking first.
  - New migrations: `npm run db:generate` then `db:migrate`. Seed data lives in `src/db/seed.ts` (`npm run db:seed`).
- **Auth**: `better-auth` with the Drizzle adapter (`provider: "pg"`), configured in `src/lib/auth.ts` against the `db` instance from `src/db`. The Next.js route handler is a catch-all at `src/app/api/auth/[...all]/route.ts` using `toNextJsHandler(auth)`, so every `/api/auth/*` path is handled by better-auth, not individual route files. The client-side hook lives in `src/lib/auth-client.ts` (`createAuthClient`, hits `NEXT_PUBLIC_APP_URL`).
- **Path alias**: `@/*` → `./src/*` (see `tsconfig.json`).
- **Styling**: Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config`; config lives in `postcss.config.mjs` / CSS).
- **Env vars** (see `.env.example`): `DATABASE_URL` (Neon), `BETTER_AUTH_SECRET` (generate with `npx @better-auth/cli secret`), `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`.
