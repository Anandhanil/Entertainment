<template>
  <div class="second-grid">
    <h1 class="grid-title">Trending Beats</h1>
    <div class="beat-box">
      <div class="card-beat" v-for="beat in beats" :key="beat.id">
        <!-- Image Section -->
        <img class="card-image" :src="beat.content" alt="Beat Cover" />
        
        <!-- Details Section -->
        <div class="card-details">
          <h2 class="card-title">{{ beat.title }}</h2>
          <p class="card-subtitle">{{ beat.subtitle }}</p>
        </div>

        <!-- Play Button (Visible on Hover) -->
        <button 
          class="audio-play-button"
          @click="togglePlay(beat,beats)"
          aria-label="Play/Pause"
        >
        <i :class="beat.isPlaying ? 'pi pi-pause-circle' : 'pi pi-play-circle'"></i>
        </button>
        
        <!-- Audio Element -->
        <audio :id="'audio-beat-' + beat.id" class="audio-player">
          <source :src="beat.audioSrc" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

      </div>
    </div>
  </div>
  <div class="second-grid">
    <h1 class="grid-title">Trending Music</h1>
    <div class="beat-box">
      <div class="card-beat" v-for="track in music" :key="track.id">
        <!-- Image Section -->
        <img class="card-image" :src="track.content" alt="Music Cover" />
        
        <!-- Details Section -->
        <div class="card-details">
          <h2 class="card-title">{{ track.title }}</h2>
          <p class="card-subtitle">{{ track.subtitle }}</p>
        </div>

        <!-- Play/Pause Button -->
        <button 
          class="audio-play-button"
          @click="togglePlay(track, music)"
          aria-label="Play/Pause"
        >
       
        <span v-if="musicplaying "><i class='pi pi-pause-circle'></i></span>
        <span v-if="!musicplaying"><i class='pi pi-play-circle'></i></span>

        </button>
        
        <!-- Audio Element -->
        <audio :id="'audio-music-' + track.id" class="audio-player">
          <source :src="track.audioSrc" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  </div>
  <ThirdGrid :beats="beats" :music="music" :toggle-play="togglePlay" />
</template>

<script setup>
import { ref, watch } from "vue";
import ThirdGrid from "./ThirdGrid.vue";
// import image from "../assets/images/stars.jpg";

const beats = [
  {
    id: 1,
    title: "Everybody",
    subtitle: "BackstreetBoys",
    content: new URL('../assets/images/Backstreetboys.jpg', import.meta.url).href,
    audioSrc: new URL('../assets/audio/Everybody.mp3', import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 2,
    title: "Faded",
    subtitle: "Alan Walker",
    content: new URL('../assets/images/faded.jpg', import.meta.url).href,
    audioSrc: new URL('../assets/audio/Faded.mp3', import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 3,
    title: "Memories",
    subtitle: "Maroon 5",
    content: new URL('../assets/images/memories.jpg', import.meta.url).href,
    audioSrc: new URL('../assets/audio/Maroon 5.mp3', import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 4,
    title: "Society",
    subtitle: "Eddie Vedder",
    content: new URL('../assets/images/society.jpg', import.meta.url).href,
    audioSrc: new URL('../assets/audio/Society.mp3', import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 5,
    title: "O Maahi",
    subtitle: "Arijit Singh",
    content: new URL('../assets/images/oh mahi.jpg', import.meta.url).href,
    audioSrc: new URL('../assets/audio/O Maahi.mp3', import.meta.url).href,
    isPlaying: false,
  },
];
let musicplaying = ref()

let music = ref([
{
    id: 1,
    title: "Shape of You",
    subtitle: "Ed Sheeran",
    content: new URL("../assets/images/shapeofyou.jpg", import.meta.url).href,
    audioSrc: new URL("../assets/audio/shapeofyou.mp3", import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 2,
    title: "Blinding Lights",
    subtitle: "The Weeknd",
    content: new URL("../assets/images/blindinglights.jpg", import.meta.url)
      .href,
    audioSrc: new URL("../assets/audio/blindinglights.mp3", import.meta.url)
      .href,
    isPlaying: false,
  },
  {
    id: 3,
    title: "Levitating",
    subtitle: "Dua Lipa",
    content: new URL("../assets/images/levitating.jpg", import.meta.url).href,
    audioSrc: new URL("../assets/audio/levitating.mp3", import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 4,
    title: "Took A Pill",
    subtitle: "Mike Posner",
    content: new URL("../assets/images/tookapill.jpg", import.meta.url).href,
    audioSrc: new URL("../assets/audio/tookapill.mp3", import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 5,
    title: "Photograph",
    subtitle: "Ed Sheeran",
    content: new URL("../assets/images/Photograph.jpg", import.meta.url).href,
    audioSrc: new URL("../assets/audio/Photograph.mp3", import.meta.url).href,
    isPlaying: false,
  }

])
const musict = [
  {
    id: 1,
    title: "Shape of You",
    subtitle: "Ed Sheeran",
    content: new URL("../assets/images/shapeofyou.jpg", import.meta.url).href,
    audioSrc: new URL("../assets/audio/shapeofyou.mp3", import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 2,
    title: "Blinding Lights",
    subtitle: "The Weeknd",
    content: new URL("../assets/images/blindinglights.jpg", import.meta.url)
      .href,
    audioSrc: new URL("../assets/audio/blindinglights.mp3", import.meta.url)
      .href,
    isPlaying: false,
  },
  {
    id: 3,
    title: "Levitating",
    subtitle: "Dua Lipa",
    content: new URL("../assets/images/levitating.jpg", import.meta.url).href,
    audioSrc: new URL("../assets/audio/levitating.mp3", import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 4,
    title: "Took A Pill",
    subtitle: "Mike Posner",
    content: new URL("../assets/images/tookapill.jpg", import.meta.url).href,
    audioSrc: new URL("../assets/audio/tookapill.mp3", import.meta.url).href,
    isPlaying: false,
  },
  {
    id: 5,
    title: "Photograph",
    subtitle: "Ed Sheeran",
    content: new URL("../assets/images/Photograph.jpg", import.meta.url).href,
    audioSrc: new URL("../assets/audio/Photograph.mp3", import.meta.url).href,
    isPlaying: false,
  },
];

// Reusable audio player logic
const togglePlay = (item, currentArray) => {
  // Pause and reset all tracks in the 'beats' array
  beats.forEach((beat) => {
    if (beat.id !== item.id || currentArray !== beats) {
      beat.isPlaying = false;
      const beatAudio = document.getElementById(`audio-beat-${beat.id}`);
      if (beatAudio) {
        beatAudio.pause();
        beatAudio.currentTime = 0;
      }
    }
  });

  // Pause and reset all tracks in the 'music' array
  music.value.forEach(async (track) => {
    if (track.id !== item.id || currentArray !== music) {
      track.isPlaying = false;
      const trackAudio = document.getElementById(`audio-music-${track.id}`);
      if (trackAudio) {
        musicplaying.value = false
        await trackAudio.pause();
        trackAudio.currentTime = 0;
      }
    }
  });

  // Play or pause the current audio
  const currentAudio = document.getElementById(
    `${currentArray === beats ? "audio-beat-" : "audio-music-"}${item.id}`
  );

  if (currentAudio) {
    if (item.isPlaying) {
      // Pause the audio
      currentAudio.pause();
      item.isPlaying = false;
    } else {
      // Play the audio
      currentAudio.play();
      item.isPlaying = true;
    }
  }
};
</script>