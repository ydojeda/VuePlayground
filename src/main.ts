import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import store from './store'

library.add(fas, far)

const app = createApp(App)
app.use(store)
app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
