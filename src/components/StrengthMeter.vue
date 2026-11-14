<script setup lang="ts">
import { computed } from 'vue'

import type { Strength, StrengthLevel } from '@/utils/strength'

const props = defineProps<{
  strength: Strength
}>()

// Record<StrengthLevel, ...> forces an entry for every level: adding a level
// to the union without updating this table is a type error.
const LEVEL_DISPLAY: Record<StrengthLevel, { label: string; color: string; score: number }> = {
  weak: { label: 'Weak', color: 'error', score: 1 },
  fair: { label: 'Fair', color: 'warning', score: 2 },
  strong: { label: 'Strong', color: 'success', score: 3 },
  'very-strong': { label: 'Very strong', color: 'success', score: 4 },
}

const display = computed(() => LEVEL_DISPLAY[props.strength.level])
</script>

<template>
  <div
    class="strength"
    role="meter"
    aria-label="Password strength"
    aria-valuemin="0"
    aria-valuemax="4"
    :aria-valuenow="display.score"
    :aria-valuetext="display.label"
  >
    <div class="d-flex ga-1 mb-1">
      <span
        v-for="segment in 4"
        :key="segment"
        class="strength__segment flex-grow-1 rounded-pill"
        :class="segment <= display.score ? `bg-${display.color}` : 'bg-grey-lighten-2'"
      ></span>
    </div>
    <div class="d-flex justify-space-between text-body-2">
      <span
        class="font-weight-medium"
        :class="`text-${display.color}`"
        data-testid="strength-label"
      >
        {{ display.label }}
      </span>
      <span class="text-medium-emphasis">{{ Math.round(strength.bits) }} bits</span>
    </div>
    <p class="text-caption text-medium-emphasis mb-0">
      About {{ strength.crackTime }} to crack at 10 billion guesses per second
    </p>
  </div>
</template>

<style scoped>
.strength__segment {
  height: 6px;
}
</style>
