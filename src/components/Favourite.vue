<template>
  <Header />
  <div class="favourites">
    <h1 class="fav-title">Your Favourite Songs ❤️</h1>
    <div v-if="favoriteSongs.length === 0" class="empty-fav">
      <p>No Favorite Songs Yet</p>
    </div>
    <div v-else>
      <div class="list">
        <div class="fav-item" v-for="(song, index) in favoriteSongs" :key="song.id">
          <div class="number">{{ index + 1 }}.</div>
          <div class="fav-img-container">
            <img :src="song.content" alt="Song Image" class="fav-image" />
            <button class="play-button" @click="togglePlay(song)">
              <i :class="song.isPlaying ? 'pi pi-pause-circle' : 'pi pi-play-circle'"></i>
            </button>
          </div>
          <div class="fav-info">
            <h2>{{ song.title }}</h2>
            <h3>{{ song.subtitle }}</h3>
          </div>
          <div class="fav-actions">
            <button class="remove-fav" @click="removeFromFavorites(song)">
              <i class="fas fa-trash"></i> Remove
            </button>
          </div>
          <audio :id="'audio-fav-' + song.id">
            <source :src="song.audioSrc" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import store from "@/Store"
import { computed } from "vue"
import Header from "./Header.vue"
const favoriteSongs = computed(() => store.getters.favoriteSongs)
const removeFromFavorites = (song) => {
  store.commit("toggleFavorite", song)
}
const togglePlay = (song) => {
  favoriteSongs.value.forEach((item) => {
    const audio = document.getElementById(`audio-fav-${item.id}`)
    if (item.id !== song.id) {
      audio.pause()
      item.isPlaying = false
    }
  })
  const audio = document.getElementById(`audio-fav-${song.id}`)
  if (!song.isPlaying) {
    audio.play()
    song.isPlaying = true
    audio.onended = () => {
      song.isPlaying = false
    }
  } else {
    audio.pause()
    song.isPlaying = false
  }
}
</script>