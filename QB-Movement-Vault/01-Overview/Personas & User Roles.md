---
title: Personas & User Roles
type: strategy
tags: [qbmovement, personas, roles]
---

# Personas & User Roles

The platform is **multi-sided**. Every screen, permission, and notification depends on *who* is looking. Build roles into the data model from day one — retrofitting roles later is painful.

## Roles

### 1. Player (the athlete) — primary user
- Trains daily, follows programs, draws plays, logs journal entries.
- Wants: get better, see progress, feel the game (gamification).
- Lives in: mobile app mostly.

### 2. Parent — the buyer
- Often pays the subscription. Needs **visibility and reassurance**.
- Wants: "Is my kid showing up, improving, and is this worth the money?"
- Lives in: [[Parent Dashboard]] (web + mobile).
- Linked to one or more Player accounts (guardian relationship).

### 3. Coach — the business operator
- Runs sessions, reviews film, assigns work, communicates, gets paid.
- Wants: scale beyond hours-for-dollars, manage the roster, look pro.
- Lives in: [[Coach Dashboard]].

### 4. Recruiter (later phase)
- Views athlete profiles shared from the Recruiting Hub.
- Read-only, scoped, often unauthenticated via share link.

### 5. Admin / Org Owner
- You. Manages everything: users, content, camps, payments, analytics.

## Relationships (important for data model)
- A **Parent** ↔ many **Players** (guardian link, with consent — minors!)
- A **Coach** ↔ many **Players** (roster / assignment)
- A **Team/School** ↔ one **Coach** + up to 15 **Players**
- A **Player** ↔ one active **Subscription**

> [!warning] Minors & consent
> Most quarterbacks here are youth athletes. This means:
> - **Parental consent** flows for under-18 accounts
> - **COPPA / PIPEDA** (Canada) considerations for data on minors
> - Coach ↔ minor messaging should be **observable by parents** (safeguarding)
> - Photo/video usage needs explicit waiver consent (ties into Camps waivers)
>
> Flag this for legal review before launch. It affects the messaging and film features directly.

See [[Data Model]] for how these map to tables.
