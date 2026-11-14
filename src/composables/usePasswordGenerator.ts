import { computed, readonly, ref, watch } from 'vue'

import { generatePasswords, type PasswordOptions } from '@/utils/password'
import { calculateStrength } from '@/utils/strength'

export function usePasswordGenerator() {
  const options = ref<PasswordOptions>({
    length: 16,
    sets: {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    },
    excludeSimilar: true,
    excludeAmbiguous: false,
    count: 3,
  })

  const passwords = ref<string[]>([])

  function regenerate() {
    passwords.value = generatePasswords(options.value)
  }

  // computed (not watch): strength follows from the options alone, so Vue can
  // cache it and only recalculate when an option it read changes.
  const strength = computed(() => calculateStrength(options.value))

  // deep: also react to changes inside the object (length, each switch).
  // immediate: run once right away, so there are passwords on first render.
  watch(options, regenerate, { deep: true, immediate: true })

  return {
    options,
    // readonly: components can read the passwords but only change them through regenerate().
    passwords: readonly(passwords),
    strength,
    regenerate,
  }
}
