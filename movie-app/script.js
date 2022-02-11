let requirements = `Итоговая оценка: 70/70.
1. Вёрстка +10
  - на странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При загрузке приложения на странице отображаются карточки поппулярных фильмов с полученными от API данными +10
3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово (или фраза), если такие данные предоставляет API +10
4. Поиск +30
  - при открытии приложения курсор находится в поле ввода +5
  - есть placeholder +5
  - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
  - поисковый запрос можно отправить нажатием клавиши Enter +5
  - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
  - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
5. Дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  - наличие на карточке фильма его описания и рейтинга на TMDB +2
  - если не находит фильмов по запросу, то выводится надпись "No results found..." +2
  - постеры фильмов сохраняют свои пропорции +2
  - если постер не найден, то выводится замещающий постер +2
  - если нажать на лого, то загрузятся популярные фильмы +2
`;

console.log(requirements);

const returnMain = document.querySelector('.logo');
const movieContainer = document.querySelector('.main-container');
const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('.search-input');

const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3c141559256248f854d2665760baedf6`;

async function getData(uri) {
    const res = await fetch(uri);
    const data = await res.json();
    showData(data.results);
}

getData(url);

function showData(data) {
    if (data.length) {
        data.forEach(element => {
            const posterSrc = (element.poster_path) ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${element.poster_path}` : 'assets/img/not-found.webp'; 
            const divMovie = `<div class="movie-card">
                <img class="movie-poster" src="${posterSrc}" alt="image">
                <div class="movie-info">
                    <p class="movie-name">${element.title}</p>
                    <p class="movie-rating">${element.vote_average}</p>
                </div>
            <p class="movie-desc">${element.overview}</p>
            </div>
            `;
            movieContainer.insertAdjacentHTML('beforeend', divMovie);
        });
    }
    else {
        const p = `<p class="no-results">No results found...</p>`;
        movieContainer.insertAdjacentHTML('afterbegin', p);
    }
}

function deleteData() {
    const noResults = document.querySelector('.no-results');
    if (noResults) {
        movieContainer.removeChild(noResults);
    }
    const imgs = movieContainer.querySelectorAll('.movie-card');
    imgs.forEach(element => movieContainer.removeChild(element));
}

function search (event) {
    event.preventDefault();
    const query = encodeURI(searchInput.value);
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=3c141559256248f854d2665760baedf6`;
    deleteData();
    getData(url);
}

window.addEventListener('load', () => searchInput.focus());
returnMain.addEventListener('click', () => window.location.reload());
searchForm.addEventListener('submit', search);