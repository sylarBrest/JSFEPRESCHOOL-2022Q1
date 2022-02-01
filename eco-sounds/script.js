let requirements = `Итоговая оценка: 70/70.
1. Вёрстка +10
  - есть не меньше пяти интерактивных элементов, с которыми пользователи могут взаимодействовать. Изменение внешнего вида самого элемента и состояния курсора при наведении, плавные анимации +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При кликах по интерактивным элементам меняется изображение +10
3. При кликах по интерактивным элементам меняется звук +10
4. Активный в данный момент интерактивный элемент выделяется стилем +10
5. Кнопка Play/Pause +20
  - есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание звука +10
  - внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент звук +10
6. Дополнительный - не предусмотренный в задании - функционал, улучшающий качество приложения +10
  - Кнопка Скачать, по нажатию на которую можно скачать звук, выбранный в текущий момент
`;

console.log(requirements);

let isPlay = false;
const button = document.querySelector('.play');
const audio = new Audio();
audio.src = `assets/audio/forest.mp3`
const image = new Image();
const main = document.querySelector('.main');
const links = document.querySelectorAll('.nav-item');
const sounds = document.querySelector('.nav-list');
const download = document.querySelector('.download');

const setAudio = (source) => audio.src = `assets/audio/${source}.mp3`;

const setImage = (source) => main.style.backgroundImage = `url('assets/img/${source}.webp')`;

const setDownload = (source) => download.href = `assets/audio/${source}.mp3`;

const setActive = (elem) => {
    links.forEach(el => el.classList.remove('active'));
    elem.classList.add('active');
}

const playAudio = () => {
    if (!isPlay) {
        audio.currentTime = 0;
        audio.play();
    }
    else {
        audio.pause();
    }
    isPlay = !isPlay;
}

const toggleBtn = () => {
    button.classList.toggle('pause');
    playAudio();
}

const selectAudio = (event) => {
    isPlay = false;
    if (event.target.dataset.audio) {
        if (button.classList.contains('pause')) {
            button.classList.remove('pause');
        }
        setAudio(event.target.dataset.audio);
        setImage(event.target.dataset.audio);
        setDownload(event.target.dataset.audio);
        setActive(event.target);
        toggleBtn();
    }
}

button.addEventListener('click', toggleBtn);
sounds.addEventListener('click', selectAudio);