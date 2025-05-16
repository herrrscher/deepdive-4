let balance = 1000;
let debt = 0;
let days = 0;
let overdue = false;
let lossCount = 0;
const symbols = ['🍒', '🍋', '🍉', '🍊', '⭐', '💎', '💀', '😭'];
const historyLog = [];

const winSound = new Audio('win.mp3');
const loseSound = new Audio('lose.mp3');
const gameOverSound = new Audio('gameover.mp3');

function updateDisplay() {
    document.getElementById("balance").innerText = `Balance: $${balance}`;
    document.getElementById("debt").innerText = `Debt: $${debt}`;
    updateHistory();
}

function updateHistory() {
    const log = document.getElementById("historyLog");
    log.innerHTML = historyLog.slice(-10).reverse().map(entry => `<li>${entry}</li>`).join('');
}

function spinSlot() {
    let bet = parseInt(prompt("Enter your bet amount:"));
    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert("Invalid bet amount!");
        return;
    }
    balance -= bet;
    spinReels(bet);
    days++;
    checkDebtGrowth();
    updateDisplay();
}

function fastSpin() {
    const bet = 100;
    if (balance < bet) {
        alert("Not enough money for fast spin!");
        return;
    }
    balance -= bet;
    spinReels(bet);
    days++;
    checkDebtGrowth();
    updateDisplay();
}

function spinReels(bet) {
    const slots = [
        document.getElementById("slot1"),
        document.getElementById("slot2"),
        document.getElementById("slot3"),
        document.getElementById("slot4"),
        document.getElementById("slot5")
    ];

    slots.forEach(slot => slot.classList.add("spinning"));

    setTimeout(() => {
        slots.forEach(slot => slot.classList.remove("spinning"));

        const results = slots.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
        results.forEach((sym, i) => slots[i].innerText = sym);

        const unique = new Set(results);
        const skulls = results.filter(s => s === '💀').length;

        let winnings = 0;
        let resultMsg = "";

        if (skulls >= 3) {
            gameOverSound.play();
            alert("💀💀💀 Too many skulls! Game Over.");
            balance -= 1000;
            debt += 500;
            lossCount = 0;
            resultMsg = "Game Over 💀💀💀";
        } else if (skulls > 0) {
            balance -= skulls * 50;
            resultMsg = `Penalty: ${skulls}💀 (-$${skulls * 50})`;
        }

        if (unique.size === 1) {
            winnings = bet * 20;
            balance += winnings;
            resultMsg = `JACKPOT! 🎉 +$${winnings}`;
            winSound.play();
            lossCount = 0;
        } else if (unique.size <= 3 && skulls < 3) {
            winnings = bet * [2, 4, 6, 10][Math.floor(Math.random() * 4)];
            balance += winnings;
            resultMsg = `Win! +$${winnings}`;
            winSound.play();
            lossCount = 0;
        } else if (skulls < 3 && winnings === 0) {
            resultMsg = "You lost.";
            loseSound.play();
            lossCount++;
        }

        if (lossCount >= 10) {
            alert("Maybe next time...");
            lossCount = 0;
        }

        historyLog.push(`${new Date().toLocaleTimeString()} — ${resultMsg}`);
        updateDisplay();
    }, 500);
}

function borrowMoney() {
    let amount = parseInt(prompt("Enter amount to borrow (Max total debt: $5000):"));
    if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount!");
        return;
    }
    if (debt + amount > 5000) {
        alert("Borrowing denied! You can't owe more than $5000.");
        return;
    }
    balance += amount;
    debt += amount * 1.10;
    overdue = false;
    days = 0;
    updateDisplay();
}



function checkDebtGrowth() {
    if (debt > 0) {
        if (days >= 5 && !overdue) {
            alert("Debt is now overdue! It will start doubling.");
            overdue = true;
        } else if (overdue && days >= 10) {
            debt *= 2;
            alert(`Your debt has doubled! New debt: $${debt}`);
        }
    }
}

function repayDebt() {
    if (balance >= debt) {
        balance -= debt;
        debt = 0;
        overdue = false;
        days = 0;
        alert("Debt fully repaid!");
    } else {
        alert("Not enough money to fully repay the debt!");
    }
    updateDisplay();
}

updateDisplay();


document.getElementById('testLogin').addEventListener('click', async () => {
    const response = await fetch('login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'test@example.com',
            password: '123test123'
        })
    })
    console.log(response);
    const data = await response.json()
    console.log(data);
    
})