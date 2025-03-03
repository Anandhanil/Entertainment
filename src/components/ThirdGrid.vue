<template>
  <div class="third-grid">
    <div class="topsongs">
      <h1>Top Beats</h1>
      <div class="list">
        <div class="item" v-for="beat in beats" :key="beat.id">
          <div class="item-image-container">
            <img :src="beat.content" alt="Beat Image" class="item-image" />
            <button class="play-button" @click="togglePlay(beat, beats)" aria-label="Play/Pause">
              <i :class="beat.isPlaying ? 'pi pi-pause-circle' : 'pi pi-play-circle'"></i>
            </button>
          </div>
          <div class="item-info">
            <h3>{{ beat.title }}</h3>
            <p>{{ beat.subtitle }}</p>
          </div>
          <button class="favorite-button" @click="toggleFavorite(beat, 'beats')">
            <i :class="['fa', isFavorite(beat, 'beats') ? 'fas fa-heart favorite' : 'far fa-heart']"></i>
          </button>
          <button class="download-button" @click="downloadSong(beat)">
            <i :class="beat.isDownloaded ? 'fa fa-check-circle downloaded' : 'fa fa-download'"></i>
          </button>
          <audio :id="'audio-beat-' + beat.id" class="audio-player">
            <source :src="beat.audioSrc" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
    <div class="topsongs">
      <h1>Top Songs</h1>
      <div class="list">
        <div class="item" v-for="song in music" :key="song.id">
          <div class="item-image-container">
            <img :src="song.content" alt="Song Image" class="item-image" />
            <button class="play-button" @click="togglePlay(song, music)" aria-label="Play/Pause">
              <i :class="song.isPlaying ? 'pi pi-pause-circle' : 'pi pi-play-circle'"></i>
            </button>
          </div>
          <div class="item-info">
            <h3>{{ song.title }}</h3>
            <p>{{ song.subtitle }}</p>
          </div>
          <button class="favorite-button" @click="toggleFavorite(song, 'music')">
            <i :class="['fa', isFavorite(song, 'music') ? 'fas fa-heart favorite' : 'far fa-heart']"></i>
          </button>
          <button class="download-button" @click="downloadSong(song)">
            <i :class="song.isDownloaded ? 'fa fa-check-circle downloaded' : 'fa fa-download'"></i>
          </button>
          <audio :id="'audio-music-' + song.id" class="audio-player">
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
defineProps({
  beats: Array,
  music: Array,
  togglePlay: Function,
})
const toggleFavorite = (item, type) => {
  store.commit("toggleFavorite", { ...item, type })
}
const isFavorite = (item, type) => {
  return store.getters.isFavorite(item, type)
}
const downloadSong = (item) => {
  const link = document.createElement("a")
  link.href = item.audioSrc
  link.download = item.title + ".mp3"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  item.isDownloaded = true;
  store.commit("addDownload", { ...item })
}
</script>