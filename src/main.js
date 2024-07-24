import './assets/main.css'
import 'tinymce/skins/ui/oxide/skin.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//tailwindcss
import './index.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
