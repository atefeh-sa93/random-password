<script setup lang="ts">
import { ref, watch } from 'vue'

import { usePasswordGenerator } from '@/composables/usePasswordGenerator'
import { clampLength, MAX_LENGTH, MIN_LENGTH, type CharSetKey } from '@/utils/password'

const { options, password, regenerate, isLastEnabledSet } = usePasswordGenerator()

const charSetSwitches: { key: CharSetKey; title: string; color: string }[] = [
  { key: 'uppercase', title: 'UpperCase', color: 'red' },
  { key: 'lowercase', title: 'LowerCase', color: 'green' },
  { key: 'numbers', title: 'Numbers', color: 'blue' },
  { key: 'symbols', title: 'Symbols', color: 'purple' },
]

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

const SNACKBAR_TIMEOUT = 2000

const snackbar = ref<{ show: boolean; text: string; color: 'success' | 'error' }>({
  show: false,
  text: '',
  color: 'success',
})

async function copyPassword() {
  try {
    // writeText returns a Promise that rejects when the browser blocks clipboard
    // access (page not focused, no permission, or not served over https).
    await navigator.clipboard.writeText(password.value)
    snackbar.value = { show: true, text: 'Password copied', color: 'success' }
  } catch {
    snackbar.value = {
      show: true,
      text: "Couldn't copy. Select the password and copy it manually.",
      color: 'error',
    }
  }
}
</script>

<template>
  <div class="main-content section-shaped overflow-hidden">
    <div class="shape shape-style-1 bg-gradient-warning shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <v-container>
      <v-row class="align-center">
        <div class="d-flex px-3 mb-4 mx-auto">
          <div class="intro-icon">
            <v-icon color="deep-purple-darken-4" icon="mdi-lock-open-outline" />
          </div>
          <div class="pl-3">
            <h4 class="text-h4 font-weight-black text-white">Generate Password</h4>
            <p class="text-white text-center font-weight-bold">Simple random password generator</p>
          </div>
        </div>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="card-box-handle">
        <v-col cols="12" md="6">
          <div class="result">
            <h4 class="mb-2">Password</h4>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  id="generator-password"
                  type="text"
                  :model-value="password"
                  readonly
                  variant="outlined"
                ></v-text-field>
                <div class="buttons">
                  <v-btn color="green" class="text-white" @click="regenerate">
                    Generate Password
                  </v-btn>
                  <v-btn color="primary" variant="outlined" @click="copyPassword">
                    Copy Password
                  </v-btn>
                  <v-snackbar
                    v-model="snackbar.show"
                    :timeout="SNACKBAR_TIMEOUT"
                    contained
                    location="bottom right"
                    rounded="pill"
                    :color="snackbar.color"
                  >
                    {{ snackbar.text }}

                    <template #actions>
                      <v-btn color="white" variant="text" @click="snackbar.show = false"
                        >Close</v-btn
                      >
                    </template>
                  </v-snackbar>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="options">
            <h4 class="text-h4 font-weight-bold">Options</h4>
            <v-row>
              <v-col cols="12" md="12">
                <span>Password Length</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-slider
                  v-model="options.length"
                  :min="MIN_LENGTH"
                  :max="MAX_LENGTH"
                  :step="1"
                  class="align-center"
                >
                  <template #append>
                    <v-text-field
                      v-model="lengthInput"
                      class="mt-0 pt-0"
                      type="number"
                      :min="MIN_LENGTH"
                      :max="MAX_LENGTH"
                      @update:focused="(focused: boolean) => !focused && commitLength()"
                      @keydown.enter="commitLength"
                      style="width: 80px"
                      variant="outlined"
                    ></v-text-field>
                  </template>
                </v-slider>
              </v-col>
              <v-col cols="12" md="12">
                <h6>Password content</h6>
                <v-row>
                  <v-col
                    v-for="type in charSetSwitches"
                    :key="type.key"
                    cols="12"
                    md="12"
                    class="d-flex align-baseline justify-space-between"
                  >
                    <span>{{ type.title }}</span>
                    <v-switch
                      v-model="options.sets[type.key]"
                      :color="type.color"
                      :disabled="isLastEnabledSet(type.key)"
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
