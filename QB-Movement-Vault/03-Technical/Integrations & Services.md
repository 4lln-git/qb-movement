---
title: Integrations & Services
type: technical
tags: [qbmovement, technical, integrations]
---

# Integrations & Services

Third-party services to **buy instead of build**. The rule: only build what's differentiated (playbook, skill tree, gamification, dashboards). Everything below is a solved problem someone else hosts.

| Need | Service | Used by | Notes |
|---|---|---|---|
| **Payments / subscriptions** | **Stripe Billing** | [[Subscription Model]] | Tiers, trials, proration, tax. Webhooks → sync `subscriptions` table |
| **Coach/marketplace payouts** | **Stripe Connect** | [[Coach Dashboard]], Marketplace | Split payments, KYC. Phase 4–5 |
| **Mobile subscriptions** | **RevenueCat** | [[Mobile App Architecture]] | Manages Apple/Google IAP + reconciles with backend |
| **Video upload/stream** | **Mux** or **Cloudflare Stream** | [[Film Room]], [[Throw Analysis AI]] | Transcode, adaptive streaming, thumbnails, signed playback |
| **File storage** | **Supabase Storage** / S3 | playbook exports, photos, certificates | Signed URLs for direct upload |
| **Auth** | **Supabase Auth** / Clerk | all | Social + email, roles, guardian flows |
| **Push notifications** | **Expo Push** | [[Gamification]] | Streak/challenge reminders |
| **Transactional email** | **Resend** / Postmark | weekly reports, receipts | [[Parent Dashboard]] reports |
| **Equipment store** | **Shopify** (headless/Buy SDK) | Store | Don't build commerce; embed Shopify |
| **Pose/AI** | **MediaPipe / MoveNet / Apple Vision** | [[Throw Analysis AI]] | On-device first |
| **Product analytics + flags** | **PostHog** | all | Funnels, retention, feature flags |
| **Error monitoring** | **Sentry** | all | Web + mobile crash/error tracking |
| **Calendar / Zoom** | **Zoom API / Cal.com** | Elite tier sessions, booking | Monthly Zoom, session scheduling |
| **QR codes** | library + camera | Camps check-in | Generate + scan in-app |
| **E-sign / waivers** | simple in-app signature or DocuSeal | Camps | Digital waiver before check-in |

## Webhook-driven sync pattern
Critical integrations push **webhooks** → your backend updates DB → app reads DB:
- Stripe → `subscriptions` (status, tier, period end).
- Mux → video ready/errored.
- RevenueCat → entitlement changes.

Never trust the client for entitlement/payment state — always reconcile via webhook to the DB, gate features off the DB. (Reinforced in [[Subscription Model]] and [[Data Model]].)

## Cost awareness
Most of these are usage-priced and cheap at low volume:
- Video (Mux) scales with minutes stored/streamed — biggest variable cost; lazy-transcode and tier-gate uploads.
- Stripe/RevenueCat take a % — bake into pricing.
- Supabase/Vercel/Expo have generous low tiers for launch.
