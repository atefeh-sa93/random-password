import { describe, expect, it } from 'vitest'

import {
  AMBIGUOUS_CHARS,
  buildPools,
  CHAR_SETS,
  clampLength,
  generatePassword,
  generatePasswords,
  MAX_LENGTH,
  MIN_LENGTH,
  randomInt,
  SIMILAR_CHARS,
  type PasswordOptions,
} from '@/utils/password'

/** Default-like options; each test overrides only what it cares about. */
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

const hasAnyOf = (text: string, chars: string) => [...text].some((c) => chars.includes(c))

describe('randomInt', () => {
  it('always returns an integer in [0, max)', () => {
    for (let i = 0; i < 1000; i++) {
      const n = randomInt(7)
      expect(Number.isInteger(n)).toBe(true)
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThan(7)
    }
  })

  it('returns every value in the range over many draws', () => {
    const seen = new Set<number>()
    for (let i = 0; i < 500; i++) seen.add(randomInt(5))
    expect([...seen].sort()).toEqual([0, 1, 2, 3, 4])
  })

  it.each([0, -1, 1.5, Number.NaN, 2 ** 32 + 1])('throws for max = %s', (max) => {
    expect(() => randomInt(max)).toThrow(RangeError)
  })
})

describe('clampLength', () => {
  it.each([
    ['1000', MAX_LENGTH],
    ['', MIN_LENGTH],
    ['abc', MIN_LENGTH],
    [3, MIN_LENGTH],
    [12.7, 13],
    ['24', 24],
    [Number.POSITIVE_INFINITY, MIN_LENGTH],
  ])('clampLength(%j) is %i', (input, expected) => {
    expect(clampLength(input)).toBe(expected)
  })
})

describe('buildPools', () => {
  it('returns one pool per enabled set', () => {
    const pools = buildPools(makeOptions())
    expect(pools).toEqual([CHAR_SETS.uppercase, CHAR_SETS.lowercase, CHAR_SETS.numbers])
  })

  it('removes similar and ambiguous characters', () => {
    const pools = buildPools(
      makeOptions({
        sets: { uppercase: true, lowercase: true, numbers: true, symbols: true },
        excludeSimilar: true,
        excludeAmbiguous: true,
      }),
    )
    const all = pools.join('')
    expect(hasAnyOf(all, SIMILAR_CHARS)).toBe(false)
    expect(hasAnyOf(all, AMBIGUOUS_CHARS)).toBe(false)
  })

  it('never leaves a set empty: numbers without similar characters keeps 8 digits', () => {
    const pools = buildPools(
      makeOptions({
        sets: { uppercase: false, lowercase: false, numbers: true, symbols: false },
        excludeSimilar: true,
      }),
    )
    expect(pools).toEqual(['23456789'])
  })
})

describe('generatePassword', () => {
  it('has the requested length', () => {
    expect(generatePassword(makeOptions({ length: 24 }))).toHaveLength(24)
  })

  it('clamps an out-of-range length', () => {
    expect(generatePassword(makeOptions({ length: 999 }))).toHaveLength(MAX_LENGTH)
  })

  it('always contains every enabled set, even at the minimum length', () => {
    const options = makeOptions({
      length: MIN_LENGTH,
      sets: { uppercase: true, lowercase: true, numbers: true, symbols: true },
    })
    for (let i = 0; i < 500; i++) {
      const password = generatePassword(options)
      expect(hasAnyOf(password, CHAR_SETS.uppercase)).toBe(true)
      expect(hasAnyOf(password, CHAR_SETS.lowercase)).toBe(true)
      expect(hasAnyOf(password, CHAR_SETS.numbers)).toBe(true)
      expect(hasAnyOf(password, CHAR_SETS.symbols)).toBe(true)
    }
  })

  it('only uses characters from enabled sets', () => {
    const options = makeOptions({
      sets: { uppercase: false, lowercase: true, numbers: true, symbols: false },
    })
    const allowed = CHAR_SETS.lowercase + CHAR_SETS.numbers
    for (let i = 0; i < 200; i++) {
      for (const char of generatePassword(options)) {
        expect(allowed).toContain(char)
      }
    }
  })

  it('applies the exclude options', () => {
    const options = makeOptions({
      sets: { uppercase: true, lowercase: true, numbers: true, symbols: true },
      excludeSimilar: true,
      excludeAmbiguous: true,
    })
    for (let i = 0; i < 200; i++) {
      const password = generatePassword(options)
      expect(hasAnyOf(password, SIMILAR_CHARS)).toBe(false)
      expect(hasAnyOf(password, AMBIGUOUS_CHARS)).toBe(false)
    }
  })

  it('throws when no set is enabled', () => {
    const options = makeOptions({
      sets: { uppercase: false, lowercase: false, numbers: false, symbols: false },
    })
    expect(() => generatePassword(options)).toThrow(RangeError)
  })
})

describe('generatePasswords', () => {
  it.each([1, 3, 5, 10] as const)('returns %i passwords', (count) => {
    expect(generatePasswords(makeOptions({ count }))).toHaveLength(count)
  })
})
