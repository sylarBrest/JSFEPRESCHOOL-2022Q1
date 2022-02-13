let requirements = `Итоговая оценка: 60/60.
1. Вёрстка +10
  - реализован интерфейс игры +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10
3. Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10
4. По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10
5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10
6. Звуковое оформление ходов и окна конца игры +10
x7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  -x высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
`;

console.log(requirements);

const newGameButton = document.querySelector('.new-game');
const gameBoard = document.querySelector('.game-board');

//Arrange cells on game board
function arrangeBoard(size) {
  for (let i = 0; i < size * size; i++) {
    const cell = `<div class="cell" data-cell="${i}"></div>`;
    gameBoard.insertAdjacentHTML('beforeend', cell);
  }
}

arrangeBoard(3);

let moves = 0; //moves in game
let crossCells = [], roundCells = [];
const audio = new Audio();

audio.src = 'assets/audio/move.mp3';

const winCells = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkGameOver = () => {
  if (winCells.some(win => win.every(el => crossCells.includes(el)))) {
    audio.src = 'assets/audio/win.mp3';
    showGameOver('X');
  } else if (winCells.some(win => win.every(el => roundCells.includes(el)))) {
    audio.src = 'assets/audio/win.mp3';
    showGameOver('O');
  } else if (moves === 8) {
    audio.src = 'assets/audio/draw.mp3';
    showGameOver('No one');
  }
}

const makeMove = (event) => {
  setTimeout(() => {
    audio.play();
  }, 100);
  const toe = (moves % 2) ? 'round' : 'cross';
  event.target.insertAdjacentHTML('beforeend', `<img class="img-cell" src="assets/svg/${toe}.svg" alt="${toe}">`);
  (moves % 2) ? roundCells.push(+event.target.dataset.cell) : crossCells.push(+event.target.dataset.cell);
  checkGameOver();
  moves++;
}

gameBoard.addEventListener('click', makeMove);

/* Local Storage */
let recordTableTTT = []; //array of 10 last games for storage in localStorage

const setLocalStorage = () => localStorage.setItem('records', JSON.stringify(recordTableTTT));

const getLocalStorage = () => {
  if (localStorage.getItem('records')) {
    recordTableTTT = JSON.parse(localStorage.getItem('records'));
  }
  fillRecordTable(recordTableTTT);
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

const gameOver = document.querySelector('.game-over');
const showModal = () => gameOver.classList.add('show');

//write result of the game to Array to be placed in Local Storage
const writeRecord = (res) => {
  recordTableTTT.push(res);
  if (recordTableTTT.length > 10) {
    recordTableTTT.shift();
  }
}

const divRecordTable = document.querySelector('.record-table');

//Fill Table of records with records from localStorage
const fillRecordTable = table => {
  for (let record of table) {
    const pRecord = `<p class="record-line">${record}</p>`;
    divRecordTable.insertAdjacentHTML('beforeend', pRecord);
  }
}

/* Showing Table of records */
const tableRecordsButton = document.querySelector('.table-of-records');
const mainContainer = document.querySelector('.main-container');

const toggleOpen = () => {
  divRecordTable.classList.toggle('open');
  mainContainer.classList.toggle('open');
}

tableRecordsButton.addEventListener('click', toggleOpen);

/* Show modal window when found all the pairs*/
const showGameOver = res => {
  document.title += ` - ${res} won`;
  audio.play();
  const okButton = gameOver.querySelector('.ok');
  const pMoves = gameOver.querySelector('.moves');
  pMoves.textContent = `${res} won in ${moves+1} moves`;
  showModal();
  writeRecord(pMoves.textContent);
  okButton.addEventListener('click', newGame);
}

const newGame = () => window.location.reload();

newGameButton.addEventListener('click', newGame);