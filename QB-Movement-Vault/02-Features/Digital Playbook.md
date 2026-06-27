---
title: Digital Playbook ⭐
type: feature
priority: P0-flagship
phase: 2
tags: [qbmovement, feature, playbook, flagship]
---

# ⭐ Digital Playbook

> [!quote] Your reference
> The screenshot you sent (`_attachments/playbook-reference-3d-designer.png`) is a **3D football play designer** (the "Creating New Play" tool — place players on a 3D field, draw their routes, hit play to animate). This confirms the vision: **a playbook where the player can draw.**

![[playbook-reference-3d-designer.png]]

## The verdict: YES, this is buildable
The drawing/interaction is **very doable**. The only expensive part is the **3D stadium rendering**. So we split it:

- **v1 — 2D drawable playbook** (top-down field, like a coach's whiteboard). Ships in Phase 2.
- **v2 — 3D field view + animation** (Madden-style, like your screenshot). Phase 5, optional.

A 2D drawable playbook delivers ~90% of the value (install plays, draw routes, quiz reads) at ~20% of the cost.

---

## What the feature does (from your spec)

> Interactive playbook. Player taps **Cover 2** → "What throw?" → Player **draws the route** → Immediate feedback. Gamified learning.

So there are **two modes**:

### Mode A — Play Designer (create)
The coach (or player) builds a play:
1. Pick a **formation** (drag the 11 offensive players, or start from a template).
2. For each receiver, **draw a route** by dragging on the field.
3. Label routes (slant, go, post, dig…), mark the QB read progression.
4. Optionally show the **defense** (Cover 2, Cover 3, man) so it's a teaching rep.
5. Save to a **Playbook** (collection of plays).

### Mode B — Read & React (learn / quiz) — the gamified part
The player is tested:
1. App shows a **defensive look** (e.g. Cover 2).
2. Prompt: *"What throw?"* or *"Draw the open route."*
3. Player **draws** the route they'd throw, or taps the open receiver.
4. **Immediate feedback**: correct read? right progression? earns [[Gamification|XP]].

This is the **Duolingo-for-football-IQ** loop. It feeds the QB IQ score in the [[QB Skill Tree]].

---

## How the drawing works (no magic)
Full technical detail in [[Playbook Drawing Engine]]. Summary:
- The field is an **HTML Canvas** (web) / native canvas (mobile).
- A **player** = a draggable token (circle/x) at an (x, y) coordinate.
- A **route** = an array of points captured as the user drags a finger/mouse, smoothed into a path, rendered as an arrow.
- Everything serializes to **JSON** (formation + routes + metadata) → saved to the DB → re-rendered anywhere, re-animated, or graded.

Because it's just JSON, the **same play data** powers: the 2D editor today, the 3D animator later, the quiz grader, the printable card, and the coach's assignment.

---

## Data shape (conceptual)
```json
{
  "play_id": "uuid",
  "name": "Smash vs Cover 2",
  "formation": "Trips Right",
  "defense": "Cover 2",
  "players": [
    { "id": "QB", "role": "qb", "x": 0.5, "y": 0.8 },
    { "id": "X",  "role": "wr", "x": 0.12, "y": 0.7,
      "route": { "name": "go",   "points": [[0.12,0.7],[0.12,0.2]] } },
    { "id": "Z",  "role": "wr", "x": 0.85, "y": 0.7,
      "route": { "name": "hitch","points": [[0.85,0.7],[0.85,0.55]] } }
  ],
  "read_progression": ["Z", "X", "checkdown"],
  "tags": ["red-zone", "cover-2-beater"]
}
```
Coordinates are **normalized (0–1)** so the same play renders on any screen size. See [[Data Model]].

---

## Features to layer in
- **Templates**: pre-built formations & common routes so players aren't starting from scratch.
- **Route library**: tap a route name to auto-draw a clean version (great for beginners).
- **Animation**: press play → tokens move along their paths (2D first, 3D later).
- **Coach assignment**: coach pushes a play to a player's "install" list; player must draw it back correctly to mark it learned (ties to [[Film Room]] + [[Gamification]]).
- **Quiz/grade**: compare the player's drawn route to the answer key (tolerance-based matching).
- **Share/export**: PNG card or share link.

## Build estimate (rough)
- 2D editor + draw + save (web + mobile): **the meaty part of Phase 2.**
- Quiz/grade mode: small add-on once the data shape exists.
- 3D view: a **separate, large** effort (Phase 5) — Three.js / React Three Fiber or a game engine. Don't let it block launch.

> [!tip] Recommendation
> Ship the **2D drawable playbook** for v1. It's the feature that makes QB Movement unlike anything else, and it's realistic to build. Treat 3D as a "wow" upgrade after you have paying users.
