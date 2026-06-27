---
title: Mobile App Architecture
type: technical
tags: [qbmovement, technical, mobile]
---

# Mobile App Architecture

The mobile app is where the **player lives daily** — drills, drawing plays, logging the journal, keeping the streak. Web is more for marketing, parents, and the [[Coach Dashboard]].

## Recommendation: Expo (React Native)
- **One codebase** for iOS + Android.
- **Shares TypeScript** with the web app via the monorepo `/packages/core` — including the play-data format and skill-tree logic (see [[Tech Stack]]).
- Mature libraries for the hard parts:
  - **React Native Skia** → the [[Playbook Drawing Engine]] (high-perf canvas drawing).
  - **Reanimated + Gesture Handler** → smooth drawing gestures + play animation.
  - **Expo Camera / VisionCamera** → record throws for [[Throw Analysis AI]].
  - **Expo Notifications** → streak/challenge push (the [[Gamification]] loop).
  - **Expo AV / Mux player** → [[Film Room]] playback.

## App structure (player-facing)
```
Tab: Home        → skill tree, streak, today's challenge, next session
Tab: Train       → programs, drills, warmups, recovery
Tab: Playbook    → draw plays, installs, read & react quiz   ⭐
Tab: Film        → upload, watch, coach comments
Tab: Profile     → badges, combine, journal, subscription
```

## Offline & sync
- Drills/programs viewable offline (cache video for downloaded sessions).
- Journal + drawn plays queue locally, sync when online.
- Use Supabase client with optimistic writes; reconcile on reconnect.

## Performance notes for drawing
- Drawing must feel **instant** — render strokes on the UI thread (Skia + Reanimated), commit to state on gesture end, not on every move.
- Animate plays with interpolation on the native thread, not JS, to stay at 60fps.

## Store & release
- **Expo EAS Build + Submit** for App Store / Play Store.
- **EAS Update** (OTA) for JS-only fixes without full store review.
- Plan for App Store review of **subscriptions** (Apple takes its cut on in-app purchases — see note below).

> [!warning] Apple/Google IAP vs Stripe
> Apple/Google generally require **in-app purchase** (and their 15–30% cut) for digital subscriptions bought inside the app. Stripe can handle web/coach/team billing, but the **consumer mobile subscription** may need IAP (via **RevenueCat** to manage both stores + reconcile with your backend). Confirm this early — it affects pricing in [[Subscription Model]]. Logged in [[Open Questions]].

## Web vs mobile split
| Capability | Web | Mobile |
|---|:---:|:---:|
| Marketing / signup | ✅ primary | ✅ |
| Daily training / drawing | ✅ | ✅ primary |
| Parent dashboard | ✅ primary | ✅ |
| Coach dashboard | ✅ primary | ✅ lite |
| Camp QR check-in | — | ✅ (camera) |
| Record throws | — | ✅ (camera) |
