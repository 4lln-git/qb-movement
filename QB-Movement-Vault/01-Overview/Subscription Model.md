---
title: Subscription Model
type: strategy
tags: [qbmovement, pricing, monetization]
---

# Subscription Model

Four tiers. Free is the funnel; QB+ is the volume; Elite is the margin; Team is the scale.

## Free — *lead generation*
The hook. Designed to get accounts created and emails captured.
- Limited drills
- Book sessions
- Camp calendar
- Progress dashboard
- QB news feed
- **One free mechanics assessment** (the conversion trigger)

## QB+ — *$19–29/month* — for players
The core product. Most members live here.
- Weekly throwing program
- Footwork drills
- Film study library
- Recovery routines
- Warmups
- Strength workouts
- QB IQ quizzes
- Progress tracking + **streaks**
- Exclusive videos

## Elite QB — *$79–149/month* — everything above, plus high-touch
The premium / coaching relationship tier.
- Monthly film review
- Personalized throwing plan
- Coach messaging (1:1)
- Priority booking
- Monthly Zoom session
- Performance reports

## Team Subscription — *for schools*
One coach manages a roster.
- Up to **15 quarterbacks** (define overage pricing)
- Assign workouts
- Track attendance
- Share film
- Performance analytics

---

## Feature → Tier matrix

| Feature | Free | QB+ | Elite | Team |
|---|:---:|:---:|:---:|:---:|
| Drill library | Limited | ✅ | ✅ | ✅ |
| Booking | ✅ | ✅ | Priority | ✅ |
| Progress dashboard | ✅ | ✅ | ✅ | ✅ |
| Programs (throwing/footwork/strength) | — | ✅ | ✅ | ✅ |
| [[QB Skill Tree]] | Basic | ✅ | ✅ | ✅ |
| [[Digital Playbook]] | View only | Draw | Draw + coach feedback | Draw + assign |
| [[Gamification]] (challenges/leaderboards) | — | ✅ | ✅ | ✅ |
| [[Film Room]] | — | View | Upload + review | ✅ |
| Mechanics assessment | 1 free | — | Monthly | — |
| Coach messaging | — | — | ✅ | ✅ |
| Monthly Zoom | — | — | ✅ | — |
| [[Parent Dashboard]] | — | Add-on? | ✅ | ✅ |
| [[Throw Analysis AI]] | — | Limited | ✅ | ✅ |

> [!note] Open pricing decisions → [[Open Questions]]
> - Annual discount (e.g. 2 months free)?
> - Is Parent Dashboard included in QB+ or an add-on?
> - Team overage: price per QB above 15?
> - Free-trial of QB+ (7 days) vs. freemium-forever?

## Billing implementation
- Use **Stripe Billing** (subscriptions, proration, trials, tax) — see [[Integrations & Services]].
- Map each tier to a Stripe **Product** with monthly + annual **Prices**.
- Gate features in-app by reading the active subscription from your DB (synced via Stripe webhooks), **never** trust the client.
