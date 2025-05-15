function flipCoin() {
  const coin = document.getElementById('coin');
  coin.classList.remove('flip');
  void coin.offsetWidth;
  coin.classList.add('flip');

  setTimeout(() => {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    coin.textContent = result;
  }, 1000);
}
