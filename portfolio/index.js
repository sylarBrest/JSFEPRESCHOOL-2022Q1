// Self-check
let requirements = `Итоговая оценка: 85/85.
1. Вёрстка соответствует макету. Ширина экрана 768px +48
  + блок <header> +6
  + секция hero +6
  + секция skills +6
  + секция portfolio +6
  + секция video +6
  + секция price +6
  + секция contacts +6
  + блок <footer> +6
2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15
  + нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5
  + нет полосы прокрутки при ширине страницы от 768рх до 480рх +5
  + нет полосы прокрутки при ширине страницы от 480рх до 320рх +5
3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22
  + при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2
  + при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4
  + высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4
  + при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4
  + бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2
  + ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2
  + при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4
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
    portfolioImages.forEach((img, index) => img.src = `assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
  }
}

portfolioButtons.addEventListener('click', changeImage);

// Caching images
const seasons = ['winter', 'spring', 'summer', 'autumn'];

seasons.forEach(el => preloadImages(el));

function preloadImages(season) {
  for(let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/img/${season}/${i}.jpg`;
  }
}