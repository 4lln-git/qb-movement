---
title: Gamification
type: feature
priority: P1
phase: 3
tags: [qbmovement, feature, gamification, retention]
---

# Gamification — Challenges, Leaderboards, Streaks, Badges

The retention layer that wraps the [[QB Skill Tree]]. Bundles features **5 (Weekly Challenges)** and **7 (Leaderboards)** plus streaks and badges into one engagement system.

## Weekly Challenges
- Every **Monday**, a new quest set drops. Example:
  - 500 throws
  - 5 ladder sessions
  - 3 mobility workouts
  - 1 film breakdown
- Track progress through the week → **completion = XP** (+ badge for streaks of completed weeks).
- Auto-generated per player level/tier; coaches can add custom challenges for their roster.

## Streaks
- Daily activity = streak +1 (log a session, drill, journal entry, or quiz).
- Streak freeze / grace day (Duolingo-style) so one missed day doesn't nuke months of habit.
- Streaks feed **Leadership** attribute and appear on [[Parent Dashboard]].

## Leaderboards
Weekly boards (reset each week so newcomers can win):
- Most throws
- Fastest improvement (skill-tree delta)
- Most workouts
- Camp attendance
- Longest completion streak

> [!warning] Leaderboard fairness & safety
> - Scope boards by **age group / team** so a 12-year-old isn't ranked against an 18-year-old.
> - Opt-out for privacy (minors).
> - Guard against gaming the metrics (cap self-reported throws, require some verification).

## Badges / Achievements
- Milestone badges: "100-day streak", "1,000 throws", "Cover-2 Master" ([[Digital Playbook]] quiz), "Camp Veteran".
- Display on profile + Recruiting Hub.

## The daily loop (why this works)
```
Open app → see streak + today's challenge → do a drill/quiz/journal
        → earn XP → skill bar ticks up → badge/leaderboard nudge
        → notification tomorrow → repeat
```
This loop is the entire argument for the subscription model in [[Vision & Positioning]]. Build the loop, retention follows.

## Implementation notes
- An **events/XP ledger**: every meaningful action writes an event row (type, points, timestamp, player). Skill tree + leaderboards + streaks all read from it. See [[Data Model]].
- Push notifications drive re-engagement — see [[Integrations & Services]].
