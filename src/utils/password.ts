export type CharSetKey = 'uppercase' | 'lowercase' | 'numbers' | 'symbols'

// `satisfies` checks that all four keys exist, while `as const` keeps the exact string values.
export const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '`!@#$%^&*)(-_+=}{][/|?><',
} as const satisfies Record<CharSetKey, string>

export const CHAR_SET_KEYS = Object.keys(CHAR_SETS) as CharSetKey[]

export const MIN_LENGTH = 8
export const MAX_LENGTH = 50

export interface PasswordOptions {
  length: number
  sets: Record<CharSetKey, boolean>
}

/**
 * Returns a cryptographically secure random integer in the range [0, max).
 *
 * `value % max` alone is slightly biased when 2^32 is not a multiple of `max`:
 * the lowest results come up a little more often. To avoid that, values above
 * the largest multiple of `max` are thrown away and drawn again (rejection sampling).
 */
export function randomInt(max: number): number {
  if (!Number.isInteger(max) || max < 1 || max > 2 ** 32) {
    throw new RangeError(`max must be an integer between 1 and 2^32, got ${max}`)
  }
  const limit = Math.floor(2 ** 32 / max) * max
  const buffer = new Uint32Array(1)
  let value: number
  do {
    crypto.getRandomValues(buffer)
    // With noUncheckedIndexedAccess, buffer[0] is `number | undefined`.
    value = buffer[0] ?? 0
  } while (value >= limit)
  return value % max
}

/** Turns any input (string from a text field, NaN, 1000, ...) into a valid length. */
export function clampLength(value: unknown): number {
  const n = Math.round(Number(value))
  if (!Number.isFinite(n)) return MIN_LENGTH
  return Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, n))
}

function randomChar(chars: string): string {
  return chars.charAt(randomInt(chars.length))
}

/** Fisher–Yates shuffle, in place, using secure randomness. */
function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    const a = items[i] as T
    items[i] = items[j] as T
    items[j] = a
  }
  return items
}

/**
 * Generates a password that contains at least one character from every enabled set.
 * Throws if no set is enabled.
 */
export function generatePassword(options: PasswordOptions): string {
  const pools = CHAR_SET_KEYS.filter((key) => options.sets[key]).map((key) => CHAR_SETS[key])
  if (pools.length === 0) {
    throw new RangeError('At least one character set must be enabled')
  }
  const length = clampLength(options.length)
  const allChars = pools.join('')

  // One guaranteed character per enabled set, then fill the rest from all sets.
  const chars = pools.map(randomChar)
  while (chars.length < length) {
    chars.push(randomChar(allChars))
  }
  // Shuffle so the guaranteed characters are not always at the start.
  return shuffle(chars).join('')
}
