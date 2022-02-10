let requirements = `Итоговая оценка: 10/60.
1. Вёрстка +10
  - реализован интерфейс игры +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
x2. Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10
x3. Игра завершается, когда открыты все карточки +10
x4. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10
x5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10
x6. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10
x7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  -x высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
`;

console.log(requirements);

const gameBoard = document.querySelector('.game-board');

function arrangeCards(rows, cols) {
  for (let i = 0; i < rows * cols; i++) {
    const card = `<div class="memory-card">
    <img class="face" src="assets/svg/${Math.floor(i / 2)}.svg" alt="face ${Math.floor(i / 2)}">
    <img class="back" src="assets/svg/digits.svg" alt="back digits">
  </div>
  `;
  gameBoard.insertAdjacentHTML('beforeend', card);
  }
}

arrangeCards(4, 5);

const memoryCards = gameBoard.querySelectorAll('.memory-card');

function flipCard() {
  this.classList.toggle('flip');
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));