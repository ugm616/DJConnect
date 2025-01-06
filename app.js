// Placeholder arrays for left and right playlists
const leftPlaylist = [];
const rightPlaylist = [];

// Function to play a track from a playlist
function playTrack(trackUri, playlist) {
  const audio = new Audio(trackUri);
  audio.play();
  // Store the audio element for further controls
  playlist.currentTrack = audio;
  playlist.isPlaying = true;
  updatePlayPauseButton(playlist);
}

// Function to update play/pause button text
function updatePlayPauseButton(playlist) {
  const button = document.getElementById(`${playlist.name}-play-pause`);
  button.textContent = playlist.isPlaying ? '║║' : '►';
}

// Event listeners for left playlist controls
document.getElementById('left-playlist-play-pause').addEventListener('click', function() {
  if (leftPlaylist.isPlaying) {
    leftPlaylist.currentTrack.pause();
    leftPlaylist.isPlaying = false;
  } else {
    if (leftPlaylist.length > 0) {
      playTrack(leftPlaylist[0], leftPlaylist);
    }
  }
  updatePlayPauseButton(leftPlaylist);
});

document.getElementById('left-playlist-stop').addEventListener('click', function() {
  if (leftPlaylist.currentTrack) {
    leftPlaylist.currentTrack.pause();
    leftPlaylist.currentTrack.currentTime = 0;
    leftPlaylist.isPlaying = false;
    updatePlayPauseButton(leftPlaylist);
  }
});

document.getElementById('left-playlist-eject').addEventListener('click', function() {
  if (leftPlaylist.currentTrack) {
    leftPlaylist.currentTrack.pause();
    leftPlaylist.currentTrack = null;
    leftPlaylist.isPlaying = false;
    updatePlayPauseButton(leftPlaylist);
  }
});

// Event listeners for right playlist controls
document.getElementById('right-playlist-play-pause').addEventListener('click', function() {
  if (rightPlaylist.isPlaying) {
    rightPlaylist.currentTrack.pause();
    rightPlaylist.isPlaying = false;
  } else {
    if (rightPlaylist.length > 0) {
      playTrack(rightPlaylist[0], rightPlaylist);
    }
  }
  updatePlayPauseButton(rightPlaylist);
});

document.getElementById('right-playlist-stop').addEventListener('click', function() {
  if (rightPlaylist.currentTrack) {
    rightPlaylist.currentTrack.pause();
    rightPlaylist.currentTrack.currentTime = 0;
    rightPlaylist.isPlaying = false;
    updatePlayPauseButton(rightPlaylist);
  }
});

document.getElementById('right-playlist-eject').addEventListener('click', function() {
  if (rightPlaylist.currentTrack) {
    rightPlaylist.currentTrack.pause();
    rightPlaylist.currentTrack = null;
    rightPlaylist.isPlaying = false;
    updatePlayPauseButton(rightPlaylist);
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

// Initialize playlists
leftPlaylist.name = 'left-playlist';
rightPlaylist.name = 'right-playlist';
leftPlaylist.isPlaying = false;
rightPlaylist.isPlaying = false;

// Initialize play/pause buttons to show the play symbol
document.getElementById('left-playlist-play-pause').textContent = '►';
document.getElementById('right-playlist-play-pause').textContent = '►';
