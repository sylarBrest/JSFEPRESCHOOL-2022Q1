// Self-check
let requirements = `Итоговая оценка: 75/85.
1. Смена изображений в секции portfolio +25
Изображения разных времён года получаем из папок с соответствующими названиями
Изображения заменены на другие с целью улучшения качества созданного приложения
  - при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
  - кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5
2. Перевод страницы на два языка +25
Для перевода используется файл translate.js
  - при клике по надписи ru англоязычная страница переводится на русский язык +10
  - при клике по надписи en русскоязычная страница переводится на английский язык +10
  - надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5
3. Переключение светлой и тёмной темы +25
Внешний вид тёмной темы соответствует макету, который верстали в предыдущих частях задания, внешний вид светлой темы соответствует следующему варианту макета - блоки и секции header, hero, contacts, footer остались без изменений, в оставшихся секциях цвет фона и шрифта поменялись местами: фон стал белым, шрифт черным.
На страницу добавлен переключатель при клике по которому:
  - тёмная тема приложения сменяется светлой +10
  - светлая тема приложения сменяется тёмной +10
  - после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5
`;

console.log(requirements);

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const body = document.querySelector('body');

const toggleMenu = () => {
  hamburger.classList.toggle('is-active');
  nav.classList.toggle('is-active');
  body.classList.toggle('is-active');
  lightToDark();
}

const closeMenu = (event) => {
  if (event.target.classList.contains('nav-link')) {
    hamburger.classList.remove('is-active');
    nav.classList.remove('is-active');
    body.classList.remove('is-active');
    lightToDark();
  }
}

hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);

// Portfolio buttons and images
const makeActive = (elements, value, data) => {
  elements.forEach(el => {
    el.classList.remove('active');
    if (el.dataset[data] === value) {
      el.classList.add('active');
    }
  });
}

const changeImage = (season) => {
  makeActive(document.querySelectorAll('.portfolio-button'), season, 'season');
  document.querySelectorAll('.portfolio-img').forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.webp`);
  timeOfYear = season;
}

const changeImageEvent = (event) => {
  if(event.target.classList.contains('portfolio-button')) {
    changeImage(event.target.dataset.season);
  }
}

document.querySelector('.portfolio-buttons').addEventListener('click', changeImageEvent);

// Caching images
const preloadImages = (season) => {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/img/${season}/${i}.webp`;
  }
}

['winter', 'spring', 'summer', 'autumn'].forEach(el => preloadImages(el));

// Translate
import i18Obj from './js/translate.js';

const getTranslate = (lang) => {
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = i18Obj[lang][el.dataset.i18n]);
  document.querySelectorAll('[data-form]').forEach(el => el.placeholder = i18Obj[lang][el.dataset.form]);
  makeActive(document.querySelectorAll('.lng'), lang, 'lang');
  language = lang;
}

const makeTranslate = (event) => {
  getTranslate(event.target.dataset.lang);
}

document.querySelector('.switch-lng').addEventListener('click', makeTranslate);

// Theme change
const themeChanger = document.querySelector('.theme-change');
const themeChangeElements = document.querySelectorAll('.dark');
const navLinks = document.querySelectorAll('.nav-link');

const changeTheme = (event) => {
  themeChangeElements.forEach(el => el.classList.toggle('light'));
  event.target.classList.toggle('light');
  nav.classList.toggle('light');
  navLinks.forEach(el => el.classList.toggle('light'));
  if (event.target.classList.contains('dark')) {
    theme = 'dark'
  }
  if (event.target.classList.contains('light')) {
    theme = 'light'
  }
}

const section = document.querySelector('.skills-container');
const title = document.querySelector('.section-title');

function lightToDark() {
  if (hamburger.classList.contains('light')) {
    body.classList.toggle('light');
    section.classList.toggle('light');
    title.classList.toggle('light');
  }
}

themeChanger.addEventListener('click', changeTheme);

// Local storage
let language = 'en';
let theme = 'dark';
let timeOfYear = 'autumn';

const setLocalStorage = () => {
  localStorage.setItem('lang', language);
  localStorage.setItem('theme', theme);
  localStorage.setItem('season', timeOfYear);
}

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem('season') && localStorage.getItem('lang')) {
    changeImage(localStorage.getItem('season'));
    getTranslate(localStorage.getItem('lang'));
  }
  else {
    setLocalStorage();
    getLocalStorage();
  }
}

window.addEventListener('load', getLocalStorage);