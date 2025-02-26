import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { createI18n } from "vue-i18n"
import PrimeVue from "primevue/config"
import Aura from "@primevue/themes/aura"
import ToastService from "primevue/toastservice"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)
const i18n = createI18n({})

app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark",
      prefix: "p",
    },
  },
})

app.use(i18n)
app.use(PrimeVue)
app.mount("#app")
