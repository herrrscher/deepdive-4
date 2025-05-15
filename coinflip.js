const coinEl = document.getElementById('coin');
const imgEl  = document.getElementById('coin-img');
const btn    = document.getElementById('flip-btn');

btn.addEventListener('click', () => {
  // Reset flip-animatie
  coinEl.classList.remove('flip');
  void coinEl.offsetWidth;
  coinEl.classList.add('flip');

  // Na de animatie: wissel plaatje
  setTimeout(() => {
    const isHeads = Math.random() < 0.5;
    imgEl.src = isHeads ? 'images/head.png' : 'images/tail.png';
    imgEl.alt = isHeads ? 'Heads' : 'Tails';
  }, 1000);
});
