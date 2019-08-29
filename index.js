const SINGLE_FLIP_DURATION = 1500;
const DOUBLE_FLIP_DURATION = 400;
const NUM_PAIRS = 8;
const KEYS = ['1', '2', '3', '4', 'Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];
const EMOJIS = ['😀', '💩', '🍆', '🌮', '🔥', '💯', '🍿', '🍑'];

const faceUpCards = [];
let matchedCount;
let totalTime;
let gameTimer;
let bestTime = Infinity;

function handleStartButtonClick() {
  startGame();

  toggleHidden('display-panel');
  toggleHidden('cards');
  if (bestTime !== Infinity) toggleHidden('best-time');
  document.getElementById('timer').classList.remove('hidden');
  document.getElementById('start-button').innerHTML = 'RESTART';
}

function startGame() {
  /* Generate array of emoji pairs in random order */
  const pairs = EMOJIS.concat(...EMOJIS);
  const shuffled = pairs.sort(() => Math.random() - 0.5);

  /* Reset */
  matchedCount = 0;
  totalTime = 0;

  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    // assign values to cards and set face down
    card.setAttribute('data-value', shuffled[i]);
    card.setAttribute('data-key', KEYS[i]);
    card.innerHTML = KEYS[i];
    card.classList.remove('matched');
    card.classList.add('face-down');

    // attach click and key event listeners
    card.addEventListener('click', event => handleInput(event, card));
    document.addEventListener('keydown', event => handleInput(event, card));
  });

  startTimer();
}

function handleInput(event, card) {
  // do nothing if already two cards flipped up OR same card is doubleclicked
  if (faceUpCards.length >= 2 || (faceUpCards.length !== 0 && card === faceUpCards[0])) return;

  if (event.type === 'click' || event.key.toUpperCase() === card.dataset.key) {
    if (!card.classList.contains('matched')) playFlipSound();
    flipFaceUp(card);

    let firstCardTimer;
    if (faceUpCards.length === 1) {
      // if first flipped card
      firstCardTimer = setTimeout(() => flipFaceDown(card), SINGLE_FLIP_DURATION);
    } else {
      // if second flipped card

      // cancel timer for handling single card flip
      clearTimeout(firstCardTimer);
      // start a new timer to show flipped up cards for short period
      setTimeout(() => {
        // compare card values
        const [card1Value, card2Value] = [faceUpCards[0].dataset.value, faceUpCards[1].dataset.value];
        if (card1Value === card2Value) handleCardsMatch(faceUpCards);
        else flipFaceDown(faceUpCards[0], faceUpCards[1]);
      }, DOUBLE_FLIP_DURATION);
    }
  }
}

function flipFaceUp(card) {
  card.classList.toggle('face-down');
  card.innerHTML = card.dataset.value;
  faceUpCards.push(card);
}

function flipFaceDown(...cards) {
  cards.forEach(card => {
    card.classList.toggle('face-down');
    card.innerHTML = card.dataset.key;
  });
  faceUpCards.length = 0;
  playNoMatchSound();
}

function handleCardsMatch(cards) {
  cards[0].classList.add('matched');
  cards[1].classList.add('matched');
  faceUpCards.length = 0;
  playMatchSound();

  matchedCount++;
  if (matchedCount === NUM_PAIRS) handleWin();
}

function handleWin() {
  playWinSounds();
  stopTimer();
  if (bestTime > totalTime) bestTime = totalTime;
  document.getElementById('best-time').innerHTML = `Best Time ${formatTime(bestTime)}`;

  toggleHidden('display-panel');
  toggleHidden('cards');
  toggleHidden('best-time');
}

function startTimer() {
  const startTime = Date.now();
  gameTimer = setInterval(() => {
    const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
    totalTime = secondsElapsed;
    document.getElementById('timer').innerHTML = `Time ${formatTime(secondsElapsed)}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(gameTimer);
}

function formatTime(sec) {
  const [minutes, seconds] = [Math.floor(sec / 60), sec % 60];
  return `${minutes || ''}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function toggleHidden(id) {
  document.getElementById(id).classList.toggle('hidden');
}

/* SOUNDS */
function playMatchSound() {
  document.getElementById('match-sound').play();
}
function playNoMatchSound() {
  document.getElementById('nomatch-sound').play();
}
function playFlipSound() {
  document.getElementById('flip-sound').play();
}
function playWinSounds() {
  document.getElementById('win').play();
}
