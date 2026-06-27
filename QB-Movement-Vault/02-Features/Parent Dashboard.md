---
title: Parent Dashboard
type: feature
priority: P1
phase: 3
tags: [qbmovement, feature, parent]
---

# Parent Dashboard

> [!quote] The spec
> "Huge selling point. Parents love visibility."

The parent is often **the buyer** (see [[Personas & User Roles]]). This dashboard is the feature that justifies the subscription to the person paying for it.

## What parents see
- **Attendance** — did my kid show up?
- **Hours trained** — effort over time
- **Weekly report** — auto-generated summary
- **Coach feedback** — notes from sessions/film
- **Next session** — what's coming up + countdown
- **Homework drills** — what's assigned this week ([[Film Room]] / programs)

## Design principles
- **Glanceable**: a parent should "get it" in 10 seconds.
- **Trend, not noise**: show progress over weeks (skill tree deltas from [[QB Skill Tree]]), not raw event spam.
- **Reassurance**: frame around "your investment is working."

## Safeguarding (critical)
Per [[Personas & User Roles]], athletes are often minors:
- Parent ↔ child link requires verified guardian consent.
- Coach ↔ minor messaging should be **parent-visible**.
- Privacy controls on what's shared (leaderboards, photos).

## Monetization angle
- Could be included in QB+ or sold as a small add-on (open decision in [[Subscription Model]] / [[Open Questions]]).
- Included by default in Elite and Team.

## Technical
- Mostly a **read-only aggregation** view over existing player data (attendance, sessions, skill tree, assignments). Low build cost once those systems exist — which is why it's Phase 3, after the player-side data is flowing.
