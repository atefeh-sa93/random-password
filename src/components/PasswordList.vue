<script setup lang="ts">
const props = defineProps<{
  passwords: readonly string[]
}>()

// Each key is an event name; the tuple lists that event's arguments.
const emit = defineEmits<{
  copy: [password: string]
  regenerate: []
}>()
</script>

<template>
  <v-card rounded="lg" elevation="6" class="pa-2">
    <v-card-title class="text-h6">
      {{ props.passwords.length === 1 ? 'Your password' : 'Your passwords' }}
    </v-card-title>

    <v-card-text class="pb-2">
      <div
        v-for="(password, index) in passwords"
        :key="index"
        class="password-row d-flex align-center ga-2 rounded border pa-2 pl-4 mb-2"
      >
        <code class="password-row__text flex-grow-1 text-body-1" data-testid="password">{{
          password
        }}</code>
        <v-btn
          icon="mdi-content-copy"
          variant="text"
          density="comfortable"
          aria-label="Copy password"
          @click="emit('copy', password)"
        />
      </div>

      <!-- Slot: the parent decides what goes under the list (the strength meter). -->
      <slot />
    </v-card-text>

    <v-card-actions class="px-4 pb-4">
      <v-btn
        block
        color="primary"
        variant="flat"
        size="large"
        prepend-icon="mdi-refresh"
        @click="emit('regenerate')"
      >
        Generate
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.password-row__text {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  letter-spacing: 0.5px;
  word-break: break-all;
  /* One click selects the whole password. */
  user-select: all;
}
</style>
