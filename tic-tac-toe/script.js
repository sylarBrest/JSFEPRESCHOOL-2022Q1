let requirements = `Итоговая оценка: 30/60.
1. Вёрстка +10
  - реализован интерфейс игры +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10
x3. Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10
x4. По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10
5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10
x6. Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
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

const makeMove = (event) => {
  const toe = (moves % 2) ? 'round' : 'cross';
  event.target.insertAdjacentHTML('beforeend', `<img class="img-cell" src="assets/svg/${toe}.svg" alt="${toe}">`);
  moves++;
}

gameBoard.addEventListener('click', makeMove);

/* Local Storage */
let recordTable = []; //array of 10 last games for storage in localStorage

const setLocalStorage = () => localStorage.setItem('records', JSON.stringify(recordTable));

const getLocalStorage = () => {
  if (localStorage.getItem('records')) {
    recordTable = JSON.parse(localStorage.getItem('records'));
  }
  fillRecordTable(recordTable);
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

const gameOver = document.querySelector('.game-over');
const showModal = () => gameOver.classList.add('show');

//write result of the game to Array to be placed in Local Storage
const writeRecord = () => {
  recordTable.push(moves);
  if (recordTable.length > 10) {
    recordTable.shift();
  }
}

const divRecordTable = document.querySelector('.record-table');

//Fill Table of records with records from localStorage
const fillRecordTable = table => {
  for (let record of table) {
    const pRecord = `<p class="record-line">${record} moves</p>`;
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
const showGameOver = () => {
//  document.title += ` - ${moves} moves`;
  const okButton = gameOver.querySelector('.ok');
  const pMoves = gameOver.querySelector('.moves');
  pMoves.textContent = `You make ${moves} moves`;
  showModal();
  writeRecord();
  okButton.addEventListener('click', newGame);
}

const newGame = () => window.location.reload();

newGameButton.addEventListener('click', newGame);