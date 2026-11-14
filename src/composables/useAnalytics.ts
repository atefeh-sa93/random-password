import { event } from 'vue-gtag'

import { analyticsEnabled } from '@/plugins/analytics'
import type { PasswordOptions } from '@/utils/password'

/**
 * Analytics events for the generator.
 *
 * These functions never take a password as input, so a password cannot be
 * sent by mistake. Only the settings used to generate it are reported.
 */
export function useAnalytics() {
  function trackGenerate(options: PasswordOptions) {
    if (!analyticsEnabled) return
    event('generate_password', {
      password_length: options.length,
      password_count: options.count,
      uppercase: options.sets.uppercase,
      lowercase: options.sets.lowercase,
      numbers: options.sets.numbers,
      symbols: options.sets.symbols,
      exclude_similar: options.excludeSimilar,
      exclude_ambiguous: options.excludeAmbiguous,
    })
  }

  function trackCopy() {
    if (!analyticsEnabled) return
    event('copy_password')
  }

  return { trackGenerate, trackCopy }
}
