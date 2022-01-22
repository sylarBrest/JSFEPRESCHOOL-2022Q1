// Self-check
let requirements = `Итоговая оценка: 50/85.
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

function toggleMenu() {
  hamburger.classList.toggle('is-active');
  nav.classList.toggle('is-active');
  body.classList.toggle('is-active');
}

hamburger.addEventListener('click', toggleMenu);
nav.addEventListener('click', closeMenu);

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    hamburger.classList.remove('is-active');
    nav.classList.remove('is-active');
    body.classList.remove('is-active');
  }
}

// Portfolio buttons and images
const portfolioImages = document.querySelectorAll('.portfolio-img');
const portfolioButtons = document.querySelector('.portfolio-buttons');

function changeImage(event) {
  if(event.target.classList.contains('portfolio-button')) {
    portfolioImages.forEach((img, index) => img.src = `assets/img/${event.target.dataset.season}/${index + 1}.webp`);
  }
}

portfolioButtons.addEventListener('click', changeImage);
portfolioButtons.addEventListener('click', changeButtonColor);
const portfolioButton = document.querySelectorAll('.portfolio-button');

function changeButtonColor(event) {
  portfolioButton.forEach(el => el.classList.remove('active'));
  event.target.classList.add('active');
}


// Caching images
const seasons = ['winter', 'spring', 'summer', 'autumn'];

seasons.forEach(el => preloadImages(el));

function preloadImages(season) {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/img/${season}/${i}.webp`;
  }
}

// Translate
import i18Obj from './js/translate.js';

function getTranslate(event) {
  const textToTranslate = document.querySelectorAll('[data-i18n]');
  const placeholderTranslate = document.querySelectorAll('[data-form]');

  if (event.target.classList.contains('ru')) {
    textToTranslate.forEach(el => el.textContent = i18Obj['ru'][el.dataset.i18n]);
    placeholderTranslate.forEach(el => el.placeholder = i18ObjForm['ru'][el.dataset.form]);
  }
  if (event.target.classList.contains('en')) {
    textToTranslate.forEach(el => el.textContent = i18Obj['en'][el.dataset.i18n]);
    placeholderTranslate.forEach(el => el.placeholder = i18ObjForm['en'][el.dataset.form]);
  }
}

const languages = document.querySelector('.switch-lng');

languages.addEventListener('click', getTranslate);
languages.addEventListener('click', changeLangColor);

const lang = document.querySelectorAll('.lng');

function changeLangColor(event) {
  lang.forEach(el => el.classList.remove('active'));
  event.target.classList.add('active');
}

const i18ObjForm = {
  'en': {
    'phone': 'Phone',
    'message': 'Message',
  },
  'ru': {
    'phone': 'Телефон',
    'message': 'Сообщение',
  }
}

// Theme change
const themeChanger = document.querySelector('.theme-change');
const themeChangeElements = document.querySelectorAll('.dark');

themeChanger.addEventListener('click', changeTheme);

function changeTheme(event) {
  themeChangeElements.forEach(el => el.classList.toggle('light'));
  event.target.classList.toggle('light');
}