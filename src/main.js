import { createApp } from 'vue'
import { createPinia } from 'pinia'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faGripHorizontal, faChartBar, faBars, faMaximize, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faKeyboard, faUser, faMinusSquare, faAddressCard } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add({
    faGripHorizontal,
    faChartBar,
    faKeyboard,
    faUser,
    faMinusSquare,
    faAddressCard,
    faBars,
    faMaximize,
    faSearch
})

import App from './App.vue'
import router from './router'
import './axios.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import './assets/main.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)


app.mount('#app')
