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

          <!-- Favorite Button -->
          <!-- <button class="favorite-button" @click="toggleFavorite(beat)">
            <i :class="beat.isFavorite ? 'fas fa-heart favorite' : 'far fa-heart'"></i>
          </button> -->

          <button class="favorite-button" @click="toggleFavorite(beat)">
            <i :class="favoriteSongs.some(fav => fav.id === beat.id) ? 'fas fa-heart favorite' : 'far fa-heart'"></i>
          </button>

          <button class="add-button" @click="toggleAdd(beat)">
            <i :class="beat.isAdd ? 'fa fa-square-check favorite' : 'far fa-square-plus'"></i>
          </button>

          <!-- <button class="add-button">+</button> -->
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

          <!-- Favorite Button -->
          <button class="favorite-button" @click="toggleFavorite(song)">
            <i :class="song.isFavorite ? 'fas fa-heart favorite' : 'far fa-heart'"></i>
          </button>

          <button class="add-button" @click="toggleAdd(song)">
            <i :class="song.isAdd ? 'fa fa-square-check favorite' : 'far fa-square-plus'"></i>
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
import { onMounted, ref, watch } from "vue";


defineProps({
  beats: Array,
  music: Array,
  togglePlay: Function,
});

// const toggleFavorite = (item) => {
//   item.isFavorite = !item.isFavorite;
// };

const favoriteSongs = ref([]);

// **1️⃣ Load favorites from localStorage when the component is mounted**
onMounted(() => {
  const storedFavorites = localStorage.getItem("favoriteSongs");
  if (storedFavorites) {
    favoriteSongs.value = JSON.parse(storedFavorites);
  }
});

// **2️⃣ Toggle favorite & Save to localStorage**
const toggleFavorite = (item) => {
  const index = favoriteSongs.value.findIndex((fav) => fav.id === item.id);

  if (index !== -1) {
    // If the song is already favorited, remove it
    favoriteSongs.value.splice(index, 1);
  } else {
    // If not, add to favorites
    favoriteSongs.value.push(item);
  }

  // **3️⃣ Save updated favorites to localStorage**
  localStorage.setItem("favoriteSongs", JSON.stringify(favoriteSongs.value));
};

// **4️⃣ Automatically update items to match favorite status**
watch(favoriteSongs, (newFavorites) => {
  [...beats, ...music].forEach((item) => {
    item.isFavorite = newFavorites.some((fav) => fav.id === item.id);
  });
}, { deep: true });

const toggleAdd = (item) => {
  item.isAdd = !item.isAdd;
};
</script>