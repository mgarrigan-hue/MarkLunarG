# 🌙 Artemis II — Mission Complete

An interactive, cinematic retrospective of NASA's **Artemis II** crewed lunar flyby mission — humanity's return to the Moon.

**[▶ View Mission Retrospective](https://mgarrigan-hue.github.io/MarkLunarG/)**

![Artemis II Dashboard](https://img.shields.io/badge/Artemis_II-MISSION_COMPLETE-f59e0b?style=for-the-badge&logo=nasa&logoColor=white)

## Mission Summary

| Stat | Value |
|------|-------|
| 🚀 **Launch** | April 1, 2026 22:35 UTC — Kennedy Space Center |
| 🪂 **Splashdown** | April 11, 2026 10:53 UTC — Pacific Ocean |
| ⏱️ **Duration** | 9 days, 12 hours, 18 minutes |
| 📏 **Total Distance** | ~2.16 million km |
| 🌙 **Closest Lunar Approach** | 4,600 km above the surface |
| 🏎️ **Peak Speed** | 39,429 km/h |
| 🌍 **Max Earth Distance** | 400,171 km |

## Features

- 🌍 **3D cinematic mode** — Three.js WebGL scene with NASA Blue Marble textured Earth, Moon, 8,000 stars, and 3D Orion spacecraft (toggle 🗺️ MAP / 🌍 3D)
- 🎬 **2D trajectory replay** — animated from launch to splashdown with dynamic camera zoom/pan
- 🚀 **Spacecraft staging** — SLS full stack → Orion + ICPS → Orion capsule, visually transitioning at SRB and ICPS separation
- 🎊 **Splashdown celebration** — confetti particle effect at mission completion
- 📊 **Peak mission data** — all key telemetry values from the mission
- 🏆 **Mission achievements** — historic firsts and records
- ⏱️ **Complete mission timeline** — 10 milestones from launch to splashdown
- 📚 **Mission facts** — SLS thrust, heat shield temps, crew cabin specs, and more

## How It Works

A single `index.html` file — no build tools, no bundlers. Uses:

- **Three.js** (r149 via CDN) for the 3D cinematic Earth/Moon/spacecraft scene
- **Canvas API** for the 2D trajectory rendering and HUD overlays
- **Catmull-Rom splines** for smooth trajectory & camera interpolation
- **Particle system** for comet-trail, engine burn, and celebration effects
- **Hardcoded mission data** — no external API dependencies

## Playback Controls

| Control | Action |
|---------|--------|
| ⏸ / ▶ | Pause / resume replay |
| Progress bar | Click or drag to scrub to any point |
| 1× 3× 8× 20× | Playback speed (8× default) |
| 🗺️ MAP / 🌍 3D | Toggle between 2D map and 3D cinematic view |
| ↩ REPLAY | Restart the journey from launch |

## Run Locally

Just open `index.html` in any modern browser — no server required.

## License

This is an unofficial, non-commercial project. Not affiliated with NASA.
NASA data is public domain.
