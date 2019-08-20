const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const emojis = ['😀', '💩', '🍆', '🌮', '🔥', '💯', '🍿', '🍑'];
const pairs = emojis.concat(...emojis);
const shuffled = pairs.sort(() => Math.random() - 0.5);
console.log(shuffled);
const cards = document.querySelectorAll('.card');

// document.addEventListener('keydown', event => console.log(event));

cards.forEach((card, i) => {
  // card.innerHTML = shuffled[i];
  card.setAttribute('data-value', shuffled[i]);
  card.setAttribute('data-key', card.innerHTML);

  // click event listener
  card.addEventListener('click', () => {
    /*     card.classList.toggle('face-down');
    card.innerHTML = card.dataset.value;
    console.log(card.innerHTML); */
    flipFaceUp(card);
    setTimeout(() => {
      flipFaceDown(card);
    }, 1500);
  });

  // key event listener
  document.addEventListener('keydown', event => {
    if (event.key.toUpperCase() === card.dataset.key) {
      console.log('event.key:', event.key);
      console.log('dataset:', card.dataset.key.toUpperCase());
      flipFaceUp(card);
      setTimeout(() => {
        flipFaceDown(card);
      }, 1500);
    }
  });
});

function flipFaceUp(card) {
  card.classList.toggle('face-down');
  card.innerHTML = card.dataset.value;
  console.log(card.innerHTML);
}

function flipFaceDown(card) {
  card.classList.toggle('face-down');
  card.innerHTML = card.dataset.key;
}
