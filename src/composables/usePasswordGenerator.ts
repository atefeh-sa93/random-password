import { readonly, ref, watch } from 'vue'

import { generatePassword, type PasswordOptions } from '@/utils/password'

export function usePasswordGenerator() {
  const options = ref<PasswordOptions>({
    length: 8,
    sets: {
      uppercase: false,
      lowercase: true,
      numbers: true,
      symbols: false,
    },
  })

  const password = ref('')

  function regenerate() {
    password.value = generatePassword(options.value)
  }

  // deep: also react to changes inside the object (length, each switch).
  // immediate: run once right away, so there is a password on first render.
  watch(options, regenerate, { deep: true, immediate: true })

  return {
    options,
    // readonly: components can read the password but only change it through regenerate().
    password: readonly(password),
    regenerate,
  }
}
