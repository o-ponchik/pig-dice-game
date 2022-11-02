'use strict';

const diceImg = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const scorePlayer1 = document.getElementById(`score--0`);
const scorePlayer2 = document.getElementById(`score--1`);
const currentPlayer1 = document.querySelector('#current--0');
const currentPlayer2 = document.querySelector('#current--1');
let currentScore = 0;

let scores, playing;
let activePlayer = 0;

let randomDiceNumber = Math.trunc(Math.random() * 6 + 1);

function startGame() {
  scores = [0, 0];
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  diceImg.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  currentScore = 0;

  playing = true;
}

startGame();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

function playGame() {
  if (playing) {
    // random number
    randomDiceNumber = Math.trunc(Math.random() * 6 + 1);
    diceImg.classList.remove('hidden');
    //dice img related to rendom number
    diceImg.src = `dice-${randomDiceNumber}.png`;

    if (randomDiceNumber !== 1) {
      currentScore += randomDiceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
}

function holdScore() {
  if (playing) {
    //1. add current score to active player`s score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // scores[1] = scores[1] + currentScore
    //2. check if score >=100
    if (scores[activePlayer] >= 20) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceImg.classList.add('hidden');
    } else {
      //3. finish the game if score >=100 or switch player
      switchPlayer();
    }
  }
}

btnRollDice.addEventListener('click', playGame);

btnHold.addEventListener('click', holdScore);

btnNewGame.addEventListener('click', startGame);
