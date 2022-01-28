// Self-check
let requirements = `Итоговая оценка: 85/85.
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
4. Дополнительный функционал: выбранный пользователем язык отображения страницы, набор изображений portfolio и тема сохраняются при перезагрузке страницы +5
5. Дополнительный функционал: эффект заполнения кнопок внутрь в секции portfolio при наведении +5
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
}

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
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

// Hamburger menu
const toggleMenu = () => {
  variable['hamburger'].classList.toggle('is-active');
  variable['nav'].classList.toggle('is-active');
  variable['body'].classList.toggle('is-active');
  lightToDark();
}

const closeMenu = (event) => {
  if (event.target.classList.contains('nav-link')) {
    variable['hamburger'].classList.remove('is-active');
    variable['nav'].classList.remove('is-active');
    variable['body'].classList.remove('is-active');
    lightToDark();
  }
}

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
  makeActive(variable['portfolio-button'], season, 'season');
  variable['portfolio-img'].forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.webp`);
  timeOfYear = season;
}

const changeImageEvent = (event) => {
  if(event.target.classList.contains('portfolio-button')) {
    changeImage(event.target.dataset.season);
  }
}

// Caching images
const preloadImages = (season) => {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/img/${season}/${i}.webp`;
  }
}

// Translate
const getTranslate = (lang) => {
  variable['data-i18n'].forEach(el => el.textContent = i18Obj[lang][el.dataset.i18n]);
  variable['data-form'].forEach(el => el.placeholder = i18Obj[lang][el.dataset.form]);
  makeActive(variable['lng'], lang, 'lang');
  language = lang;
}

const makeTranslate = (event) => getTranslate(event.target.dataset.lang);

// Theme change
const changeTheme = (color) => {
  (color === 'light')
    ? variable['data-theme'].forEach(el => el.classList.add('light'))
    : variable['data-theme'].forEach(el => el.classList.remove('light'));
  theme = color;
}

const changeThemeOnClick = (event) => {
  (event.target.classList.contains('light'))
    ? changeTheme('dark')
    : changeTheme('light');
}

function lightToDark() {
  if (variable['hamburger'].classList.contains('light')) {
    variable['body'].classList.toggle('light');
    variable['skills-container'].classList.toggle('light');
    variable['section-title'].classList.toggle('light');
  }
}

variable['seasons'].forEach(el => preloadImages(el));
variable['theme-change'].addEventListener('click', changeThemeOnClick);
variable['switch-lng'].addEventListener('click', makeTranslate);
variable['portfolio-buttons'].addEventListener('click', changeImageEvent);
variable['hamburger'].addEventListener('click', toggleMenu);
variable['nav'].addEventListener('click', closeMenu);