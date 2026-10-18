const inputs = document.querySelectorAll('.controls input');

const toggle = document.querySelector('.player__button.toggle');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

  if (this.name === 'volume') {
    video.volume = Number(this.value);
  }

  if (this.name === 'playbackSpeed') {
    video.playbackRate = Number(this.value);
  }
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
inputs.forEach(input => input.addEventListener('input', handleUpdate));

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

let progress = document.querySelector('.progress__filled');

if (!progress) {
  progress = document.createElement('div');
  progress.className = 'progress__filled';
  progress.style.height = '5px';
  progress.style.width = '0%';
  progress.style.backgroundColor = '#ffc600';

  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress';
  progressContainer.style.width = '100%';
  progressContainer.style.backgroundColor = '#ccc';
  progressContainer.appendChild(progress);

  video.insertAdjacentElement('afterend', progressContainer);
}

function updateProgress() {
  if (video.duration && Number.isFinite(video.duration)) {
    progress.style.width = `${(video.currentTime / video.duration) * 100}%`;
  }
}

function skipVideo(seconds) {
  video.currentTime = Math.max(0, Math.min(video.duration || Infinity, video.currentTime + seconds));
}

let rewind = document.querySelector('[data-skip="-10"]');
let skip = document.querySelector('[data-skip="25"]');

if (!rewind) {
  rewind = document.createElement('button');
  rewind.textContent = '« 10s';
  rewind.type = 'button';
  video.insertAdjacentElement('afterend', rewind);
}

if (!skip) {
  skip = document.createElement('button');
  skip.textContent = '25s »';
  skip.type = 'button';
  rewind.insertAdjacentElement('afterend', skip);
}

rewind.addEventListener('click', () => skipVideo(-10));
skip.addEventListener('click', () => skipVideo(25));

if (toggle) {
  toggle.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
}

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('loadedmetadata', updateProgress);

updateButton();