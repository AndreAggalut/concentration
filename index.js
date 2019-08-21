const faceUpCards = [];

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

function handleCardClick(event) {
  // if at least 2 cards are already flipped up, do nothing
  if (faceUpCards.length >= 2) return;

  flipFaceUp(this);
  this.disabled = true;
  const cardValue = this.dataset.value;
  faceUpCards.push(cardValue);

  if (faceUpCards.length === 1) {
    setTimeout(() => {
      flipFaceDown(this);
      this.removeAttribute('disabled');
      faceUpCards.length = 0;
    }, 2000);
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

function flipFaceDown(card) {
  card.classList.toggle('face-down');
  card.innerHTML = card.dataset.key;
}

startGame();
/* const startButton = document.querySelector('button');
startButton.addEventListener('click', () => startGame()); */
