import { createStore } from "vuex"
const store = createStore({
  state: {
    favoriteSongs: [],
  },
  mutations: {
    toggleFavorite(state, song) {
      const index = state.favoriteSongs.findIndex(
        (item) => item.id === song.id && item.type === song.type
      );
      if (index !== -1) {
        state.favoriteSongs.splice(index, 1)
      } else {
        state.favoriteSongs.push(song)
      }
    },
    addDownload(state, payload) {
      state.downloads.push(payload)
      localStorage.setItem("downloads", JSON.stringify(state.downloads))
    },
    removeDownload(state, payload) {
      state.downloads = state.downloads.filter(
        (song) => song.id !== payload.id
      );
      localStorage.setItem("downloads", JSON.stringify(state.downloads))
    },
    loadDownloads(state) {
      const storedDownloads =
        JSON.parse(localStorage.getItem("downloads")) || []
      state.downloads = storedDownloads;
    },
  },
  getters: {
    isFavorite: (state) => (song, type) => {
      return state.favoriteSongs.some(
        (item) => item.id === song.id && item.type === type
      )
    },
    favoriteSongs: (state) => state.favoriteSongs,
    downloadedSongs(state) {
      return state.downloads
    },
  },
})
store.commit("loadDownloads")
export default store
