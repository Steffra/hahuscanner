import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {
        alert('need refresh')
    },
    onOfflineReady() {
        alert('offline ready')
    },
})

createApp(App).use(router).mount('#app')
