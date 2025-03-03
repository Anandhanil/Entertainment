<template>
  <nav class="navbar">
    <div class="logo">
      <img class="img-logo" src="../assets/images/Logo.png" alt="Logo">
      <span class="logo-name">Musvid</span>
    </div>
    <div class="hamburger" @click="toggleNav">
      <i class="pi pi-bars"></i>
    </div>
    <ul class="header-nav-list" :class="{ active: isMenuOpen }">
      <li class="nav-links"> <router-link to="/home"> Home </router-link> </li>
      <li class="nav-links"> <router-link to="/favourite"> Favourite </router-link></li>
      <li class="nav-links"> <router-link to="/downloads"> Downloads </router-link> </li>
      <<li v-if="nickname" class="nav-links"> Hi, {{ nickname }}</li>
        <li class="nav-links">
          <button class="logout" @click="logout"><i class="pi pi-sign-out"></i></button>
        </li>
    </ul>
  </nav>
</template>
<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const nickname = ref("")
const isMenuOpen = ref(false)
const toggleNav = () => {
  isMenuOpen.value = !isMenuOpen.value
}
onMounted(() => {
  const storedUser = localStorage.getItem("loggedInUser")
  if (storedUser) {
    const userData = JSON.parse(storedUser)
    nickname.value = userData.nickname
  }
})
const logout = () => {
  localStorage.removeItem("loggedInUser")
  router.push("/")
}
</script>
