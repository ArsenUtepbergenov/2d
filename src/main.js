import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

console.log(import.meta.env.APP_PROJECT_ID)
console.log(import.meta.env.APP_TOKEN)

createApp(App).use(createPinia()).use(router).mount('#app')
