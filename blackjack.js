let deck = [];
let playerHand = [];
let dealerHand = [];
let balance = 100;
let currentBet = 10;

function createDeck() {
  const suits = ['S', 'H', 'D', 'C'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  deck = [];

  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }

  deck.sort(() => Math.random() - 0.5); // shuffle
}

function cardImage(card) {
  return `<img class="card" src="cards/${card.value}${card.suit}.png">`;
}

function formatHand(hand) {
  return hand.map(card => cardImage(card)).join('');
}

function getCardValue(card) {
  if (['K', 'Q', 'J'].includes(card.value)) return 10;
  if (card.value === 'A') return 11;
  return parseInt(card.value);
}

function calculateHandValue(hand) {
  let value = 0;
  let aces = 0;

  for (let card of hand) {
    value += getCardValue(card);
    if (card.value === 'A') aces++;
  }

  while (value > 21 && aces) {
    value -= 10;
    aces--;
  }

  return value;
}

function updateBalanceDisplay() {
  document.getElementById('balance').textContent = `Balance: $${balance}`;
}

function loadStats() {
  balance = parseInt(localStorage.getItem("balance")) || 100;
  updateBalanceDisplay();
}

function saveStats() {
  localStorage.setItem("balance", balance);
}

function displayHands(showDealer = false) {
  const playerTotal = calculateHandValue(playerHand);
  const dealerTotal = calculateHandValue(dealerHand);

  document.getElementById('gameArea').innerHTML = `
    <p><strong>Player Hand:</strong> ${formatHand(playerHand)} (Total: ${playerTotal})</p>
    <p><strong>Dealer Hand:</strong> ${formatHand(showDealer ? dealerHand : [dealerHand[0], { value: '?', suit: '?' }])}
      ${showDealer ? `(Total: ${dealerTotal})` : ''}</p>
    <div id="controls">
      <button onclick="hit()">Hit</button>
      <button onclick="stand()">Stand</button>
      <button onclick="startGame()">Restart</button>
    </div>
    <p id="result"></p>
  `;
}

function startGame() {
  loadStats();
  currentBet = parseInt(document.getElementById('bet').value) || 10;

  if (currentBet > balance) {
    alert("Not enough balance!");
    return;
  }

  createDeck();
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];

  displayHands();
  document.getElementById('result').textContent = '';
}

function hit() {
  playerHand.push(deck.pop());
  const value = calculateHandValue(playerHand);

  if (value > 21) {
    endGame("Player busts! Dealer wins.");
  } else {
    displayHands();
  }
}

function stand() {
  while (calculateHandValue(dealerHand) < 17) {
    dealerHand.push(deck.pop());
  }

  const playerTotal = calculateHandValue(playerHand);
  const dealerTotal = calculateHandValue(dealerHand);

  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    endGame("Player wins!");
  } else if (playerTotal < dealerTotal) {
    endGame("Dealer wins.");
  } else {
    endGame("It's a tie!");
  }
}

function endGame(message) {
  displayHands(true);

  if (message.includes("Player wins")) {
    balance += currentBet;
  } else if (message.includes("Dealer wins") || message.includes("busts")) {
    balance -= currentBet;
  }

  saveStats();
  updateBalanceDisplay();

  document.getElementById('result').textContent = `${message} You ${
    message.includes("Player wins") ? "won" :
    message.includes("tie") ? "tied" : "lost"
  } $${currentBet}`;

  document.getElementById('controls').innerHTML = `<button onclick="startGame()">Play Again</button>`;
}

startGame();
