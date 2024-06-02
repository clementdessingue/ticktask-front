import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { router } from './registerRouter'
import { mdiAccount } from '@mdi/js'
import { mdiPencil } from '@mdi/js'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      edit: mdiPencil,
      account: mdiAccount,
    },
    sets: { mdi },
  },
})

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
