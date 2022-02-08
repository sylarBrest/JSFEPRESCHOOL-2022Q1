let requirements = `Итоговая оценка: 35/60.
1. Вёрстка +10
  - на странице есть несколько фото и строка поиска +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При загрузке приложения на странице отображаются полученные от API изображения +10
x3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
4. Поиск +30
  -x при открытии приложения курсор находится в поле ввода +5
  - есть placeholder +5
  - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
  -x поисковый запрос можно отправить нажатием клавиши Enter +5
  -x после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
  - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
`;

console.log(requirements);

const galleryContainer = document.querySelector('.main-container');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const searchForm = document.querySelector('.search-form');

let query = 'ferrari';
const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=9NT5CyTGxjhPmBFIRFIoFUsEr1d_RPe-SA3AU9SgBZ0`;

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
//    console.log(data.results);
    showData(data.results);
}

getData();

function showData(data) {
    data.forEach(element => {
        const img = `<img class="gallery-img" src=${element.urls.regular} alt="image">`;
        galleryContainer.insertAdjacentHTML('beforeend', img);
    });
}

const find = () => {
    query = searchInput.value;
}

const search = (event) => {
    event.preventDefault();
    console.log(query);
    console.log(getData());
}

//window.addEventListener('load', search);
searchInput.addEventListener('input', find);
searchForm.addEventListener('submit', search);