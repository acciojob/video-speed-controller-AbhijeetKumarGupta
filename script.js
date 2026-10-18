const video = document.querySelector('video');
video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';

const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

  if (this.name === 'volume') {
    video.volume = this.value;
  }

  if (this.name === 'playbackSpeed') {
    video.playbackRate = this.value;
    document.querySelector('.speed-bar').textContent = `${this.value}×`;
  }
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

const toggle = document.querySelector('.player__button.toggle');
const progress = document.querySelector('.progress__filled');
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
  const percent = (video.currentTime / video.duration) * 100;
  if (progress) {
    progress.style.flexBasis = `${percent}%`;
  }
});

if (rewind) {
  rewind.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
  });
}

if (skip) {
  skip.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 25);
  });
}