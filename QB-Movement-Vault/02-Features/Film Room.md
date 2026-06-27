---
title: Film Room
type: feature
priority: P1
phase: 3
tags: [qbmovement, feature, video]
---

# Film Room

> [!quote] The spec
> Upload game footage → coach comments directly on clips → **timestamp feedback**: "0:14 — feet too narrow → try widening your base."

## Core mechanic: timestamped comments
- Player/coach uploads a video.
- The video player has a **comment timeline**: anyone with access can drop a note pinned to a specific timestamp.
- Clicking a comment **seeks** the video to that moment.
- Threaded replies per timestamp (coach ↔ player ↔ parent visibility per safeguarding rules in [[Personas & User Roles]]).

## Feature set
- Upload from phone (game film, training clips).
- Coach annotations: timestamped text, optional drawing on a frame (telestrator — reuse parts of the [[Playbook Drawing Engine]]).
- Slow-mo / frame-step for mechanics.
- Tag clips (throw, footwork, read) → feed [[QB Skill Tree]].
- Assign film as homework (appears on [[Parent Dashboard]] "homework drills").
- This is the **manual precursor** to [[Throw Analysis AI]].

## Tiering (from [[Subscription Model]])
- QB+: view shared film/library.
- Elite: upload + monthly coach film review.
- Team: coach shares film across roster.

## Technical
- **Don't build video infra from scratch.** Use a managed provider — see [[Integrations & Services]]:
  - **Mux** or **Cloudflare Stream** for upload, transcode, adaptive streaming, thumbnails.
  - Store comment/timestamp metadata in your own DB linked to the video ID.
- Large files → direct-to-storage upload (signed URLs), not through your app server.

> [!tip] Reuse
> The timeline-comment component and the on-frame drawing (telestrator) share code with the [[Digital Playbook]] canvas and the [[Throw Analysis AI]] review screen. Build the annotation primitive once.
