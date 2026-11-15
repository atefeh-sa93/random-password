# Random password generator

[![CI](https://github.com/atefeh-sa93/random-password/actions/workflows/ci.yml/badge.svg)](https://github.com/atefeh-sa93/random-password/actions/workflows/ci.yml)

A simple, secure password generator that runs entirely in your browser.

**Live site:** https://atefeh-sa93.github.io/random-password/

## Features

- Secure randomness with `crypto.getRandomValues` (no `Math.random`)
- Length from 8 to 50, with a slider or by typing
- Uppercase, lowercase, numbers and symbols, with at least one of each enabled type in every password
- Exclude similar characters (`i I l 1 L o 0 O`) and ambiguous ones (`{ } [ ] ( ) / \ ' "` …)
- Generate 1, 3, 5 or 10 passwords at once
- Strength meter with entropy in bits and a rough crack-time estimate
- One-click copy, with an error message if the browser blocks the clipboard

Passwords are generated on your device and never sent anywhere.

## Tech stack

- [Vue 3](https://vuejs.org/) with the Composition API and `<script setup>`
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Vuetify 3](https://vuetifyjs.com/) and Material Design Icons
- [Vitest](https://vitest.dev/) and Vue Test Utils
- GitHub Actions for CI and deployment to GitHub Pages

## Requirements

Node.js 22.18+ or 24.12+

## Commands

```sh
npm install        # install dependencies
npm run dev        # start the dev server with hot reload
npm run build      # type-check and build for production into dist/
npm run preview    # serve the production build locally
npm run type-check # check TypeScript types, including .vue and test files
npm test           # run unit and component tests once (npm run test:watch to rerun on save)
npm run lint       # check code with ESLint (npm run lint:fix to auto-fix)
npm run format     # format src/ with Prettier
```

## Project structure

```
src/
├── components/
│   ├── PasswordGenerator.vue   page: owns state, wires the parts together
│   ├── AppHeader.vue
│   ├── PasswordList.vue        shows passwords, emits copy / regenerate
│   ├── OptionsPanel.vue        length and character options (v-model)
│   └── StrengthMeter.vue
├── composables/
│   ├── usePasswordGenerator.ts options, passwords and strength
│   ├── useClipboard.ts         copy with success / error feedback
│   └── useAnalytics.ts
├── utils/
│   ├── password.ts             pure generation logic, no Vue
│   └── strength.ts             entropy and crack-time estimate
├── plugins/                    Vuetify and analytics setup
└── test/                       test setup and helpers
```

Tests live next to the code in `__tests__/` folders.

## CI and deployment

- **CI** (`.github/workflows/ci.yml`) runs lint, type-check, tests and build on every pull request and every push to `main`.
- **Deploy** (`.github/workflows/deploy.yml`) builds the site and publishes it to GitHub Pages on every push to `main`. The build sets `BASE_PATH=/random-password/` because Pages serves the site from that subpath.

## Analytics

Google Analytics runs only when `VITE_GA_ID` is set. Production builds read it from
`.env.production`; in development it is off by default (see `.env.example`).

Two events are sent: `generate_password` (with the chosen settings) and `copy_password`.
Passwords are never sent.
