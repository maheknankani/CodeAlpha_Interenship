const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    file: "music/song1.mp3",
    cover: "images/cover1.jpg"
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    file: "music/song2.mp3",
    cover: "images/cover1.jpg"
  }
];

let currentSong = 0;
let isShuffle = false;
let isRepeat = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");
const themeToggle = document.getElementById("theme-toggle");

// Load Song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
  cover.src = song.cover;
  highlightPlaylist(index);
}
loadSong(currentSong);

// Play / Pause
let isPlaying = false;
function playMusic() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}
function pauseMusic() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}
playBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

// Next / Prev
function nextSong() {
  currentSong = isShuffle
    ? Math.floor(Math.random() * songs.length)
    : (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playMusic();
}
nextBtn.addEventListener("click", nextSong);

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playMusic();
});

// Progress Update
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  progress.value = (currentTime / duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

// Seek
progress.addEventListener("input", () => {
  const duration = audio.duration;
  audio.currentTime = (progress.value / 100) * duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Format Time
function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// AutoPlay Next / Repeat
audio.addEventListener("ended", () => {
  if (isRepeat) {
    playMusic();
  } else {
    nextSong();
  }
});

// Playlist
function loadPlaylist() {
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSong = index;
      loadSong(index);
      playMusic();
    });
    playlist.appendChild(li);
  });
}

function highlightPlaylist(index) {
  const items = playlist.querySelectorAll("li");
  items.forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

loadPlaylist();

// Shuffle & Repeat Buttons
shuffleBtn.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? "lime" : "white";
});
repeatBtn.addEventListener("click", () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? "lime" : "white";
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  themeToggle.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
});
