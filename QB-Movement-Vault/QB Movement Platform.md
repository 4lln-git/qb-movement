---
title: QB Movement Platform — Master Plan
type: hub
status: planning
created: 2026-06-27
tags:
  - qbmovement
  - moc
  - product
---

# 🏈 QB Movement — Platform Master Plan

> [!abstract] What this is
> The complete planning vault for rebuilding **[theqbmovement.ca](https://www.theqbmovement.ca)** from a Weebly site into a real **quarterback development ecosystem** — web platform + mobile app — inspired by the production quality of **[House of Athlete](https://houseofathlete.com)**.
>
> The headline feature is an **interactive, drawable digital playbook** (see the 3D play-designer reference in [[Digital Playbook]]).

---

## 🎯 The One-Liner

**Not just training. A place where players improve every day.**

A subscription platform where quarterbacks train daily, track progress like a video game, draw their own plays, get AI throw analysis, and where coaches/parents/recruiters all plug into one system.

---

## 🗺️ Map of Content

### Strategy & Overview
- [[Vision & Positioning]] — why this beats the current Weebly site
- [[Subscription Model]] — Free / QB+ / Elite / Team pricing
- [[Personas & User Roles]] — Player, Parent, Coach, Recruiter, Admin
- [[Competitive Benchmark]] — House of Athlete, Hudl, Just Play, etc.

### Features (the product)
- [[Feature Catalog]] — all 15 features, prioritized
- [[Digital Playbook]] ⭐ — the drawable play designer (flagship)
- [[QB Skill Tree]] — RPG-style progression
- [[Throw Analysis AI]] — video mechanics breakdown
- [[Film Room]] — timestamped coach feedback
- [[Coach Dashboard]] — the business engine
- [[Parent Dashboard]]
- [[Gamification]] — challenges, leaderboards, streaks, badges

### Technical
- [[Tech Stack]] — recommended architecture
- [[Data Model]] — core entities & relationships
- [[Mobile App Architecture]]
- [[Playbook Drawing Engine]] — how the canvas/drawing actually works
- [[Integrations & Services]] — payments, video, push, etc.

### Execution
- [[Roadmap & Phases]] — what to build, in what order
- [[MVP Scope]] — the smallest launchable version
- [[Open Questions]] — decisions to make before building

---

## 🚦 Recommended Build Order (TL;DR)

| Phase | Theme | Headline deliverables |
|-------|-------|----------------------|
| **0** | Foundation | Auth, profiles, subscriptions (Stripe), marketing site |
| **1** | Core training | Drill library, programs, progress dashboard, booking |
| **2** | Flagship | ⭐ [[Digital Playbook]] (2D drawable), [[QB Skill Tree]] |
| **3** | Engagement | [[Gamification]], [[Film Room]], [[Parent Dashboard]] |
| **4** | Scale | [[Coach Dashboard]], Team subscriptions, analytics |
| **5** | Advanced | [[Throw Analysis AI]], Recruiting Hub, Marketplace, 3D playbook |

See [[Roadmap & Phases]] for the detailed breakdown.

---

## ✅ Next Decisions
See [[Open Questions]] — a few choices (native vs. cross-platform mobile, 2D vs 3D playbook for v1, pricing) will shape everything else. I've recommended a default for each.
