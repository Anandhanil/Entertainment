<template>
  <Header/>
  <div class="downloads">
    <h1 class="download-title">Downloaded Songs 🎶</h1>
    <div v-if="downloadedSongs.length === 0" class="empty-download">
      <p>No Downloads Yet</p>
    </div>
    <div v-else>
      <div class="list">
        <div class="download-item" v-for="(song, index) in downloadedSongs" :key="index">
          <div class="number">{{ index + 1 }}.</div>
          <div class="download-img">
            <img :src="song.content" alt="Song Image" />
          </div>
          <div class="download-info">
            <h2>{{ song.title }}</h2>
            <h3>{{ song.subtitle }}</h3>
          </div>
          <button class="delete-download" @click="removeDownload(song)">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import store from "@/Store";
import Header from "./Header.vue";
const downloadedSongs = computed(() => store.getters.downloadedSongs);
const removeDownload = (song) => {
  store.commit("removeDownload", song);
};
</script>
