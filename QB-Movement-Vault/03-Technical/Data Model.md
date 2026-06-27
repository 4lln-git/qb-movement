---
title: Data Model
type: technical
tags: [qbmovement, technical, database]
---

# Data Model (Core Entities)

A first-pass relational model (Postgres / Supabase). Not final — a thinking tool for the build. Designed around the roles in [[Personas & User Roles]] and the features in [[Feature Catalog]].

## Core entities

```
users
  id, email, role(player|parent|coach|admin), name, dob, created_at
  (role drives permissions; dob drives minor handling)

players                # 1:1 extension of a user with role=player
  user_id, position, school, height, weight, gpa, recruiting_visible

guardianships          # parent ↔ player link (consent)
  parent_user_id, player_user_id, consent_at

coaches                # 1:1 extension of role=coach
  user_id, bio, specialties

teams
  id, name, school, owner_coach_id, seat_limit(=15)

team_members
  team_id, player_user_id

subscriptions          # synced from Stripe
  id, user_id, tier(free|qbplus|elite|team), status,
  stripe_customer_id, stripe_sub_id, current_period_end
```

## Training & content

```
drills            id, title, video_url, category, min_level, tier_required
programs          id, title, type(throwing|footwork|strength|seasonal), season
program_items     program_id, drill_id, week, day, order
assignments       coach_id, player_user_id, program_id|drill_id|play_id, due_at, status
sessions          id, coach_id, scheduled_at, type, capacity
bookings          session_id, player_user_id, status
attendance        session_id, player_user_id, checked_in_at
```

## Playbook ([[Digital Playbook]])

```
playbooks         id, owner_id, name, visibility
plays             id, playbook_id, name, formation, defense,
                  data(jsonb)   ← players + routes + reads (see Playbook Drawing Engine)
play_attempts     play_id, player_user_id, drawn_data(jsonb), score, created_at
```
> The `plays.data` JSONB is the heart of the playbook — normalized 0–1 coordinates, players, routes, read progression. See [[Playbook Drawing Engine]].

## Gamification & progress ([[QB Skill Tree]], [[Gamification]])

```
xp_events         id, player_user_id, type, points, ref_id, created_at   ← the ledger
skill_ratings     player_user_id, throw_power, accuracy, pocket_presence,
                  leadership, football_iq, updated_at
streaks           player_user_id, current, longest, last_active_on
badges            id, code, name, criteria
player_badges     player_user_id, badge_id, earned_at
challenges        id, week_of, title, targets(jsonb), tier
challenge_progress player_user_id, challenge_id, progress(jsonb), completed_at
leaderboard_*     (materialized views over xp_events / metrics)
```

## Film, journal, combine

```
videos            id, owner_id, mux_asset_id, type(game|training), created_at
video_comments    video_id, author_id, timestamp_sec, body, frame_drawing(jsonb)
journal_entries   player_user_id, date, energy, confidence, arm_soreness,
                  goals, notes
combine_results   player_user_id, year, forty, vertical, broad, throw_velocity,
                  throw_distance, reaction_time
```

## Camps, store, marketplace (later)

```
camps             id, title, starts_at, capacity, price, waiver_required
camp_registrations camp_id, player_user_id, waiver_signed_at, checked_in_at, certificate_url
products          (Shopify-backed — mostly external)
marketplace_providers / services / bookings  (Phase 5)
```

## Key principles
- **Row-Level Security (RLS)**: a player sees only their data; a parent sees linked children; a coach sees their roster; admin sees all. Enforce in the DB, not just the app.
- **XP ledger is append-only**: skill ratings, streaks, and leaderboards are all *derived* from `xp_events`. Single source of truth.
- **Play data as JSONB**: flexible enough to evolve the playbook format (2D → 3D) without schema migrations.
- **Subscription is the gate**: feature access reads from `subscriptions.tier` + status, synced from Stripe webhooks.

> [!note] This is a sketch
> Field lists are illustrative. Finalize during build, but the **entity relationships** and the **JSONB + ledger** decisions are the load-bearing ideas.
