const video = document.querySelector('video');
video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
video.controls = false;

const wrapper = document.querySelector('.wrapper');
const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');

const controls = document.createElement('div');
controls.className = 'controls';
controls.innerHTML = `
  <button type="button" class="player__button toggle">►</button>
  <div class="progress">
    <div class="progress__filled"></div>
  </div>
  <label>Volume
    <input type="range" name="volume" min="0" max="1" step="0.01" value="1">
  </label>
  <label>Playback Speed
    <input type="range" name="playbackSpeed" min="0.5" max="2" step="0.1" value="1">
  </label>
  <button type="button" class="rewind">« 10s</button>
  <button type="button" class="skip">25s »</button>
`;

wrapper.appendChild(controls);

const progress = controls.querySelector('.progress');
const progressFilled = controls.querySelector('.progress__filled');

progress.style.width = '100%';
progress.style.height = '10px';
progress.style.background = '#ccc';
progress.style.cursor = 'pointer';

progressFilled.style.width = '0%';
progressFilled.style.height = '100%';
progressFilled.style.background = '#ffc600';

const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

  if (this.name === 'volume') {
    video.volume = Number(this.value);
  }

  if (this.name === 'playbackSpeed') {
    video.playbackRate = Number(this.value);
    speedBar.textContent = `${this.value}×`;
  }
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

const toggle = controls.querySelector('.player__button.toggle');

toggle.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

video.addEventListener('play', () => {
  toggle.textContent = '❚ ❚';
});

video.addEventListener('pause', () => {
  toggle.textContent = '►';
});

video.addEventListener('timeupdate', () => {
  const percent = video.duration
    ? (video.currentTime / video.duration) * 100
    : 0;

  progressFilled.style.width = `${percent}%`;
});

progress.addEventListener('click', event => {
  if (video.duration) {
    const rect = progress.getBoundingClientRect();
    video.currentTime = ((event.clientX - rect.left) / rect.width) * video.duration;
  }
});

controls.querySelector('.rewind').addEventListener('click', () => {
  video.currentTime = Math.max(0, video.currentTime - 10);
});

controls.querySelector('.skip').addEventListener('click', () => {
  video.currentTime = Math.min(video.duration || 0, video.currentTime + 25);
});