import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { createApp } from 'vue'

import App from './App.vue'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(vuetify)

app.mount('#app')
