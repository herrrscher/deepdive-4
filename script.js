 let balance = 1000;
        let debt = 0;
        let days = 0;
        let overdue = false;
        let lossCount = 0;
        const symbols = ['🍒', '🍋', '🍉', '🍊', '⭐', '💎'];
        let organs = {
            "Kidney": { price: 500, sold: false },
            "Liver": { price: 1000, sold: false },
            "Heart": { price: 5000, sold: false },
            "Lung": { price: 3000, sold: false },
            "Eye": { price: 800, sold: false },
            "Pancreas": { price: 2500, sold: false }
        };

        function updateDisplay() {
            document.getElementById("balance").innerText = `Balance: $${balance}`;
            document.getElementById("debt").innerText = `Debt: $${debt}`;
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
            if (balance < 100) {
                alert("Not enough money for fast spin!");
                return; 
            }
            balance -= 1000;
            spinReels(100);
            days++;
            checkDebtGrowth();
            updateDisplay();
        }

        function spinReels(bet) {
            const slot1 = document.getElementById("slot1");
            const slot2 = document.getElementById("slot2");
            const slot3 = document.getElementById("slot3");
            
            slot1.classList.add("spinning");
            slot2.classList.add("spinning");
            slot3.classList.add("spinning");

            setTimeout(() => {
                slot1.classList.remove("spinning");
                slot2.classList.remove("spinning");
                slot3.classList.remove("spinning");
                
                const newSlot1 = symbols[Math.floor(Math.random() * symbols.length)];
                const newSlot2 = symbols[Math.floor(Math.random() * symbols.length)];
                const newSlot3 = symbols[Math.floor(Math.random() * symbols.length)];
                
                slot1.innerText = newSlot1;
                slot2.innerText = newSlot2;
                slot3.innerText = newSlot3;
                
                let winnings = 0;
                if (newSlot1 === newSlot2 && newSlot2 === newSlot3) {
                    winnings = bet * 10;
                } else if (newSlot1 === newSlot2 || newSlot2 === newSlot3 || newSlot1 === newSlot3) {
                    winnings = bet * [2, 4, 6, 8][Math.floor(Math.random() * 4)];
                }
                
                if (winnings > 0) {
                    balance += winnings;
                    alert(`You won $${winnings}!`);
                    lossCount = 0;
                } else {
                    lossCount++;
                }
                
                if (lossCount >= 10) {
                    alert("Maybe next time...");
                    lossCount = 0;
                }
                updateDisplay();
            }, 500);
        }

        function borrowMoney() {
            let amount = parseInt(prompt("Enter amount to borrow:"));
            if (isNaN(amount) || amount <= 0) {
                alert("Invalid amount!");
                return;
            }
            balance += amount;
            debt += amount;
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