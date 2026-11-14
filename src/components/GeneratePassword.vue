<script setup lang="ts">
import { ref, watch } from 'vue'

interface PasswordContent {
  title: string
  value: string
  checked: boolean
  color: string
}

const copyPassBar = ref(false)
const text = 'Password coy correctly!'
const timeout = '2000'
const defaultLength = ref(8)
const password = ref('')

const passwordContents = ref<PasswordContent[]>([
  {
    title: 'UpperCase',
    value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    checked: false,
    color: 'red',
  },
  {
    title: 'LowerCase',
    value: 'abcdefghijklmnopqrstuwxyz',
    checked: true,
    color: 'green',
  },
  {
    title: 'Numbers',
    value: '0123456789',
    checked: true,
    color: 'blue',
  },
  {
    title: 'Symbols',
    value: '`!@#$%^&*)(-_+=}{][/|?><',
    checked: false,
    color: 'purple',
  },
])

function generateNewPassword() {
  let passValue = ''
  let resultPass = ''

  passwordContents.value.forEach((item) => {
    if (item.checked) {
      passValue += item.value
    }
  })
  for (let j = 0; j < defaultLength.value; j++) {
    resultPass += passValue.charAt(Math.floor(Math.random() * passValue.length))
  }
  password.value = resultPass
}

function copyPassword() {
  navigator.clipboard.writeText(password.value)
  copyPassBar.value = true
}

watch(defaultLength, () => {
  generateNewPassword()
})

// Code in <script setup> runs when the component is created,
// so this replaces the Vue 2 `created()` hook.
generateNewPassword()
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
                  disabled
                  variant="outlined"
                ></v-text-field>
                <div class="buttons">
                  <v-btn color="green" class="text-white" @click="generateNewPassword">
                    Generate Password
                  </v-btn>
                  <v-btn color="primary" variant="outlined" @click="copyPassword">
                    Copy Password
                  </v-btn>
                  <v-snackbar
                    v-model="copyPassBar"
                    :timeout="timeout"
                    contained
                    location="bottom right"
                    rounded="pill"
                    color="#5e72e4"
                  >
                    {{ text }}

                    <template #actions>
                      <v-btn color="white" variant="text" @click="copyPassBar = false">Close</v-btn>
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
                <v-slider v-model="defaultLength" :min="8" :max="50" :step="1" class="align-center">
                  <template #append>
                    <v-text-field
                      v-model="defaultLength"
                      class="mt-0 pt-0"
                      type="number"
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
                    v-for="type in passwordContents"
                    :key="type.title"
                    cols="12"
                    md="12"
                    class="d-flex align-baseline justify-space-between"
                  >
                    <span>{{ type.title }}</span>
                    <v-switch v-model="type.checked" :color="type.color"></v-switch>
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
