let requirements = `Итоговая оценка: 60/60.
1. Вёрстка +10
  - на странице есть цитата и кнопка для смены цитаты +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При загрузке страницы приложения отображается рандомная цитата +10
3. При перезагрузке страницы цитата обновляется (заменяется на другую) +10
4. Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10
5. Смена цитаты сопровождается появлением фонового изображения и проигрывания звука +10
6. Можно выбрать один из двух языков отображения цитат: en/ru +10
`;

console.log(requirements);

const p = document.querySelector('.quote');
const button = document.querySelector('.button');
const langButton = document.querySelector('.lang');
const animation = document.querySelector('.animation');
const audio = new Audio;
audio.src = 'assets/audio/meow.mp3';
audio.volume = 0.5;

const url = 'https://type.fit/api/quotes';

async function getQuotesEn() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
}

function showData(data) {
    const rand = Math.floor(Math.random() * data.length);
    p.textContent = data[rand].text;
}

async function getQuotesRu() {  
    const quotes = './assets/json/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    showData(data);
}

const changeButtons = () => {
    langButton.textContent = (langButton.classList.contains('ru')) ? 'en' : 'ru';
    button.textContent = (langButton.classList.contains('ru')) ? 'Дай же мне цитату!' : 'Give me the quote!';
}

const showCat = () => {
    animation.animate([
        { 
            filter: 'none',
        },
        { 
            filter: 'invert(74%) sepia(1%) saturate(0%) hue-rotate(46deg) brightness(94%) contrast(87%)',
        },
        { 
          filter: 'none',
        },
    ], 2000);
    audio.play();
}

const getData = () => (langButton.classList.contains('ru')) ? getQuotesRu() : getQuotesEn();

getData();

const getTranslate = () => {
    langButton.classList.toggle('ru');
    getData();
    changeButtons();
}

button.addEventListener('click', getData);
button.addEventListener('click', showCat);
langButton.addEventListener('click', getTranslate);
langButton.addEventListener('click', showCat);