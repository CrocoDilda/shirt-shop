import { createRouter, createWebHistory } from "vue-router"
import MainView from "@/views/MainView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/shirt",
      name: "shirt",
      component: () => import("@/views/ShirtView.vue"),
    },
  ],
})

export default router
