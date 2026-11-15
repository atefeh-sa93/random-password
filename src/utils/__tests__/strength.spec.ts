import { describe, expect, it } from 'vitest'

import type { PasswordOptions } from '@/utils/password'
import { calculateStrength, formatDuration } from '@/utils/strength'

function makeOptions(overrides: Partial<PasswordOptions> = {}): PasswordOptions {
  return {
    length: 16,
    sets: { uppercase: true, lowercase: true, numbers: true, symbols: false },
    excludeSimilar: false,
    excludeAmbiguous: false,
    count: 1,
    ...overrides,
  }
}

describe('calculateStrength', () => {
  it('computes bits as length × log2(pool size)', () => {
    // 26 + 26 + 10 = 62 characters
    const { bits } = calculateStrength(makeOptions())
    expect(bits).toBeCloseTo(16 * Math.log2(62), 6)
    expect(Math.round(bits)).toBe(95)
  })

  it('counts fewer characters when similar ones are excluded', () => {
    const withAll = calculateStrength(makeOptions()).bits
    const withoutSimilar = calculateStrength(makeOptions({ excludeSimilar: true })).bits
    // 62 - 8 similar characters = 54
    expect(withoutSimilar).toBeCloseTo(16 * Math.log2(54), 6)
    expect(withoutSimilar).toBeLessThan(withAll)
  })

  // Numbers only: 10 characters, so bits = length × log2(10) ≈ length × 3.32.
  // These lengths land just below and just above each threshold (40, 60, 80).
  it.each([
    [12, 39.9, 'weak'],
    [13, 43.2, 'fair'],
    [18, 59.8, 'fair'],
    [19, 63.1, 'strong'],
    [24, 79.7, 'strong'],
    [25, 83.0, 'very-strong'],
  ] as const)('numbers only, length %i (%d bits) is %s', (length, expectedBits, expectedLevel) => {
    const { bits, level } = calculateStrength(
      makeOptions({
        length,
        sets: { uppercase: false, lowercase: false, numbers: true, symbols: false },
      }),
    )
    expect(bits).toBeCloseTo(expectedBits, 1)
    expect(level).toBe(expectedLevel)
  })
})

describe('formatDuration', () => {
  it.each([
    [0.2, 'less than a second'],
    [1, '1 second'],
    [45, '45 seconds'],
    [120, '2 minutes'],
    [7200, '2 hours'],
    [86_400 * 6, '6 days'],
    [31_557_600 * 5, '5 years'],
    [31_557_600 * 3e6, '3 million years'],
    [31_557_600 * 8e9, '8 billion years'],
    [31_557_600 * 1e15, 'trillions of years'],
  ])('formatDuration(%d) is "%s"', (seconds, expected) => {
    expect(formatDuration(seconds)).toBe(expected)
  })
})
