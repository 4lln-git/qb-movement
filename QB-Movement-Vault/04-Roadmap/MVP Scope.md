---
title: MVP Scope
type: roadmap
tags: [qbmovement, mvp, planning]
---

# MVP Scope — the smallest launchable version

The temptation is to build all 15 features. **Don't.** Ship the smallest thing that (a) replaces the Weebly site, (b) can charge money, and (c) shows the unique value. That's **Phase 0 + Phase 1 + the playbook from Phase 2**.

## In scope for MVP ✅
1. **Marketing site + brand** (replaces Weebly) — [[Vision & Positioning]]
2. **Accounts + roles** (player, parent, coach, admin) — [[Personas & User Roles]]
3. **Subscriptions** Free + QB+ (add Elite/Team later) — [[Subscription Model]]
4. **Drill library + 1–2 programs** (throwing + footwork) — [[Feature Catalog]]
5. **Progress dashboard** (basic) + **QB Journal**
6. **Booking** for sessions (basic) + camp calendar
7. ⭐ **[[Digital Playbook]] — 2D draw + save** (the wow feature; quiz mode can follow)
8. **[[QB Skill Tree]]** (basic bars + XP)

## Explicitly OUT of MVP ⛔ (later phases)
- AI throw analysis (Phase 5)
- Full coach dashboard / team subscriptions (Phase 4)
- Film room with video upload (Phase 3)
- Leaderboards, weekly challenges (Phase 3)
- Recruiting hub, marketplace, equipment store (Phase 5)
- 3D playbook view (Phase 5)
- Digital combine, certificates, QR check-in (Phase 4)

## Why this MVP
- **Replaces the current site** → immediate reason to switch off Weebly.
- **Charges from day one** → Free funnels into QB+.
- **Shows the magic** → the drawable playbook + skill tree are what make people say "whoa."
- **Buildable** → no AI, no 3D, no video infra in v1.

## MVP success signals
- People sign up for Free and convert to QB+.
- Players actually **draw and save plays**.
- Daily return rate (streak engagement) is non-trivial.
- A coach asks "can I manage my whole roster here?" → that's the green light for Phase 4.

## Suggested first sprint (concrete starting point)
1. Monorepo + design tokens + auth (Supabase) — [[Tech Stack]]
2. Landing page + signup + Stripe Free/QB+ checkout
3. Schema + RLS for users/players/subscriptions/plays — [[Data Model]]
4. Playbook canvas spike: drag players + draw one route + save JSON — [[Playbook Drawing Engine]]

> [!tip]
> Build the **playbook canvas spike early** even though it's "Phase 2." It's the riskiest/most novel piece — proving it works de-risks the whole product and gives you the demo that sells it.
