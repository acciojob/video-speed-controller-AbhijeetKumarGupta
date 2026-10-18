const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

	  if (this.name === 'volume') {
	    video.volume = this.value;
	  }
	
	  if (this.name === 'playbackSpeed') {
	    video.playbackRate = this.value;
	  }
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));

const video = document.querySelector('video');
const toggle = document.querySelector('.player__button.toggle');
const progress = document.querySelector('.progress__filled');
const rewind = document.querySelector('[data-skip="-10"]');
const skip = document.querySelector('[data-skip="25"]');

video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';

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

function updateProgress() {
  progress.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
}

function skipVideo() {
  video.currentTime += Number(this.dataset.skip);
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

rewind.addEventListener('click', skipVideo);
skip.addEventListener('click', skipVideo);

updateButton();