import LandingPage from "@/components/LandingPage.vue"
import LoginPage from "@/components/LoginPage.vue"
import MusicComponent from "@/components/MusicComponent.vue"
import Favourite from "@/components/Favourite.vue"
import { createRouter, createWebHistory } from "vue-router"
import Downloads from "@/components/Downloads.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: LandingPage },
    { path: "/login", component: LoginPage },
    { path: "/home", component: MusicComponent },
    { path: "/favourite", component: Favourite },
    { path: "/downloads", component: Downloads },
  ],
})
export default router
