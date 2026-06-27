---
title: Open Questions
type: roadmap
tags: [qbmovement, decisions]
---

# Open Questions — decisions to make before building

Each has a **recommended default** so nothing blocks. Confirm these and the path is clear.

## Product
- [ ] **2D vs 3D playbook for v1?** → *Recommend 2D* (drawable, ships in Phase 2; 3D in Phase 5). See [[Digital Playbook]].
- [ ] **Playbook author: coach-only or players too?** → *Recommend both* — coaches build installs, players draw in Read & React.
- [ ] **Parent Dashboard: included in QB+ or add-on?** → *Recommend included in QB+* (it sells the subscription). [[Subscription Model]]

## Pricing & billing
- [ ] **Exact prices** within the ranges (QB+ $19–29, Elite $79–149)? Pick launch numbers.
- [ ] **Annual plans / discount?** → *Recommend yes, ~2 months free.*
- [ ] **Free trial of QB+ (e.g. 7 days) vs freemium-forever Free tier?** → *Recommend both: a permanent Free tier AND a QB+ trial.*
- [ ] **Team overage pricing** above 15 QBs? → define per-seat add-on.
- [ ] **Mobile IAP vs Stripe** (Apple/Google cut)? → *Recommend RevenueCat + IAP for consumer mobile subs, Stripe for web/coach/team.* See [[Mobile App Architecture]].

## Technical
- [ ] **Cross-platform (Expo/RN) vs native?** → *Recommend Expo/React Native* (share code web↔mobile, smaller team). [[Tech Stack]]
- [ ] **Supabase vs Firebase?** → *Recommend Supabase* (relational [[Data Model]] fit).
- [ ] **Video provider: Mux vs Cloudflare Stream?** → either; *Mux* for richer tooling.
- [ ] **Build the store now or later?** → *Later (Phase 5), Shopify-backed.*

## Legal / safety (don't skip — minors involved)
- [ ] **Parental consent flow** for under-18 accounts. [[Personas & User Roles]]
- [ ] **PIPEDA (Canada) / COPPA** compliance review for youth data.
- [ ] **Coach↔minor messaging** parent-visibility policy (safeguarding).
- [ ] **Photo/video & waiver** consent (camps, film).
- [ ] **Terms of Service / Privacy Policy** drafted before launch.

## Business
- [ ] **Who's the first coach/persona?** Is this just you, or multi-coach from day one? (Affects [[Coach Dashboard]] timing.)
- [ ] **Migration from Weebly:** redirect domain, preserve SEO, move existing content/contacts.
- [ ] **Launch market:** Canada-first (it's `.ca`) → tax/currency (CAD), Stripe region setup.

## Design
- [ ] **Brand assets**: finalize logo, palette, fonts (benchmark: House of Athlete). Drop into `_attachments/`.
- [ ] **Reference screenshots** to collect: House of Athlete flows, the 3D play-designer (your screenshot is saved in `_attachments/` ideas), Hudl film UI, Duolingo progression.

---

> [!question] Want me to turn any of these into a real decision doc or start the build?
> Tell me which decisions you want to lock, and I can: (a) draft the schema + RLS, (b) scaffold the monorepo, or (c) build the **playbook canvas spike** as a working proof of concept.
