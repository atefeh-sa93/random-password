<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import {
  CHAR_SET_KEYS,
  clampLength,
  MAX_LENGTH,
  MIN_LENGTH,
  PASSWORD_COUNTS,
  type CharSetKey,
  type PasswordOptions,
} from '@/utils/password'

// defineModel creates the `modelValue` prop and the `update:modelValue` event,
// so the parent can write <OptionsPanel v-model="options" />.
const options = defineModel<PasswordOptions>({ required: true })

const charSetSwitches: { key: CharSetKey; label: string; hint: string }[] = [
  { key: 'uppercase', label: 'Uppercase', hint: 'ABC' },
  { key: 'lowercase', label: 'Lowercase', hint: 'abc' },
  { key: 'numbers', label: 'Numbers', hint: '123' },
  { key: 'symbols', label: 'Symbols', hint: '!@#$' },
]

const enabledSetCount = computed(
  () => CHAR_SET_KEYS.filter((key) => options.value.sets[key]).length,
)

/** True when `key` is the only enabled set, so it must not be turned off. */
function isLastEnabledSet(key: CharSetKey): boolean {
  return options.value.sets[key] && enabledSetCount.value === 1
}

// The number field keeps its own text while the user is typing (so typing "1" on
// the way to "12" is not clamped to 8 right away). It is applied on blur or Enter.
const lengthInput = ref(String(options.value.length))

watch(
  () => options.value.length,
  (length) => {
    lengthInput.value = String(length)
  },
)

function commitLength() {
  const length = clampLength(lengthInput.value)
  options.value.length = length
  lengthInput.value = String(length)
}
</script>

<template>
  <v-card rounded="lg" elevation="6" class="pa-2">
    <v-card-title class="text-h6">Options</v-card-title>

    <v-card-text>
      <label for="password-length" class="text-body-2 text-medium-emphasis">Length</label>
      <v-slider
        v-model="options.length"
        :min="MIN_LENGTH"
        :max="MAX_LENGTH"
        :step="1"
        color="primary"
        hide-details
        aria-label="Password length"
      >
        <template #append>
          <v-text-field
            id="password-length"
            v-model="lengthInput"
            type="number"
            :min="MIN_LENGTH"
            :max="MAX_LENGTH"
            variant="outlined"
            density="compact"
            hide-details
            style="width: 84px"
            @update:focused="(focused: boolean) => !focused && commitLength()"
            @keydown.enter="commitLength"
          />
        </template>
      </v-slider>

      <div class="text-body-2 text-medium-emphasis mt-6 mb-1">Characters</div>
      <v-switch
        v-for="charSet in charSetSwitches"
        :key="charSet.key"
        v-model="options.sets[charSet.key]"
        :disabled="isLastEnabledSet(charSet.key)"
        color="primary"
        density="compact"
        hide-details
        inset
      >
        <template #label>
          {{ charSet.label }}
          <code class="text-medium-emphasis ml-2">{{ charSet.hint }}</code>
        </template>
      </v-switch>
      <p v-if="enabledSetCount === 1" class="text-caption text-medium-emphasis mt-2 mb-0">
        At least one character type stays on.
      </p>

      <div class="text-body-2 text-medium-emphasis mt-6 mb-1">Advanced</div>
      <v-switch
        v-model="options.excludeSimilar"
        color="primary"
        density="compact"
        hide-details
        inset
      >
        <template #label>
          Exclude similar
          <code class="text-medium-emphasis ml-2">i I l 1 L o 0 O</code>
        </template>
      </v-switch>
      <v-switch
        v-model="options.excludeAmbiguous"
        color="primary"
        density="compact"
        hide-details
        inset
      >
        <template #label>
          Exclude ambiguous
          <code class="text-medium-emphasis ml-2">{ } [ ] ( ) / \ ' " …</code>
        </template>
      </v-switch>

      <div class="d-flex align-center justify-space-between mt-4">
        <span id="password-count-label" class="text-body-2">How many</span>
        <v-btn-toggle
          v-model="options.count"
          mandatory
          color="primary"
          density="compact"
          variant="outlined"
          divided
          aria-labelledby="password-count-label"
        >
          <v-btn v-for="count in PASSWORD_COUNTS" :key="count" :value="count">{{ count }}</v-btn>
        </v-btn-toggle>
      </div>
    </v-card-text>
  </v-card>
</template>
