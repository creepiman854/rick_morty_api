import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.css'

// Toastification
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// Librerías de Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Importación completa de iconos sólidos, regulares y de márcas de
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Agregar todos los iconos a la librería
library.add(fas, far, fab)

const app = createApp(App)

// Registrar FontAwesome globalmente
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(Toast, {
  position: 'bottom-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  hideProgressBar: false,
  newestOnTop: true,
})

app.mount('#app')
