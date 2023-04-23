import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@mdi/font/css/materialdesignicons.css'
import Notifications from '@kyvg/vue3-notification'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import './index.css'
import { setupClient } from './repositories/axiosClient'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})

// setupClient(import.meta.env.BACK_URL)
setupClient('http://localhost:3333')

app.use(router).use(vuetify).use(Notifications)

app.mount('#app')
