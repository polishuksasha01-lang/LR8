const userNameEl = document.querySelector('#userName');
const userScoreEl = document.querySelector('#userScore');
const computerScoreEl = document.querySelector('#computerScore');
const userNumberEl = document.querySelector('#userNumber');
const computerNumberEl = document.querySelector('#computerNumber');
const generateBtn = document.querySelector('#generateBtn');
const messageEl = document.querySelector('.message');
const centerEl = document.querySelector('.center');

const WIN_SCORE = 3;
let userScore = 0;
let computerScore = 0;

const getRandom = () => Math.floor(Math.random() * 10) + 1;

const askName = () => {
  let name = prompt("Введіть ваше ім'я (2-15 символів):");
  while (name === null || name.trim().length < 2 || name.trim().length > 15) {
    name = prompt("Некоректне ім'я! Введіть від 2 до 15 символів:");
  }
  return name.trim();
};

userNameEl.textContent = askName();

const clearColors = () => {
  userNumberEl.classList.remove('win', 'lose');
  computerNumberEl.classList.remove('win', 'lose');
};

const endGame = (winnerName) => {
  messageEl.textContent = 'Гру завершено! Переміг ' + winnerName;
  generateBtn.setAttribute('disabled', '');

  const restartBtn = document.createElement('button');
  restartBtn.appendChild(document.createTextNode('Грати знову'));
  restartBtn.classList.add('restart');

  restartBtn.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    userScoreEl.textContent = 0;
    computerScoreEl.textContent = 0;
    userNumberEl.textContent = '?';
    computerNumberEl.textContent = '?';
    clearColors();
    messageEl.textContent = 'Натисни Generate';
    generateBtn.removeAttribute('disabled');
    restartBtn.remove();
  });

  centerEl.append(restartBtn);
};

generateBtn.addEventListener('click', () => {
  const userNumber = getRandom();
  const computerNumber = getRandom();

  userNumberEl.textContent = userNumber;
  computerNumberEl.textContent = computerNumber;
  clearColors();

  if (userNumber > computerNumber) {
    userScore++;
    userScoreEl.textContent = userScore;
    userNumberEl.classList.add('win');
    computerNumberEl.classList.add('lose');
    messageEl.textContent = 'Цей раунд виграв ' + userNameEl.textContent;
  } else if (computerNumber > userNumber) {
    computerScore++;
    computerScoreEl.textContent = computerScore;
    computerNumberEl.classList.add('win');
    userNumberEl.classList.add('lose');
    messageEl.textContent = 'Цей раунд виграв Computer';
  } else {
    messageEl.textContent = 'Нічия! Числа однакові, спробуй ще раз';
  }

  if (userScore === WIN_SCORE) {
    endGame(userNameEl.textContent);
  } else if (computerScore === WIN_SCORE) {
    endGame('Computer');
  }
});
