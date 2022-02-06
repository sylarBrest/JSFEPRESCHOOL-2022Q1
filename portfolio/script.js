// Self-check
let requirements = `Итоговая оценка: 70/70.
1. Вёрстка +10
  - вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Кнопка Play/Pause на панели управления +10
  - при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5
  - внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5
3. Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10
4. При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10
5. При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10
6. Кнопка Play/Pause в центре видео +10
  - есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5
  - когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5
7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  - видео встроено в проект Портфолио
  - адаптив "работает" вплоть до 320px и не "ломает" вёрстку
  - есть кнопка переключения в полноэкранный режим:
    * по нажатию на неё происходит переход в полноэкранный режим, кнопка меняется на другую;
    * в полноэкранном режиме отображаются созданные элементы управления;
    * элементы управления съезжают вниз экрана и "растягиваются" на всю ширину экрана;
    * при нажатии на кнопку выхода из полноэкранного режима или при нажатии на кнопку ESC всё возвращаетс как было до входа в полноэкранный режим.
`;

console.log(requirements);

import variable from './js/params.js';
import i18Obj from './js/translate.js';

//Local Storage
let language = 'en';
let theme = 'dark';
let timeOfYear = 'autumn';

const setLocalStorage = () => {
  localStorage.setItem('lang', language);
  localStorage.setItem('theme', theme);
  localStorage.setItem('season', timeOfYear);
};

const getLocalStorage = () => {
  if (localStorage.getItem('season') && localStorage.getItem('lang') && localStorage.getItem('theme')) {
    changeImage(localStorage.getItem('season'));
    getTranslate(localStorage.getItem('lang'));
    changeTheme(localStorage.getItem('theme'));
  }
  else {
    setLocalStorage();
    getLocalStorage();
  }
  variable['body'].style.display = 'flex';
};

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

// Hamburger menu
const toggleMenu = () => {
  variable['hamburger'].classList.toggle('is-active');
  variable['nav'].classList.toggle('is-active');
  variable['body'].classList.toggle('is-active');
  lightToDark();
};

const closeMenu = (event) => {
  if (event.target.classList.contains('nav-link')) {
    variable['hamburger'].classList.remove('is-active');
    variable['nav'].classList.remove('is-active');
    variable['body'].classList.remove('is-active');
    lightToDark();
  }
};

// Portfolio buttons and images
const makeActive = (elements, value, data) => {
  elements.forEach(el => {
    el.classList.remove('active');
    if (el.dataset[data] === value) {
      el.classList.add('active');
    }
  });
};

const changeImage = (season) => {
  makeActive(variable['portfolio-button'], season, 'season');
  variable['portfolio-img'].forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.webp`);
  timeOfYear = season;
};

const changeImageEvent = (event) => {
  if(event.target.classList.contains('portfolio-button')) {
    changeImage(event.target.dataset.season);
  }
};

// Caching images & video
const preloadImages = (season) => {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/img/${season}/${i}.webp`;
  }
};

// Translate
const getTranslate = (lang) => {
  variable['data-i18n'].forEach(el => el.textContent = i18Obj[lang][el.dataset.i18n]);
  variable['data-form'].forEach(el => el.placeholder = i18Obj[lang][el.dataset.form]);
  makeActive(variable['lng'], lang, 'lang');
  language = lang;
};

const makeTranslate = (event) => {
  if (event.target.dataset.lang) {
    getTranslate(event.target.dataset.lang);
  }
};

// Theme change
const changeTheme = (color) => {
  (color === 'light')
    ? variable['data-theme'].forEach(el => el.classList.add('light'))
    : variable['data-theme'].forEach(el => el.classList.remove('light'));
  theme = color;
};

const changeThemeOnClick = (event) => {
  (event.target.classList.contains('light'))
    ? changeTheme('dark')
    : changeTheme('light');
};

