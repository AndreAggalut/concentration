const SINGLE_FLIP_DURATION = 1500;
const DOUBLE_FLIP_DURATION = 700;

const faceUpCards = [];
let firstCardTimer;

function startGame() {
  /* Generate array of emoji pairs in random order */
  const emojis = ['😀', '💩', '🍆', '🌮', '🔥', '💯', '🍿', '🍑'];
  const pairs = emojis.concat(...emojis);
  const shuffled = pairs.sort(() => Math.random() - 0.5);
  console.log(shuffled);

  /* Initialize score */
  const matchCount = 0;

  const cards = document.querySelectorAll('.card');

  cards.forEach((card, i) => {
    // card.innerHTML = shuffled[i];
    const sameCard = card;
    card.setAttribute('data-value', shuffled[i]);
    card.setAttribute('data-key', card.innerHTML);

    // click event listener
    card.addEventListener('click', handleCardClick);

    // // key event listener
    // document.addEventListener('keydown', (event, sameCard) => handleCardKeydown(event, sameCard));
  });
}

function handleCardClick(e) {
  // if at least 2 cards are already flipped up, do nothing
  if (faceUpCards.length >= 2) return;

  flipFaceUp(e.target);
  // this.disabled = true;
  faceUpCards.push(e.target);

  if (faceUpCards.length === 1) {
    // first flipped card
    firstCardTimer = setTimeout(() => flipFaceDown(e.target), SINGLE_FLIP_DURATION);
  } else {
    // second flipped card
    clearTimeout(firstCardTimer);
    setTimeout(() => {
      const [card1, card2] = [faceUpCards[0].dataset.value, faceUpCards[1].dataset.value];
      // console.log(card1, card2);
      if (card1 === card2) {
        handleMatch(faceUpCards);
        flipFaceDown(faceUpCards[0], faceUpCards[1]);
        faceUpCards.length = 0;
      } else {
        flipFaceDown(faceUpCards[0], faceUpCards[1]);
      }
    }, DOUBLE_FLIP_DURATION);
  }
}

/* function handleCardKeydown(event, card) {
  console.log(event);
  console.log(card);
  if (event.key.toUpperCase() === card.dataset.key) {
    flipFaceUp(card);
    setTimeout(() => {
      flipFaceDown(card);
    }, 2000);
  }
} */

function flipFaceUp(card) {
  card.classList.toggle('face-down');
  card.innerHTML = card.dataset.value;
}

function flipFaceDown(...cards) {
  cards.forEach(card => {
    card.classList.toggle('face-down');
    card.innerHTML = card.dataset.key;
    card.removeAttribute('disabled');
  });
  faceUpCards.length = 0;
}

function handleMatch(args) {
  console.log('handleMatch args: ', args);
  console.log('MATCH!');
}

startGame();
/* const startButton = document.querySelector('button');
startButton.addEventListener('click', () => startGame()); */
