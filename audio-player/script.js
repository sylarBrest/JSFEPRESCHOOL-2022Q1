let requirements = `Итоговая оценка: 0/60.
`;

console.log(requirements);

const mainCover = document.querySelector('.main');
const audioPlayer = document.querySelector('.audio-player');
const cover = audioPlayer.querySelector('.cover');
const audio = audioPlayer.querySelector('.audio');
const artist = audioPlayer.querySelector('.artist');
const song = audioPlayer.querySelector('.song');
const prevButton = audioPlayer.querySelector('.prev');
const playButton = audioPlayer.querySelector('.play');
const nextButton = audioPlayer.querySelector('.next');
const progressBar = audioPlayer.querySelector('.progress');
const currentTime = audioPlayer.querySelector('.current');
const duration = audioPlayer.querySelector('.duration');

audio.volume = 0.5;

const togglePlay = () => (audio.paused) ? audio.play() : audio.pause();

const updatePlayButton = () => playButton.style.backgroundImage = (audio.paused) ? `url('assets/svg/play.svg')` : `url('assets/svg/pause.svg')`;

const updateCurrentTime = () => currentTime.textContent = getTimeCodeFromNum(audio.currentTime);

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  }

const updateProgressAuto = () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = percent;
    progressBar.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #acacac ${percent}%, #acacac 100%)`;
}

playButton.addEventListener('click', togglePlay);
audio.addEventListener('play', updatePlayButton);
audio.addEventListener('pause', updatePlayButton);
audio.addEventListener('timeupdate', updateProgressAuto);
audio.addEventListener('timeupdate', updateCurrentTime);