function lightToDark() {
  if (variable['hamburger'].classList.contains('light')) {
    variable['body'].classList.toggle('light');
    variable['skills-container'].classList.toggle('light');
    variable['portfolio-container'].classList.toggle('light');
    variable['section-title'].forEach(el => el.classList.toggle('light'));
    variable['portfolio-button'].forEach(el => el.classList.toggle('light'));
  }
}

// Video player
const player = document.querySelector('.video-player');
const video = player.querySelector('.video');
const controls = player.querySelector('.controls');
const play = player.querySelector('.play');
const progress = player.querySelector('.progress');
const volumeButton = player.querySelector('.volume-button');
const volume = player.querySelector('.volume');
const playButton = player.querySelector('.video-player-button');
const poster = player.querySelector('.video-poster');
const fullScreenButton = player.querySelector('.expand');

let isMouseDownOnSlider = false;

const togglePlay = () => (video.paused) ? video.play() : video.pause();

const updatePlayButton = () => play.style.backgroundImage = (video.paused) ? `url('assets/svg/play.svg')` : `url('assets/svg/pause.svg')`;

const updateMuteButton = vol => (vol) ? volumeButton.classList.remove('mute') : volumeButton.classList.add('mute');

function updateVolume() {
  if (video.muted) {
    video.muted = !video.muted;
  }
  const percent = this.value / 100;
  updateMuteButton(percent);
  video[this.name] = percent;
  volume.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${percent * 100}%, var(--color-light-grey) ${percent * 100}%, var(--color-light-grey) 100%)`;
}

const updateVolumeClick = () => {
  volumeButton.classList.toggle('mute');
  video.muted = !video.muted;
}

const updateProgressAuto = () => {
  const percent = (video.currentTime / video.duration) * 100;
  if (!isMouseDownOnSlider) {
    progress.value = percent;
  }
  progress.style.background = `linear-gradient(to right, var(--color-gold) 0%, var(--color-gold) ${percent}%, var(--color-light-grey) ${percent}%, var(--color-light-grey) 100%)`;
}

const updateProgressManual = () => video.currentTime = progress.value / 100 * video.duration;

const togglePlayButton = () => playButton.style.visibility = (!video.paused) ? 'hidden' : 'visible';

const hidePoster = () => {
  poster.style.opacity = 0;
  poster.style.pointerEvents = 'none';
  poster.style.display = 'block';
}

const toggleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullScreenButton.classList.remove('fullscreen');
    controls.classList.remove('fullscreen');
  } else {
    player.requestFullscreen();
    fullScreenButton.classList.add('fullscreen');
    controls.classList.add('fullscreen');
  }
}

const exitFullScreen = () => {
  if (!document.fullscreenElement) {
    fullScreenButton.classList.remove('fullscreen');
    controls.classList.remove('fullscreen');
  }
}

variable['seasons'].forEach(el => preloadImages(el));
variable['theme-change'].addEventListener('click', changeThemeOnClick);
variable['switch-lng'].addEventListener('click', makeTranslate);
variable['portfolio-buttons'].addEventListener('click', changeImageEvent);
variable['hamburger'].addEventListener('click', toggleMenu);
variable['nav'].addEventListener('click', closeMenu);
poster.addEventListener('click', hidePoster);
poster.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
play.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('play', togglePlayButton);
video.addEventListener('pause', togglePlayButton);
video.addEventListener('timeupdate', updateProgressAuto);
volume.addEventListener('input', updateVolume);
volume.addEventListener('change', updateVolume);
volumeButton.addEventListener('click', updateVolumeClick);
progress.addEventListener('change', updateProgressManual);
progress.addEventListener('mousedown', () => isMouseDownOnSlider = true);
progress.addEventListener('mouseup', () => isMouseDownOnSlider = false);
playButton.addEventListener('click', hidePoster);
playButton.addEventListener('click', togglePlay);
fullScreenButton.addEventListener('click', toggleFullScreen);
document.addEventListener('fullscreenchange', exitFullScreen);