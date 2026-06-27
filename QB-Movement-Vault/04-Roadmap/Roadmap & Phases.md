---
title: Roadmap & Phases
type: roadmap
tags: [qbmovement, roadmap, planning]
---

# Roadmap & Phases

The build order. Principle: **ship the daily-habit loop first** (retention), then **business tools** (scale revenue), then **advanced/expansion**. Each phase is independently shippable — you get value (and can charge) before everything is done.

---

## Phase 0 — Foundation
*Goal: a real account-based platform replaces the Weebly site.*
- Brand + design system (palette, type, components) — see [[Vision & Positioning]]
- Marketing site (Next.js) — replaces [theqbmovement.ca](https://www.theqbmovement.ca)
- Auth + roles (player/parent/coach/admin) — [[Personas & User Roles]]
- Stripe subscriptions wired to tiers — [[Subscription Model]]
- Core [[Data Model]] + RLS
- **Outcome:** people can sign up, subscribe, and log in. Free tier live for lead gen.

## Phase 1 — Core Training (the daily content)
*Goal: a player has a reason to open the app every day.*
- Drill library (gated by tier)
- Programs: throwing, footwork, strength, warmups, recovery
- Progress dashboard (basic)
- **QB Journal** (feature #10)
- Booking + camp calendar (basic)
- **Outcome:** QB+ delivers real value. First paying members.

## Phase 2 — Flagship Differentiators ⭐
*Goal: features nobody else has.*
- ⭐ **[[Digital Playbook]]** — 2D drawable: place players, draw routes, save, Read & React quiz
- **[[QB Skill Tree]]** — RPG progression wired to activity
- **Outcome:** the "this is different" moment. Strong marketing hook.

## Phase 3 — Engagement & Stickiness
*Goal: retention + the parent sell.*
- **[[Gamification]]** — weekly challenges, leaderboards, streaks, badges (#5, #7)
- **[[Film Room]]** — upload + timestamped coach feedback (#6)
- **[[Parent Dashboard]]** (#3)
- Push notifications loop
- **Outcome:** daily active habit + parents bought in. Churn drops.

## Phase 4 — Scale the Business
*Goal: one coach manages many; schools buy in.*
- **[[Coach Dashboard]]** (#11) — sessions, payments, messages, analytics
- **Team subscriptions** — roster of 15, assign/track
- **Seasonal Programs** auto-unlock (#15)
- **Digital Combine** (#9)
- Camps full flow: waiver, QR check-in, certificate (#8)
- **Outcome:** revenue scales beyond hours-for-dollars.

## Phase 5 — Advanced & Expansion
*Goal: moat + new revenue lines.*
- **[[Throw Analysis AI]]** (#2)
- **Recruiting Hub** (#13)
- **Marketplace** of specialists (#12)
- **Equipment Store** (#14)
- **3D Playbook** view/animation (the full version of your screenshot)
- **Outcome:** platform, ecosystem, multiple revenue streams.

---

## Visual

```
P0 Foundation ─► P1 Training ─► P2 Playbook+SkillTree ⭐ ─► P3 Engagement
                                                                │
                                                                ▼
                                              P4 Coach/Teams ─► P5 AI/Recruiting/Store/3D
```

## Notes on sequencing
- **[[Coach Dashboard]] is P0-important but Phase-4-timed**: it manages things that must exist first.
- **3D playbook is last**: it's a renderer swap on data you already have (see [[Playbook Drawing Engine]]) — high cost, low marginal value vs. 2D. Don't let it block launch.
- **AI is R&D**: treat Phase 5 AI as a track that can start research earlier but ship late.

See [[MVP Scope]] for the smallest first cut.
