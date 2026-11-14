import type { App } from 'vue'
import { createGtag } from 'vue-gtag'

const tagId = import.meta.env.VITE_GA_ID

/** False in development, where no measurement ID is configured. */
export const analyticsEnabled = Boolean(tagId)

/** Registers Google Analytics on the app, only when a measurement ID is set. */
export function installAnalytics(app: App) {
  if (!tagId) return
  app.use(createGtag({ tagId }))
}
