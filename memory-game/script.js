let requirements = `Итоговая оценка: 60/60.
1. Вёрстка +10
  - реализован интерфейс игры +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10
3. Игра завершается, когда открыты все карточки +10
4. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10
5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10
6. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10
x7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  -x высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
`;

console.log(requirements);

let rows = 4, cols = 5;

const newGameButton = document.querySelector('.new-game');
const gameBoard = document.querySelector('.game-board');

//Array of card faces. As in future should be filled by back-end by getting the filenames of cards 
const cards = ['amazon', 'apple', 'figma',
 'google', 'instagram', 'netflix',
 'spotify', 'twitter', 'windows',
 'youtube', 'dropbox', 'discord',
 'reddit', 'skype', 'whatsapp', 'facebook'];

const getRandomPosition = all => Math.floor(Math.random() * all);

function arrangeCards(rows, cols) {
  for (let i = 0; i < rows * cols; i++) {
    const card = `<div class="memory-card" style="order: ${getRandomPosition(rows * cols)};" data-face="${cards[Math.floor(i / 2)]}">
    <img class="face" src="assets/svg/${cards[Math.floor(i / 2)]}.svg" alt="${cards[Math.floor(i / 2)]}">
    <img class="back" src="assets/svg/js.svg" alt="back">
  </div>
  `;
  gameBoard.insertAdjacentHTML('beforeend', card);
  }
}

arrangeCards(rows, cols);

let isFlippedCard = false;
let isLockedBoard = false;
let firstCard, secondCard;
let moves = 0;
let unFlipPairs = Math.floor((rows * cols) / 2);

/* Local Storage */
let recordTable = [/* 1, 34, 45, 44, 55, 45, 67, 7, 78, 90 */]; //array of 10 last games for storage in localStorage

const setLocalStorage = () => localStorage.setItem('records', JSON.stringify(recordTable));

const getLocalStorage = () => {
  if (localStorage.getItem('records')) {
    recordTable = JSON.parse(localStorage.getItem('records'));
  }
  fillRecordTable(recordTable);
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

const memoryCards = gameBoard.querySelectorAll('.memory-card');
memoryCards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  if (isLockedBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }
  this.classList.add('flip');
  if (!isFlippedCard) {
    isFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

const checkForMatch = () => (firstCard.dataset.face === secondCard.dataset.face) ? disableMatchedCards() : unFlipCards();

const disableMatchedCards = () => {
  moves++;
  unFlipPairs--;
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  if (!unFlipPairs) {
    showGameOver();
  }
  resetBoard();
}

const gameOver = document.querySelector('.game-over');
const showModal = () => gameOver.classList.add('show');

const writeRecord = () => {
  recordTable.push(moves);
  if (recordTable.length > 10) {
    recordTable.shift();
  }
}

const tableRecord = document.querySelector('.record-table');

const fillRecordTable = table => {
  for (let record of table) {
    const pRecord = `<p class="record-line">${record} moves</p>`;
    tableRecord.insertAdjacentHTML('beforeend', pRecord);
  }
}

const tableRecordsButton = document.querySelector('.table-of-records');
const mainContainer = document.querySelector('.main-container');

const toggleOpen = () => {
  tableRecord.classList.toggle('open');
  mainContainer.classList.toggle('open');
}

tableRecordsButton.addEventListener('click', toggleOpen);

const showGameOver = () => {
  document.title += ` - ${moves} moves`;
  const okButton = gameOver.querySelector('.ok');
  const pMoves = gameOver.querySelector('.moves');
  pMoves.textContent = `You make ${moves} moves`;
  showModal();
  writeRecord();
  okButton.addEventListener('click', newGame);
}

const newGame = () => window.location.reload();

const unFlipCards = () => {
  isLockedBoard = true;
  setTimeout(() => {
    moves++;
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');  
    resetBoard();
  }, 1000);
}

const resetBoard = () => {
  [isFlippedCard, isLockedBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

newGameButton.addEventListener('click', newGame);