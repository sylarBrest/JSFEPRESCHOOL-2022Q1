let requirements = `Итоговая оценка: 0/60.
1. Вёрстка +10
  - вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Кнопка Play/Pause +10
  - есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
  - внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
4. При смене аудиотрека меняется изображение - обложка аудиотрека +10
5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10
`;

console.log(requirements);

const mainCover = document.querySelector('.main');
const audioPlayer = document.querySelector('.audio-player');
const cover = audioPlayer.querySelector('.cover');
const audio = audioPlayer.querySelector('.audio');
const artist = audioPlayer.querySelector('.artist');
const songName = audioPlayer.querySelector('.song');
const prevButton = audioPlayer.querySelector('.prev');
const playButton = audioPlayer.querySelector('.play');
const nextButton = audioPlayer.querySelector('.next');
const progressBar = audioPlayer.querySelector('.progress');
const currentTime = audioPlayer.querySelector('.current');
const duration = audioPlayer.querySelector('.duration');

const songs = [
  {artist: 'The Offspring', song: 'Let the Bad Times Roll', short: 'bad_times_roll', duration: '3:18'}, 
  {artist: 'Chevelle', song: 'Jars', short: 'jars', duration: '3:19'},
  {artist: 'My Chemical Romance', song: 'Na Na Na (Na Na Na Na Na Na Na Na Na)', short: 'nanana', duration: '3:26'},
  {artist: 'All Time Low', song: 'Outlines', short: 'outlines', duration: '3:35'},
  {artist: 'PAIN', song: 'Party in My Head', short: 'party_in_my_head', duration: '3:08'},
];

let songIndex = 0;

let isMouseDownOnSlider = false;

let isPlay = false;

audio.volume = 0.5;

const getTimeCodeFromNum = num => {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

const togglePlay = () => {
  (audio.paused) ? audio.play() : audio.pause();
  isPlay = !isPlay;
}

const updatePlayButton = () => playButton.style.backgroundImage = (audio.paused) ? `url('assets/svg/play.svg')` : `url('assets/svg/pause.svg')`;

const loadSong = index => {
  artist.textContent = songs[index]['artist'];
  songName.textContent = songs[index]['song'];
  audio.src = `assets/audio/${songs[index]['short']}.mp3`;
  cover.style.backgroundImage = `url('assets/img/${songs[index]['short']}.webp')`;
  mainCover.style.setProperty('--image', `url('assets/img/${songs[index]['short']}.webp')`);
  duration.textContent = songs[index]['duration'];
  if (isPlay) {
    audio.play();
  }
}

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songIndex);
}

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songIndex);
}

const updateCurrentTime = () => currentTime.textContent = getTimeCodeFromNum(audio.currentTime);

const updateProgressAuto = () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  if (!isMouseDownOnSlider) {
    progressBar.value = percent;
  }
  progressBar.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #acacac ${percent}%, #acacac 100%)`;
}

const updateProgressManual = () => audio.currentTime = (audio.duration || 0) * progressBar.value / 100;

document.addEventListener('load', () => loadSong(songIndex));
playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);
audio.addEventListener('play', updatePlayButton);
audio.addEventListener('pause', updatePlayButton);
audio.addEventListener('timeupdate', updateCurrentTime);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', updateProgressAuto);
progressBar.addEventListener('mousedown', () => isMouseDownOnSlider = true);
progressBar.addEventListener('mouseup', () => isMouseDownOnSlider = false);
progressBar.addEventListener('change', updateProgressManual);