'use strict';

//Selecting elements
const players = document.querySelectorAll('.player');
const btn = document.querySelectorAll('.btn');
const currentScore = document.querySelectorAll('.current-score');
const score = document.querySelectorAll('.score');
const diceEl = document.querySelector('.dice');

let currentPlayer = 0;

InitialSetup();

// Initial Setup
function InitialSetup() {
  score[0].textContent = 0;
  score[1].textContent = 0;
  currentScore[0].textContent = 0;
  currentScore[1].textContent = 0;
  diceEl.classList.add('hidden');
  players[0].classList.add('player--active');
  players[1].classList.remove('player--active');
  players[currentPlayer].classList.remove('player--winner');
  currentPlayer = 0;
  btn[1].classList.remove('hidden');
  btn[2].classList.remove('hidden');
}

function switchPlayer() {
  players[currentPlayer].classList.toggle('player--active');
  currentPlayer = currentPlayer == 0 ? 1 : 0;
  players[currentPlayer].classList.toggle('player--active');
}

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', function () {
    if (btn[i].classList.contains('btn--roll')) {
      const diceVal = Math.floor(Math.random() * 6 + 1);
      diceEl.classList.remove('hidden');
      diceEl.setAttribute('src', `dice-${diceVal}.png`);
      console.log(diceVal);

      if (diceVal == 1) {
        currentScore[currentPlayer].textContent = 0;
        switchPlayer();
      } else {
        currentScore[currentPlayer].textContent =
          Number(currentScore[currentPlayer].textContent) + Number(diceVal);
      }
    } else if (btn[i].classList.contains('btn--new')) {
      InitialSetup();
    } else if (btn[i].classList.contains('btn--hold')) {
      score[currentPlayer].textContent =
        Number(score[currentPlayer].textContent) +
        Number(currentScore[currentPlayer].textContent);
      if (score[currentPlayer].textContent >= 100) {
        prompt(`Player ${currentPlayer + 1} wins!`);
        players[currentPlayer].classList.toggle('player--winner');
        players[currentPlayer].classList.toggle('player--active');
        btn[1].classList.add('hidden');
        btn[2].classList.add('hidden');
        diceEl.classList.add('hidden');
      } else switchPlayer();
    }
  });
}
