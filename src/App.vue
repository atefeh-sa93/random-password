<script setup lang="ts">
import { ref } from 'vue'

const clicks = ref(0)
</script>

<template>
  <v-app>
    <v-main>
      <v-container class="py-12" max-width="560">
        <v-card rounded="lg">
          <v-card-title class="d-flex align-center ga-2">
            <v-icon icon="mdi-lock-outline" color="deep-orange" />
            Random password generator
          </v-card-title>
          <v-card-text>
            Vuetify 3 and Material Design Icons are set up. The generator comes back in the next
            issue.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="flat" prepend-icon="mdi-check" @click="clicks++">
              Test button
            </v-btn>
            <v-chip v-if="clicks > 0" color="success" variant="tonal">Clicked {{ clicks }}</v-chip>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
