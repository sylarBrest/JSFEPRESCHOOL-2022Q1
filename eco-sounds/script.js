console.log('Поехали!');

let isPlay = false;
const button = document.querySelector('.play');
const audio = new Audio();
audio.src = `assets/audio/forest.mp3`
const image = new Image();
const main = document.querySelector('.main');

const setAudio = (source) => audio.src = `assets/audio/${source}.mp3`;
const setImage = (source) => main.style.backgroundImage = `url('assets/img/${source}.webp')`;

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

button.addEventListener('click', toggleBtn);

const selectAudio = (event) => {
    isPlay = false;
    if (event.target.dataset.audio) {
        if (button.classList.contains('pause')) {
            button.classList.remove('pause');
        }
        setAudio(event.target.dataset.audio);
        setImage(event.target.dataset.audio);
        toggleBtn();
    }
}

const sounds = document.querySelector('.nav-list');

sounds.addEventListener('click', selectAudio);