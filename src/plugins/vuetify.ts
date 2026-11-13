import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

// Components are imported automatically by vite-plugin-vuetify (see vite.config.ts),
// so only the ones used in templates end up in the build.
export default createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
  },
})
