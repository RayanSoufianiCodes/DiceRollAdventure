// Save Data
let data = JSON.parse(localStorage.getItem('diceGameSave')) || {
    rollCount: 0,
    diceCoins: 0,
    crystals: []
};

const dice = document.getElementById('dice');
const rollButton = document.getElementById('roll-button');
const rollCountDisplay = document.getElementById('roll-count');
const diceCoinsDisplay = document.getElementById('dice-coins');
const crystalsDisplay = document.getElementById('crystals');
const buyCrateButton = document.getElementById('buy-crate');
const crateOpening = document.getElementById('crate-opening');
const crateAnimation = document.getElementById('crate-animation');

const crystalsList = [
    "Ruby", "Sapphire", "Emerald", "Amethyst", "Topaz", "Diamond",
    "Onyx", "Opal", "Garnet", "Quartz", "Obsidian", "Moonstone",
    "Citrine", "Peridot", "Aquamarine"
];

function saveGame() {
    localStorage.setItem('diceGameSave', JSON.stringify(data));
}

function updateUI() {
    rollCountDisplay.textContent = data.rollCount;
    diceCoinsDisplay.textContent = data.diceCoins;
    crystalsDisplay.textContent = data.crystals.length > 0 ? data.crystals.join(", ") : "None";
}

function rollDice() {
    dice.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        dice.style.transform = 'rotate(0deg)';
    }, 500);
}

rollButton.addEventListener('click', () => {
    rollDice();
    data.rollCount++;
    let diceValue = Math.floor(Math.random() * 6) + 1;
    dice.textContent = getDiceEmoji(diceValue);

    let coinsEarned = Math.floor(Math.random() * 5) + 1; 
    data.diceCoins += coinsEarned;

    if (Math.random() < 0.02) { 
        let randomCrystal = crystalsList[Math.floor(Math.random() * crystalsList.length)];
        if (!data.crystals.includes(randomCrystal)) {
            data.crystals.push(randomCrystal);
            alert(`🎉 You found a ${randomCrystal} Crystal!`);
        }
    }

    updateUI();
    saveGame();
});

function getDiceEmoji(number) {
    const diceEmojis = ["🎲", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return diceEmojis[number];
}

buyCrateButton.addEventListener('click', () => {
    if (data.diceCoins >= 50) {
        data.diceCoins -= 50;
        openCrate();
        updateUI();
        saveGame();
    } else {
        alert("Not enough Dice Coins!");
    }
});

function openCrate() {
    crateOpening.classList.remove('hidden');
    crateAnimation.innerHTML = "";

    let crateItems = [];
    for (let i = 0; i < 20; i++) {
        let crystal = crystalsList[Math.floor(Math.random() * crystalsList.length)];
        crateItems.push(`<span style="margin: 0 10px;">💎${crystal}</span>`);
    }
    crateAnimation.innerHTML = crateItems.join("");

    setTimeout(() => {
        crateOpening.classList.add('hidden');
        let reward = crystalsList[Math.floor(Math.random() * crystalsList.length)];
        if (!data.crystals.includes(reward)) {
            data.crystals.push(reward);
            alert(`🔓 You unlocked a ${reward} from the crate!`);
        } else {
            data.diceCoins += 25;
            alert(`Duplicate! You get 25 Dice Coins back!`);
        }
        updateUI();
        saveGame();
    }, 3000);
}

updateUI();
