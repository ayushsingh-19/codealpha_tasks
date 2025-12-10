const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const cover = document.getElementById('cover');
const playlistEl = document.getElementById('playlist');

const songs = [
    {title: "Song 1", artist: "Artist 1", src: "songs/song1.mp3", cover: "covers/cover1.jpg"},
    {title: "Song 2", artist: "Artist 2", src: "songs/song2.mp3", cover: "covers/cover2.jpg"},
    {title: "Song 3", artist: "Artist 3", src: "songs/song3.mp3", cover: "covers/cover3.jpg"}
];

let currentIndex = 0;
let isPlaying = false;

// Load song
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    cover.src = song.cover;

    document.querySelectorAll('#playlist li').forEach(li => li.classList.remove('active'));
    document.querySelector(`#playlist li[data-index="${index}"]`).classList.add('active');
}

// Play / Pause
playBtn.addEventListener('click', () => {
    if(isPlaying){
        audio.pause();
    } else {
        audio.play();
    }
});

audio.addEventListener('play', () => {
    isPlaying = true;
    playBtn.innerHTML = '<span>&#10074;&#10074;</span>';
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    playBtn.innerHTML = '<span>&#9654;</span>';
});

// Previous / Next
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
});

// Update progress
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Playlist click
playlistEl.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI'){
        currentIndex = Number(e.target.dataset.index);
        loadSong(currentIndex);
        audio.play();
    }
});

// Auto play next
audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Format time
function formatTime(seconds){
    const mins = Math.floor(seconds / 60) || 0;
    const secs = Math.floor(seconds % 60) || 0;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

// Initialize
loadSong(currentIndex);
