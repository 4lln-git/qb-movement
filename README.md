# QB Movement — Platform Planning Vault

This repo contains an **Obsidian vault** that plans the rebuild of
[theqbmovement.ca](https://www.theqbmovement.ca) from a Weebly site into a full
**quarterback development ecosystem** (web + mobile app), including the flagship
**drawable digital playbook**.

## How to open it
1. Install [Obsidian](https://obsidian.md) (free).
2. **Open folder as vault** → select the `QB-Movement-Vault/` folder.
3. Start at **`QB Movement Platform.md`** (the hub / map of content). Every note is
   cross-linked — use the graph view to explore.

## What's inside
```
QB-Movement-Vault/
├── QB Movement Platform.md      ← START HERE (master plan / hub)
├── 01-Overview/                 Vision, subscriptions, personas, competitors
├── 02-Features/                 All 15 features (Digital Playbook ⭐ is the flagship)
├── 03-Technical/                Tech stack, data model, mobile, drawing engine, integrations
├── 04-Roadmap/                  Phases, MVP scope, open decisions
└── _attachments/                Reference images (incl. your 3D play-designer screenshot)
```

## The short version
- **Yes**, a playbook where players draw routes is buildable — start with a **2D
  drawable canvas** (Phase 2), add **3D** later (Phase 5). See
  `02-Features/Digital Playbook.md` and `03-Technical/Playbook Drawing Engine.md`.
- Recommended stack: **Next.js (web) + Expo/React Native (mobile) + Supabase +
  Stripe + Mux**, in a shared TypeScript monorepo.
- Build order: foundation → daily training → ⭐playbook + skill tree → engagement →
  coach/business tools → AI/recruiting/store/3D. See `04-Roadmap/`.
- Decisions still open are collected in `04-Roadmap/Open Questions.md` (each with a
  recommended default).
