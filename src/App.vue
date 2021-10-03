<template>
  <v-app>
    <GeneratePassword />
  </v-app>
</template>

<script>
import GeneratePassword from './components/GeneratePassword'
export default {
  name: 'App',
  components: {GeneratePassword}

};
</script>
<style lang="scss">
  @import './assets/style.scss';
</style>
