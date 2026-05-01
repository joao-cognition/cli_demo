# NEXUS Intelligence Platform

> Real-time infrastructure monitoring and analytics dashboard built for the **Devin Terminal** hackathon demo.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

## What is this?

NEXUS is a dark-themed, real-time monitoring dashboard designed to showcase **Devin for Terminal** capabilities at hackathon demos. It features live-updating charts, service health monitoring, API key management, and alert handling — all with a cyberpunk aesthetic that looks great on stage.

### Demo-Ready Features

- **Live Dashboard** — Real-time metrics with sparklines, animated charts, and activity feed
- **Analytics** — Traffic distribution charts and endpoint performance tables
- **Monitoring** — Service latency streaming, resource gauges, and active alerts
- **API Keys** — Key management with visibility toggles and permission badges
- **Settings** — Toggle-based configuration with unsaved change tracking

### Built for Devin Demo Script

This codebase is specifically designed to work with the Devin Terminal demo flow:

| Demo Act | What to Show | Repo Feature |
|----------|-------------|--------------|
| Act 1 — Interactive Work | `devin -- find a bug or suggest an improvement` | Strategic TODOs, improvement opportunities |
| Act 2 — `/handoff` | Hand off to cloud Devin | Complex enough for meaningful cloud work |
| Act 3 — Power Features | `/loop`, subagents, `/plan` | Auth patterns, lint issues, multiple files |
| Act 4 — Scriptable | `devin -p "list all TODO comments"` | 15+ TODO comments across the codebase |

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (main)
│   ├── analytics/         # Traffic & endpoint analytics
│   ├── monitoring/        # Service health & alerts
│   ├── api-keys/          # API key management
│   └── settings/          # Platform configuration
├── components/
│   ├── layout/            # Sidebar, Header
│   ├── dashboard/         # MetricCard, LiveChart, ActivityFeed, SystemHealth
│   ├── analytics/         # TrafficChart, EndpointTable
│   ├── monitoring/        # ServiceLatencyChart, AlertsPanel
│   └── ui/                # Card, Badge, Button primitives
├── lib/
│   ├── auth.tsx           # Auth context (demo patterns)
│   ├── mock-data.ts       # Realistic mock data generators
│   ├── utils.ts           # Formatting utilities
│   └── hooks/             # Custom React hooks
└── types/
    └── index.ts           # TypeScript type definitions
```

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # Run ESLint
npm run start     # Start production server
```

## License

MIT
