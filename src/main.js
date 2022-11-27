import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

console.log(import.meta.env.APP_PROJECT_ID)
console.log(import.meta.env.APP_TOKEN)

loadFonts()

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
