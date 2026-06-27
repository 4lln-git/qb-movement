---
title: Throw Analysis AI
type: feature
priority: P3
phase: 5
tags: [qbmovement, feature, ai, video]
---

# Throw Analysis (AI)

> [!quote] The spec
> Player records **10 throws** → AI analyzes elbow position, shoulder rotation, hip rotation, release point, follow-through → **coach reviews afterward.**

## Why this is Phase 5 (not launch)
It's the highest-effort, highest-risk feature. Don't gate the product on it. Ship the manual version first ([[Film Room]] — coach annotates video by hand), then add AI assistance.

## How it works technically
1. **Capture**: player records throws in-app (side angle, good lighting, full body in frame). Guide them with an on-screen overlay.
2. **Pose estimation**: run **pose detection** to get body keypoints per frame.
   - On-device: **MediaPipe Pose** / **Apple Vision** / **MoveNet** (TensorFlow Lite). Cheaper, private, no upload.
   - Server-side: upload video → process with a pose model for higher accuracy.
3. **Mechanics analysis**: from keypoints, compute the metrics:
   - Elbow angle at release
   - Shoulder rotation / separation
   - Hip rotation & hip-shoulder separation (the "X-factor")
   - Release point height/consistency across the 10 throws
   - Follow-through path
4. **Feedback**: compare to ideal ranges → flag issues → suggest a corrective drill (links into [[QB Skill Tree]] Accuracy/Power).
5. **Coach review**: coach sees the AI summary + video and confirms/overrides, then sends notes (Elite tier).

## Phasing the AI itself
- **5a — Manual**: coach watches the 10 throws in [[Film Room]] and annotates. (Already covered by Film Room.)
- **5b — Metrics assist**: pose estimation surfaces angles/numbers to help the coach (semi-automated).
- **5c — Auto-feedback**: model suggests corrections automatically; coach verifies.

> [!note] Reality check
> Reliable automated throwing-mechanics analysis is a real ML project (data collection, labeling, validation against coach judgment). Treat it as an R&D track, not a checkbox. The **metrics-assist** version (5b) is the realistic sweet spot — it makes coaches faster without pretending to replace them.

## Build dependencies
- Video pipeline (record, upload, store, stream) — see [[Integrations & Services]].
- [[Film Room]] (where review happens).
- Drill library (to recommend corrections).
