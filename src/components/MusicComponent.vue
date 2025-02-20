<template>
  <Header/>
  <div class="coverimage">
    <img class="img" src="../assets/images/starss.jpg" alt="coverpage">
    <div class="details">
      <img class="image"  src="../assets/images/coldplay-4.jpg" alt="image">
      <h1 class="title">Sky full of stars</h1>
      <h2 class="Singer">ColdPlay</h2>
    </div>
    <button class="play-button" @click="togglePlay">
      {{ isPlaying ? "❚❚" : "▶" }}
    </button>
    <audio ref="audioPlayer">
      <source src="../assets/audio/A-Sky-Full-Of-Stars.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
  <SecondGrid/>
</template>

<script setup>
import { ref } from "vue";
import SecondGrid from "./SecondGrid.vue";
import Header from "./Header.vue";

const isPlaying = ref(false);
const audioPlayer = ref(null);

const togglePlay = () => {
  if (audioPlayer.value) {
    if (!isPlaying.value) {
      if (audioPlayer.value.currentTime < 18) {
        audioPlayer.value.currentTime = 18;
      }
      audioPlayer.value.play(); // Play the audio
    } else {
      audioPlayer.value.pause(); // Pause the audio
      audioPlayer.value.currentTime = 0; // Reset playback to the beginning
    }
    isPlaying.value = !isPlaying.value; // Toggle the play state
  }
};
</script>
