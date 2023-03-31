// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: 'MP3 To Midi'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
