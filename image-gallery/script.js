let requirements = `Итоговая оценка: 65/65.
1. Вёрстка +10
  - на странице есть несколько фото и строка поиска +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При загрузке приложения на странице отображаются полученные от API изображения +10
3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
4. Поиск +30
  - при открытии приложения курсор находится в поле ввода +5
  - есть placeholder +5
  - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
  - поисковый запрос можно отправить нажатием клавиши Enter +5
  - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
  - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
5. Дополнительный функционал +5
  - если не находит изображений по запросу, то выводится надпись "No results found..." +1
  - изображения сохраняют свои пропорции +4
`;

console.log(requirements);

const galleryContainer = document.querySelector('.main-container');
const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('.search-input');

let query = 'ferrari';
const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=9NT5CyTGxjhPmBFIRFIoFUsEr1d_RPe-SA3AU9SgBZ0`;

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    showData(data.results);
}

getData(url);

function showData(data) {
    if (data.length) {
        data.forEach(element => {
            const img = `<img class="gallery-img" src=${element.urls.regular} alt="image">`;
            galleryContainer.insertAdjacentHTML('beforeend', img);
        });
    }
    else {
        const p = `<p class="no-results">No results found...</p>`;
        galleryContainer.insertAdjacentHTML('afterbegin', p);
    }
}

function deleteData() {
    const noResults = document.querySelector('.no-results');
    if (noResults) {
        galleryContainer.removeChild(noResults);
    }
    const imgs = galleryContainer.querySelectorAll('.gallery-img');
    imgs.forEach(element => galleryContainer.removeChild(element));
}

function search (event) {
    event.preventDefault();
    const query = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=9NT5CyTGxjhPmBFIRFIoFUsEr1d_RPe-SA3AU9SgBZ0`;
    deleteData();
    getData(url);
}

window.addEventListener('load', () => searchInput.focus());
searchForm.addEventListener('submit', search);