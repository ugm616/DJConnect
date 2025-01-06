// Placeholder arrays for left and right playlists
const leftPlaylist = [];
const rightPlaylist = [];

// Function to play a track from a playlist
function playTrack(trackUri, playlist) {
  const audio = new Audio(trackUri);
  audio.play();
  // Store the audio element for further controls
  playlist.currentTrack = audio;
}

// Event listeners for left playlist controls
document.getElementById('left-playlist-play').addEventListener('click', function() {
  if (leftPlaylist.length > 0) {
    playTrack(leftPlaylist[0], leftPlaylist);
  }
});

// Event listeners for right playlist controls
document.getElementById('right-playlist-play').addEventListener('click', function() {
  if (rightPlaylist.length > 0) {
    playTrack(rightPlaylist[0], rightPlaylist);
  }
});

// Function to perform crossfade between two audio elements
function crossfade(leftAudio, rightAudio, duration) {
  const fadeOut = leftAudio.volume;
  const fadeIn = rightAudio.volume;

  const step = 0.1;
  const interval = duration / (1 / step);

  const fadeOutInterval = setInterval(() => {
    if (leftAudio.volume > 0) {
      leftAudio.volume -= step;
    } else {
      clearInterval(fadeOutInterval);
    }
  }, interval);

  const fadeInInterval = setInterval(() => {
    if (rightAudio.volume < fadeIn) {
      rightAudio.volume += step;
    } else {
      clearInterval(fadeInInterval);
    }
  }, interval);
}

// Event listener for crossfade button
document.getElementById('crossfade-button').addEventListener('click', function() {
  const leftAudio = leftPlaylist.currentTrack;
  const rightAudio = rightPlaylist.currentTrack;
  const duration = document.getElementById('crossfade-duration').value;
  crossfade(leftAudio, rightAudio, duration);
});
