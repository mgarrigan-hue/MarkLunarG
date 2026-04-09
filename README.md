# 🌙 Artemis II — Live Mission Dashboard

An interactive, cinematic real-time tracker for NASA's **Artemis II** crewed lunar flyby mission.

**[▶ View Live Dashboard](https://mgarrigan-hue.github.io/MarkLunarG/)**

![Artemis II Dashboard](https://img.shields.io/badge/Artemis_II-LIVE-22c55e?style=for-the-badge&logo=nasa&logoColor=white)

## Features

- 🎬 **Cinematic trajectory replay** — animated from launch to current position with dynamic camera zoom/pan
- 📡 **Live telemetry** — speed, altitude, Earth/Moon distance, g-force, signal light-time
- 🌍 **Trajectory visualization** — parallax starfield, comet-trail particles, milestone title cards
- 🛰️ **Spacecraft attitude** — roll, pitch, yaw from real AROW data
- 📻 **Deep Space Network** — live dish tracking status (Goldstone, Canberra, Madrid)
- 🔥 **RCS thruster status** — real-time firing indicators
- ☀️ **Solar array wing angles**
- ⏱️ **Mission timeline** — 12 milestones from launch to splashdown

## Data Sources

| Endpoint | Data | Update Rate |
|----------|------|-------------|
| [`/api/orbit`](https://artemis.cdnspace.ca/api/orbit) | Speed, distances, altitude, orbital params | ~5 min |
| [`/api/arow`](https://artemis.cdnspace.ca/api/arow) | Position, attitude, thrusters, solar arrays | ~1 min |
| [`/api/dsn`](https://artemis.cdnspace.ca/api/dsn) | Deep Space Network dish status | ~30 s |

All data originates from **NASA's Artemis Real-time Orbit Website (AROW)** via a community relay API.

## How It Works

A single `index.html` file — no build tools, no frameworks, no dependencies. Uses:

- **Canvas API** for the cinematic trajectory rendering
- **Catmull-Rom splines** for smooth trajectory & camera interpolation
- **Particle system** for comet-trail and engine burn effects
- **CORS proxy fallback chain** for GitHub Pages compatibility

## Playback Controls

| Control | Action |
|---------|--------|
| ⏸ / ▶ | Pause / resume replay |
| Progress bar | Click or drag to scrub to any point |
| 1× 3× 8× 20× | Playback speed (3× ≈ 60s to catch up) |
| ⏭ LIVE | Skip to real-time tracking |
| ↩ REPLAY | Re-watch from launch |

## Run Locally

Just open `index.html` in a browser. For best results with live data, use the included proxy:

```bash
node server.js
# → http://localhost:3000
```

## License

This is an unofficial, non-commercial project. Not affiliated with NASA.
NASA data is public domain. Community relay API terms apply.
