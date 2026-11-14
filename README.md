# random-password

A simple random password generator.

Built with Vue 3, Vite, TypeScript, and Vuetify 3. The upgrade from Vue 2 is in progress
(see issues labeled `vue3-upgrade`).

## Requirements

Node.js 22.18+ or 24.12+

## Commands

```sh
npm install        # install dependencies
npm run dev        # start the dev server with hot reload
npm run build      # type-check and build for production into dist/
npm run preview    # serve the production build locally
npm run type-check # check TypeScript types, including .vue files
npm run lint       # check code with ESLint (npm run lint:fix to auto-fix)
npm run format     # format src/ with Prettier
```

## Analytics

Google Analytics runs only when `VITE_GA_ID` is set. Production builds read it from
`.env.production`; in development it is off by default (see `.env.example`).

Two events are sent: `generate_password` (with the chosen settings) and `copy_password`.
Passwords are never sent.
