<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import OptionsPanel from '@/components/OptionsPanel.vue'
import PasswordList from '@/components/PasswordList.vue'
import StrengthMeter from '@/components/StrengthMeter.vue'
import { useClipboard } from '@/composables/useClipboard'
import { usePasswordGenerator } from '@/composables/usePasswordGenerator'

const { options, passwords, strength, regenerate } = usePasswordGenerator()
const { feedback, copy } = useClipboard()
</script>

<template>
  <div class="page">
    <div class="page__band" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <v-container class="page__content" max-width="960">
      <AppHeader />

      <v-row>
        <v-col cols="12" md="6">
          <PasswordList :passwords="passwords" @copy="copy" @regenerate="regenerate">
            <StrengthMeter :strength="strength" class="mt-4" />
          </PasswordList>
        </v-col>
        <v-col cols="12" md="6">
          <OptionsPanel v-model="options" />
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar
      v-model="feedback.show"
      :timeout="2000"
      :color="feedback.color"
      location="bottom"
      rounded="pill"
    >
      {{ feedback.text }}
    </v-snackbar>
  </div>
</template>

<style scoped lang="scss">
.page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #f5f5f7;
}

.page__content {
  position: relative;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

// Orange skewed band behind the header, with soft circles.
.page__band {
  position: absolute;
  inset: 0 0 auto 0;
  height: 340px;
  background: linear-gradient(87deg, #fb6340 0, #fbb140 100%);
  transform: skewY(-6deg);
  transform-origin: 0;

  span {
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);

    &:nth-child(1) {
      left: -3%;
      top: 8%;
    }
    &:nth-child(2) {
      right: 4%;
      top: 12%;
    }
    &:nth-child(3) {
      right: 22%;
      bottom: 10%;
      width: 72px;
      height: 72px;
      background: rgba(255, 255, 255, 0.2);
    }
    &:nth-child(4) {
      left: 12%;
      bottom: -8%;
      width: 200px;
      height: 200px;
    }
  }
}
</style>
