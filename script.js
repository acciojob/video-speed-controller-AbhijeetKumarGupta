const video = document.querySelector('video');
video.src = 'https://www.w3schools.com/html/mov_bbb.mp4';

const wrapper = document.querySelector('.wrapper');

let progress = wrapper.querySelector('.progress');

if (!progress) {
  progress = document.createElement('div');
  progress.className = 'progress';
  progress.style.width = '100%';
  progress.style.height = '10px';
  progress.style.backgroundColor = '#ccc';
  progress.style.position = 'relative';

  const progressFilled = document.createElement('div');
  progressFilled.className = 'progress__filled';
  progressFilled.style.width = '0%';
  progressFilled.style.height = '100%';
  progressFilled.style.backgroundColor = '#ffc600';

  progress.appendChild(progressFilled);
  video.insertAdjacentElement('afterend', progress);
}

const progressFilled = progress.querySelector('.progress__filled');

video.addEventListener('timeupdate', () => {
  const percent = video.duration
    ? (video.currentTime / video.duration) * 100
    : 0;

  progressFilled.style.width = `${percent}%`;
});