const SINGLE_FLIP_DURATION = 1500;
const DOUBLE_FLIP_DURATION = 400;
const KEYS = ['1', '2', '3', '4', 'Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];
const EMOJIS = ['😀', '💩', '🍆', '🌮', '🔥', '💯', '🍿', '🍑'];

const faceUpCards = [];
let firstCardTimer;
let matchCount;

function handleButtonClick() {
  startGame();

  document.getElementById('control').classList.toggle('hidden');
  document.getElementById('board').classList.toggle('hidden');
  document.getElementById('start-button').innerHTML = 'RESTART';
}

function startGame() {
  /* Generate array of emoji pairs in random order */
  const pairs = EMOJIS.concat(...EMOJIS);
  const shuffled = pairs.sort(() => Math.random() - 0.5);
  console.log(shuffled);

  /* Initialize score */
  matchCount = 0;

  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.setAttribute('data-value', shuffled[i]);
    card.setAttribute('data-key', KEYS[i]);
    card.innerHTML = KEYS[i];
    card.classList.remove('matched');
    card.classList.add('face-down');

    // attach click and key event listeners
    card.addEventListener('click', event => handleInput(event, card));
    document.addEventListener('keydown', event => handleInput(event, card));
  });
}

function handleInput(event, card) {
  // do nothing if already two cards flipped up OR same card is doubleclicked
  if (faceUpCards.length >= 2 || (faceUpCards.length !== 0 && card === faceUpCards[0])) return;

  if (event.type === 'click' || event.key.toUpperCase() === card.dataset.key) {
    flipFaceUp(card);

    if (faceUpCards.length === 1) {
      // for first flipped card
      firstCardTimer = setTimeout(() => flipFaceDown(card), SINGLE_FLIP_DURATION);
    } else {
      // for second flipped card

      // cancel timer for handling single card flip
      clearTimeout(firstCardTimer);
      // start a new timer to show flipped up cards for short period
      setTimeout(() => {
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
}

function handleCardsMatch(cards) {
  cards[0].classList.add('matched');
  cards[1].classList.add('matched');
  faceUpCards.length = 0;

  matchCount++;
  if (matchCount === 8) handleWin();
}

function handleWin() {
  document.getElementById('control').classList.toggle('hidden');
  document.getElementById('board').classList.toggle('hidden');
}

// startGame();
/* const startButton = document.querySelector('button');
startButton.addEventListener('click', () => startGame()); */
