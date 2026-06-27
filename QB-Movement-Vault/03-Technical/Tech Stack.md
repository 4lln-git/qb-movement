---
title: Tech Stack
type: technical
tags: [qbmovement, technical, architecture]
---

# Tech Stack (Recommended)

Goal: one codebase philosophy across **web + mobile**, fast to build, scales to the feature set, and doesn't trap you. Recommendations are opinionated defaults — see [[Open Questions]] for the choices to confirm.

## Recommended stack

| Layer | Recommendation | Why |
|---|---|---|
| **Web app** | **Next.js (React, TypeScript)** | Marketing site + app in one; SSR for SEO on public pages; huge ecosystem |
| **Mobile app** | **React Native (Expo)** | Share TS logic with web (incl. [[Playbook Drawing Engine]]); one team; iOS+Android. See [[Mobile App Architecture]] |
| **Backend / DB** | **Supabase** (Postgres + Auth + Storage + Realtime) | Postgres relational data fits the [[Data Model]]; auth, file storage, row-level security, realtime out of the box |
| **Auth** | Supabase Auth (or Clerk) | Email/social login, roles, minors/guardian flows |
| **Payments** | **Stripe** (Billing + later Connect) | Subscriptions, trials, tax; Connect for coach/marketplace payouts |
| **Video** | **Mux** or **Cloudflare Stream** | Upload/transcode/stream for [[Film Room]] + [[Throw Analysis AI]] |
| **Drawing canvas** | Konva (web) + Skia (mobile) | [[Playbook Drawing Engine]] |
| **AI / pose** | MediaPipe / MoveNet (on-device) | [[Throw Analysis AI]] |
| **Push / email** | Expo Push + Resend/Postmark | [[Gamification]] re-engagement, weekly reports |
| **Store** | Shopify (Buy SDK / headless) | Equipment Store without building commerce |
| **Hosting** | Vercel (web) + Expo EAS (mobile) + Supabase cloud | Low ops overhead |
| **Analytics** | PostHog | Product analytics + feature flags |

## Why this combination
1. **TypeScript everywhere** — web (Next), mobile (RN), shared packages (play data, validation, skill-tree logic). One language, less duplication.
2. **Supabase = backend without a backend team** — Postgres relational model fits players↔coaches↔teams; RLS enforces who-sees-what; storage + realtime included. You can drop to raw SQL or add edge functions when needed.
3. **Buy, don't build, the hard infra** — payments (Stripe), video (Mux), commerce (Shopify). Build only what's differentiated: the playbook, skill tree, gamification, dashboards.

## Monorepo layout (suggested)
```
/apps
  /web          → Next.js (marketing + web app)
  /mobile       → Expo React Native app
/packages
  /core         → shared types, play-data format, skill-tree logic, validation
  /ui           → shared design system tokens/components
  /api-client   → typed Supabase/data access
/supabase       → migrations, RLS policies, edge functions
```
Tooling: **Turborepo** or **Nx** to manage the monorepo.

## Alternative paths (if constraints change)
- **Flutter** instead of RN if you prefer one Dart codebase and don't need to share JS with web.
- **Firebase** instead of Supabase if you want NoSQL/realtime-first (but the relational [[Data Model]] favors Postgres/Supabase).
- **Native (Swift/Kotlin)** only if the 3D playbook or AI pushes performance limits — overkill for v1.

> [!tip] Decision to confirm
> Cross-platform (Expo/RN) vs. native is the biggest fork. Recommendation: **Expo/React Native** — it lets a small team ship web + iOS + Android and reuse the playbook engine. Logged in [[Open Questions]].
