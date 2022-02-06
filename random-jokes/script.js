let requirements = `Итоговая оценка: 40/60.
1. Вёрстка +10
  - на странице есть цитата и кнопка для смены цитаты +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При загрузке страницы приложения отображается рандомная цитата +10
3. При перезагрузке страницы цитата обновляется (заменяется на другую) +10
4. Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10
5. Смена цитаты сопровождается любым другим эффектом, например, изменяется изображение или меняется фоновый цвет страницы, или проигрывается звук и т.д * +10
6. Можно выбрать один из двух языков отображения цитат: en/ru или en/be ** +10
`;

console.log(requirements);

const p = document.querySelector('.quote');
const button = document.querySelector('.button');

const url = 'https://type.fit/api/quotes';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
}

function showData(data) {
    const rand = Math.floor(Math.random() * data.length);
    p.textContent = data[rand].text;
}

getData();

async function getQuotes() {  
    const quotes = './assets/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    showData(data);
}

//getQuotes();


button.addEventListener('click', getData);
