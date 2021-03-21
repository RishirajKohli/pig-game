'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let playerScores, currentPlayer, currentPlayerScore;
let playing;

//initialise app state and UI
let init = function () {
  playing = true;
  playerScores = [0, 0];
  currentPlayer = 0;

  currentPlayerScore = 0;
  score0El.textContent = playerScores[0];
  score1El.textContent = playerScores[1];
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner', 'player--active');
  player0El.classList.add('player--active');
  diceEL.classList.add('hidden');
};

init();

function switchPlayer(currentPlayerEl) {
  currentPlayerEl.classList.remove('player--active');
  currentPlayerScore = 0;
  currentPlayerEl.querySelector(
    '.current-score'
  ).textContent = currentPlayerScore;

  //Switch player
  currentPlayer = Number(!currentPlayer);
  currentPlayerEl = document.querySelector(`.player--${currentPlayer}`);
  currentPlayerEl.classList.add('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `images/dice-${dice}.png`;
    let currentPlayerEl = document.querySelector(`.player--${currentPlayer}`);

    if (dice === 1) {
      switchPlayer(currentPlayerEl);
    } else {
      currentPlayerScore += dice;
      currentPlayerEl.querySelector(
        '.current-score'
      ).textContent = currentPlayerScore;
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    playerScores[currentPlayer] += currentPlayerScore;
    let currentPlayerEl = document.querySelector(`.player--${currentPlayer}`);
    document.getElementById(`score--${currentPlayer}`).textContent =
      playerScores[currentPlayer];

    if (playerScores[currentPlayer] >= 100) {
      currentPlayerEl.classList.add('player--winner');
      currentPlayerEl.firstElementChild.textContent = `Player ${
        currentPlayer + 1
      } Wins! 🎉`;
      currentPlayerEl.querySelector('.current-score').textContent = 0;
      diceEL.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer(currentPlayerEl);
    }
  }
});
btnNew.addEventListener('click', function () {
  let currentPlayerEl = document.querySelector(`.player--${currentPlayer}`);
  currentPlayerEl.firstElementChild.textContent = `Player ${currentPlayer + 1}`;

  init();
});
