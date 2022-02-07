let requirements = `Итоговая оценка: 0/60.
`;

console.log(requirements);

const galleryContainer = document.querySelector('.main-container');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=30&api_key=9a4f86e3e3903203825e1c780bdec681&tags=cars,ferrari&tag_mode=all&extras=url_m&format=json&nojsoncallback=1';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.photos.photo[0].url_m);
    console.log(data.photos.photo);
    showData(data.photos.photo);
}

getData();

function showData(data) {
    data.forEach(element => {
        const img = `<img class="gallery-img" src=${element.url_m} alt="image">`;
        galleryContainer.insertAdjacentHTML('beforeend', img);
          
    });
}