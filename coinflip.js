let balance = 1000;
let debt = 0;
let selectedChoice = null;

function updateDisplay() {
  document.getElementById("balance").innerText = `Balance: $${balance}`;
  document.getElementById("debt").innerText = `Debt: $${debt}`;
}

function selectChoice(choice) {
  selectedChoice = choice;
  document.getElementById("btn-heads").classList.remove("selected");
  document.getElementById("btn-tails").classList.remove("selected");
  document.getElementById("btn-" + choice).classList.add("selected");
}

function flipCoin() {
  const betInput = document.getElementById("amount");
  const bet = parseInt(betInput.value);
  const coinImg = document.getElementById("coin-img"); // <-- één keer declareren

  if (isNaN(bet) || bet <= 0 || bet > balance) {
    alert("Voer een geldig bedrag in!");
    return;
  }

  if (!selectedChoice) {
    alert("Kies eerst heads of tails!");
    return;
  }

  balance -= bet;

  // Flip animatie
  coinImg.classList.remove("flip");
  void coinImg.offsetWidth; // force reflow
  coinImg.classList.add("flip");

setTimeout(() => {
  const result = Math.random() < 0.5 ? "heads" : "tails";

  // Correct pad gebruiken voor afbeelding
  const imageFile = result === "heads" ? "head.png" : "tail.png";
  coinImg.src = `images/${imageFile}`;
  coinImg.alt = result;

  if (selectedChoice === result) {
    balance += bet * 2;
    alert(`✅ Je hebt gewonnen! Het was ${result}.`);
  } else {
    alert(`❌ Je hebt verloren. Het was ${result}.`);
  }

  updateDisplay();
}, 1000);
};
updateDisplay();
