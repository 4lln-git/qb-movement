---
title: Coach Dashboard
type: feature
priority: P0
phase: 4
tags: [qbmovement, feature, coach, business]
---

# Coach Dashboard

> [!quote] The spec
> "This is where the business becomes **scalable.**"

The operational cockpit that lets one coach manage many athletes without drowning in DMs and spreadsheets. This is what turns QB Movement from "an app for players" into "a business platform."

## What the coach sees
- **Today's sessions** — schedule at a glance
- **Upcoming athletes** — who's next, with their context
- **Payments** — subscription status, outstanding, payouts
- **Messages** — player/parent comms inbox
- **Film reviews** — queue of clips awaiting feedback ([[Film Room]])
- **Attendance** — sessions & camps
- **Progress** — roster-wide [[QB Skill Tree]] view, who's improving/slipping
- **Parent communication** — weekly reports, broadcast updates
- **Analytics** — retention, revenue, engagement, drill completion

## Roster management
- Add/invite athletes; assign to programs and [[Digital Playbook]] installs.
- Assign workouts & challenges ([[Gamification]]).
- Group by team (ties to Team subscription in [[Subscription Model]]).

## Why it's P0 but Phase 4
- **P0 importance**: without it, you (the coach) can't run the business; it's the reason the platform scales past hours-for-dollars.
- **Phase 4 timing**: it needs the player-side features (programs, film, skill tree, payments) to *exist first* so there's something to manage. Build the thing being coached, then the coaching cockpit.

## Connects to
- [[Subscription Model]] (payments, team plans)
- [[Parent Dashboard]] (mirror view for parents)
- [[Data Model]] (coach ↔ roster relationships)
- [[Integrations & Services]] (Stripe Connect for coach payouts; Marketplace later — see [[Feature Catalog]] #12)
