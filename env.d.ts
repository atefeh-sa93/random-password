/// <reference types="vite/client" />

// Declaration merging: this adds our variables to Vite's built-in ImportMetaEnv
// type, so `import.meta.env.VITE_GA_ID` is typed instead of `any`.
interface ImportMetaEnv {
  /** Google Analytics measurement ID. Analytics is off when this is not set. */
  readonly VITE_GA_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
