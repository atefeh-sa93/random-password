import { buildPools, clampLength, type PasswordOptions } from '@/utils/password'

export type StrengthLevel = 'weak' | 'fair' | 'strong' | 'very-strong'

export interface Strength {
  /** Entropy in bits: length × log2(number of possible characters). */
  bits: number
  level: StrengthLevel
  /** Rough time to try half of all combinations, as readable text. */
  crackTime: string
}

/** Assumed attacker speed for the crack-time estimate. */
export const GUESSES_PER_SECOND = 1e10

const SECONDS_PER_YEAR = 31_557_600

function levelFor(bits: number): StrengthLevel {
  if (bits < 40) return 'weak'
  if (bits < 60) return 'fair'
  if (bits < 80) return 'strong'
  return 'very-strong'
}

function plural(value: number, unit: string): string {
  const rounded = Math.round(value)
  return `${rounded.toLocaleString('en-US')} ${unit}${rounded === 1 ? '' : 's'}`
}

export function formatDuration(seconds: number): string {
  if (seconds < 1) return 'less than a second'
  if (seconds < 60) return plural(seconds, 'second')
  if (seconds < 3600) return plural(seconds / 60, 'minute')
  if (seconds < 86_400) return plural(seconds / 3600, 'hour')
  if (seconds < SECONDS_PER_YEAR) return plural(seconds / 86_400, 'day')

  const years = seconds / SECONDS_PER_YEAR
  if (years < 1e6) return plural(years, 'year')
  if (years < 1e9) return plural(years / 1e6, 'million year')
  if (years < 1e12) return plural(years / 1e9, 'billion year')
  return 'trillions of years'
}

/**
 * Estimates how strong passwords generated with these options are.
 * Depends only on the options, not on a specific password.
 */
export function calculateStrength(options: PasswordOptions): Strength {
  const poolSize = buildPools(options).join('').length
  const bits = poolSize > 1 ? clampLength(options.length) * Math.log2(poolSize) : 0

  // On average an attacker finds the password after trying half of all combinations.
  const seconds = 2 ** (bits - 1) / GUESSES_PER_SECOND

  return { bits, level: levelFor(bits), crackTime: formatDuration(seconds) }
}
