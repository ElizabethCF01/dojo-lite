# DojoLite 🎓

## What it is

DojoLite is a lightweight classroom-management app for teachers, inspired by ClassDojo. A teacher signs in, groups students into classes, and awards or removes points in real time to reward participation. Each class keeps a live leaderboard with belt tiers that gamifies everyday feedback, and teachers can author multiple-choice quizzes, assign them to a class, and review students' attempts — a fast, focused tool for tracking engagement without the overhead of a full LMS.

## How it works (technical overview)

DojoLite is an Expo Router v6 app (Expo SDK 56, React Native 0.85, React 19, TypeScript). Routing in `src/app/` is kept strictly separate from logic: each domain is a self-contained feature module under `src/features/` (auth, classes, quizzes, students) that owns its types, hooks, and components and exposes a public surface via a barrel `index.ts`. Cross-cutting code lives in `src/shared/` — a token-based design system, a typed `apiFetch` client, an AsyncStorage cache, and platform services. Feature hooks load server state from the companion REST backend, caching responses locally for offline use; bearer tokens persist via `expo-secure-store`. Auth state lives in React Context (`AuthProvider`) and drives Expo Router's `Stack.Protected` guards to gate authenticated vs. unauthenticated routes.

### Tech stack

- **React Native 0.85 + Expo SDK 56 + Expo Router v6** — runtime and file-based navigation (stacks, tabs, modals, protected routes)
- **TypeScript** · **React Context** (auth/app state)
- **AsyncStorage** (response cache + onboarding flag) · **expo-secure-store** (auth token) · **expo-haptics**
- **Biome 2** (lint/format) · **Jest + jest-expo + Testing Library** (tests) · **Knip** (dead-code)
- **External service:** [`dojolite-api`](../dojolite-api) — companion REST backend (Hono + Drizzle + libSQL/Turso) on port `3333`

## Getting started

**Prerequisites:** Node.js (LTS), pnpm `10.24.0` (pinned via `.tool-versions`), the **dojolite-api** backend running locally, and an iOS/Android simulator or Expo Go on a device.

```bash
pnpm install              # install dependencies
cp .env.example .env      # create your local environment file
```

**Environment variables** (`.env`, see `.env.example`):

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_API_URL` | Base URL of the dojolite-api backend — set the host that matches where you run the app:<br>iOS simulator `http://localhost:3333` · Android emulator `http://10.0.2.2:3333` · physical device `http://192.168.x.x:3333` (your LAN IP) |

```bash
pnpm start          # start the Expo dev server (then: pnpm ios | android | web)

pnpm test           # run tests (jest-expo); pnpm test:ci for CI mode
pnpm fix            # biome lint + auto-fix + format (pnpm lint to check only)
pnpm lint-typecheck # tsc --noEmit
pnpm lint-knip      # detect unused files/exports
```

## Project structure

```
src/
  app/         # Expo Router routes only, no business logic
    (auth)/    #   login + onboarding (signed out)
    (tabs)/    #   classes, leaderboard, profile (signed in)
  features/    # self-contained domain modules, each with a barrel index.ts
    auth/  classes/  quizzes/  students/
  shared/      # cross-cutting code: api/  cache/  design/  services/  onboarding/
```

Modules import each other only through their public barrels using the `#features/*` and `#shared/*` aliases — never via deep relative paths.
