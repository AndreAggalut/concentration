const SINGLE_FLIP_DURATION = 1500;
const DOUBLE_FLIP_DURATION = 700;

const faceUpCards = [];
let firstCardTimer;
let matchCount;

function startGame() {
  /* Generate array of emoji pairs in random order */
  const emojis = ['😀', '💩', '🍆', '🌮', '🔥', '💯', '🍿', '🍑'];
  const pairs = emojis.concat(...emojis);
  const shuffled = pairs.sort(() => Math.random() - 0.5);
  console.log(shuffled);

  /* Initialize score here */
  matchCount = 0;

  const cards = document.querySelectorAll('.card');

  cards.forEach((card, i) => {
    // card.innerHTML = shuffled[i];
    const sameCard = card;
    card.setAttribute('data-value', shuffled[i]);
    card.setAttribute('data-key', card.innerHTML);

    // click event listener
    card.addEventListener('click', handleCardClick);

    // // key event listener
    document.addEventListener('keydown', event => handleKeyPress(event, card));
  });
}

function handleCardClick(event) {
  // if same card is clicked twice OR at least 2 cards are already flipped up, do nothing
  if (
    faceUpCards.length >= 2 ||
    (faceUpCards.length !== 0 && event.target === faceUpCards[0])
  )
    return;

  flipFaceUp(event.target);
  // faceUpCards.push(e.target);

  if (faceUpCards.length === 1) {
    // first flipped card
    firstCardTimer = setTimeout(
      () => flipFaceDown(event.target),
      SINGLE_FLIP_DURATION
    );
  } else {
    // second flipped card

    // cancel timer for handling single card flip
    clearTimeout(firstCardTimer);
    const [card1Value, card2Value] = [
      faceUpCards[0].dataset.value,
      faceUpCards[1].dataset.value,
    ];
    const isMatch = card1Value === card2Value;
    if (isMatch) playMatchSound();
    else playNoMatchSound();

    // set new timer to show flipped up cards for short period
    setTimeout(() => {
      if (isMatch) handleCardsMatch(faceUpCards);
      else flipFaceDown(faceUpCards[0], faceUpCards[1]);
    }, DOUBLE_FLIP_DURATION);
  }
}

function handleKeyPress(event, card) {
  if (
    faceUpCards.length >= 2 ||
    (faceUpCards.length !== 0 && card === faceUpCards[0])
  )
    return;

  if (event.key.toUpperCase() === card.dataset.key) {
    flipFaceUp(card);

    if (faceUpCards.length === 1) {
      // first flipped card
      firstCardTimer = setTimeout(
        () => flipFaceDown(card),
        SINGLE_FLIP_DURATION
      );
    } else {
      // second flipped card

      // cancel timer for handling single card flip
      clearTimeout(firstCardTimer);
      // set new timer to show flipped up cards for short period
      setTimeout(() => {
        const [card1Value, card2Value] = [
          faceUpCards[0].dataset.value,
          faceUpCards[1].dataset.value,
        ];
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
  console.log('MATCHES: ', matchCount);
  cards[0].classList.add('matched');
  cards[1].classList.add('matched');
  faceUpCards.length = 0;
  playMatchSound();

  matchCount++;
  if (matchCount === 8) console.log('GAME OVER');
}

const x = document.getElementById('match');
const y = document.getElementById('nomatch');

function playMatchSound() {
  x.play();
}

function playNoMatchSound() {
  y.play();
}

startGame();
/* const startButton = document.querySelector('button');
startButton.addEventListener('click', () => startGame()); */
