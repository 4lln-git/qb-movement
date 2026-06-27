---
title: Playbook Drawing Engine
type: technical
tags: [qbmovement, technical, playbook, canvas]
---

# Playbook Drawing Engine

How the "player can draw" part of [[Digital Playbook]] actually works under the hood. This is the most novel piece of the build, so here's the concrete approach.

## Core concept
A play is **data**, not a picture. The canvas is just a *renderer* of that data. This separation is what lets the same play be edited, animated, graded, printed, and (later) shown in 3D.

```
[ Play JSON ]  ──renders to──►  2D canvas / 3D field / PNG card
      ▲
      └── editing (drag players, draw routes) writes back to JSON
```

## The field
- Render a **football field** as the background (image or drawn lines: yard lines, hashes, numbers).
- Use a **coordinate system normalized 0–1** in both axes. (0,0) = one corner, (1,1) = the other. Convert to pixels at render time based on the canvas size. → plays look right on phone, tablet, and web.

## Players (tokens)
- Each offensive/defensive player is a token: a draggable circle (offense) or X (defense) with a label.
- Drag = update its `{x, y}`. Snap-to-grid or formation templates make alignment easy.

## Routes (the drawing)
The actual "draw with your finger" mechanic:
1. **Pointer down** on a player → start a route.
2. **Pointer move** → sample points (`pointermove` / touch events) into an array `[[x,y], [x,y], …]`.
3. **Pointer up** → finish. Run the raw points through a **smoothing** pass (e.g. simplify with Ramer–Douglas–Peucker, then render as a smooth/Catmull-Rom curve) so messy finger input looks like a clean route.
4. Render the path as a line + **arrowhead** at the end. Break-style routes (slant, dig) just fall out of the points naturally.

### Tech options for the canvas
| Option | Good for | Notes |
|---|---|---|
| **Konva.js** (`react-konva`) | Web 2D editor | Built for draggable shapes + events. **Recommended for web v1.** |
| **HTML5 Canvas (raw)** | Full control | More code; only if Konva is too limiting |
| **SVG** | Crisp export, simple plays | Easy to print/share; fine for static cards |
| **React Native Skia** | Mobile drawing | High-perf canvas for the [[Mobile App Architecture|app]]. **Recommended for mobile.** |
| **react-native-svg / Gesture Handler** | Mobile, simpler plays | Lighter than Skia |

> [!tip] Cross-platform reuse
> Keep the **play data format + rendering math** in a shared TypeScript package. Then web (Konva) and mobile (Skia) both consume the same logic; only the draw calls differ.

## Animation (press play)
- Each route is a path; interpolate token position along the path over time (e.g. 0→1 with `requestAnimationFrame` / Reanimated on mobile).
- All players move simultaneously = the play "runs." Pure 2D math, no engine needed.

## Quiz grading (Read & React mode)
To grade a player's drawn route against the answer:
- Normalize both routes to N sample points.
- Compare with a distance metric (e.g. average point distance, or **Fréchet/DTW** distance for shape similarity).
- Within tolerance → correct, award [[Gamification|XP]]. This is a small algorithm once the data shape exists.

## The 3D upgrade (later)
- Swap the renderer, **keep the data**. Feed the same `{players, routes}` JSON into **React Three Fiber / Three.js** (or Unity/Godot embedded) to get the stadium view from your screenshot.
- 3D is a big, separate effort — it's a *rendering* swap, not a data change, which is exactly why we design the data layer well now.

## Minimum viable drawing feature
1. Field background + draggable tokens.
2. Finger-draw a route → smoothed arrow.
3. Save/load play JSON to DB.
4. Re-render saved plays in a list.

Everything else (templates, animation, grading, 3D) builds on those four.
