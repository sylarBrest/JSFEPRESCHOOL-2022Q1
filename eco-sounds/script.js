console.log('Поехали!');

let isPlay = false;
const button = document.querySelector('.play');
const audio = new Audio();

const playAudio = () => {
    audio.src = `assets/audio/forest.mp3`
    if (!isPlay) {
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
    }
    else {
        audio.pause();
        isPlay = false;
    }
}

const toggleBtn = () => {
    button.classList.toggle('pause');
    playAudio();
}

button.addEventListener('click', toggleBtn);