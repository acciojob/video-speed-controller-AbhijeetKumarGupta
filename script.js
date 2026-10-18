const video = document.querySelector('video');
video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';

const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');

const progress = document.createElement('div');
progress.className = 'progress__filled';
progress.style.height = '100%';
progress.style.width = '0%';
progress.style.backgroundColor = '#ffc600';
progress.style.position = 'absolute';
progress.style.left = '0';
progress.style.top = '0';

speed.style.position = 'relative';
speed.appendChild(progress);

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

const toggle = document.querySelector('.player__button.toggle');
const rewind = document.querySelector('.rewind');
const skip = document.querySelector('.skip');

toggle.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
});

video.addEventListener('timeupdate', () => {
  const percent = video.duration
    ? (video.currentTime / video.duration) * 100
    : 0;

  progress.style.width = `${percent}%`;
});

if (rewind) {
  rewind.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
  });
}

if (skip) {
  skip.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration || 0, video.currentTime + 25);
  });
}