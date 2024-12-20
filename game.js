const die1 = document.querySelector('#die1');
const die2 = document.querySelector('#die2');
const rollButton = document.querySelector('#roll');
const individualButton = document.querySelector('#individualDice');
const sumButton = document.querySelector('#sumOfDice');
const endTurnButton = document.querySelector('#endTurn');
const startButton = document.querySelector('#startGame');
const player1Input = document.querySelector('#player1Name');
const player2Input = document.querySelector('#player2Name');
const boxes = new Array(10).fill(0);

let currentPlayer = 1;
let currentRound = 1;
let die1Value = 0;
let die2Value = 0;
let player1Points = 0;
let player2Points = 0;
let player1Name = '';
let player2Name = '';

// Event
startButton.addEventListener('click', () => {
 player1Name = player1Input.value.trim();
  player2Name = player2Input.value.trim();

 if (!player1Name || !player2Name) {
     alert('Please enter names for both players.');
       player1Input.focus();
       return;
   }

   document.querySelector('#currentTurn').textContent = `Current Turn: ${player1Name}`;
  document.querySelector('#player1Header').textContent = player1Name;
   document.querySelector('#player2Header').textContent = player2Name;

    rollButton.disabled = false;
    document.querySelector('#players').style.display = 'none';
    document.querySelector('#board').style.display = 'block';
    document.querySelector('#dice').style.display = 'block';
    document.querySelector('#scorecard').style.display = 'block';
    document.querySelector('#winner').style.display = 'none';
});

rollButton.addEventListener('click', () => {
  die1Value = Math.floor(Math.random() * 6) + 1;
   die2Value = Math.floor(Math.random() * 6) + 1;

    die1.className = `bi bi-dice-${die1Value}`;
    die2.className = `bi bi-dice-${die2Value}`;

    const diceSum = die1Value + die2Value;
    document.querySelector('#diceSum').textContent = `Sum: ${diceSum}`;

    individualButton.disabled = (die1Value === die2Value || boxes[die1Value] === 'X' || boxes[die2Value] === 'X');
    sumButton.disabled = (diceSum > 9 || boxes[diceSum] === 'X');
    endTurnButton.disabled = !(individualButton.disabled && sumButton.disabled);
    rollButton.disabled = true;
});

individualButton.addEventListener('click', () => {
    shut(die1Value);
    shut(die2Value);

    individualButton.disabled = true;
    sumButton.disabled = true;
    rollButton.disabled = false;
});

sumButton.addEventListener('click', () => {
    const diceSum = die1Value + die2Value;
    shut(diceSum);

    individualButton.disabled = true;
    sumButton.disabled = true;
    rollButton.disabled = false;
});

endTurnButton.addEventListener('click', () => {
    const points = calculatePoints();

    if (currentPlayer === 1) {
        player1Points += points;
        const newRow = buildRow(currentRound, points, '');
        document.querySelector('#scoreTableBody').appendChild(newRow);
        currentPlayer = 2;
        document.querySelector('#currentTurn').textContent = `Current Turn: ${player2Name}`;
    } else {
        player2Points += points;
        const roundRow = document.querySelector(`#round${currentRound} .p2Pts`);
        roundRow.textContent = points;
        currentPlayer = 1;
        currentRound++;
        document.querySelector('#currentTurn').textContent = `Current Turn: ${player1Name}`;
    }

    resetBoard();
    document.querySelector('#currentRound').textContent = `Round: ${currentRound}`;

    if (currentRound > 5) {
        gameOver();
    }

    rollButton.disabled = false;
    endTurnButton.disabled = true;
});

// Functions
function shut(boxNumber) {
    const box = document.querySelector(`#box${boxNumber}`);
    box.classList.add('shut');
    box.textContent = 'X';
    boxes[boxNumber] = 'X';
}

function calculatePoints() {
    let points = 0;
    for (let i = 1; i <= 9; i++) {
        if (boxes[i] !== 'X') {
            points += i;
        }
    }
    return points;
}

function buildRow(round, p1Points, p2Points = '') {
    const row = document.createElement('tr');
    row.id = `round${round}`;

    const th = document.createElement('th');
    th.textContent = `Round ${round}`;

    const td1 = document.createElement('td');
    td1.className = 'p1Pts';
    td1.textContent = p1Points;

    const td2 = document.createElement('td');
    td2.className = 'p2Pts';
    td2.textContent = p2Points;

    row.appendChild(th);
    row.appendChild(td1);
    row.appendChild(td2);

    return row;
}

function resetBoard() {
    boxes.fill(0);
    document.querySelectorAll('.box').forEach((box, index) => {
        box.classList.remove('shut');
        box.textContent = index + 1;
    });
}

function gameOver() {
    document.querySelector('#board').style.display = 'none';
    document.querySelector('#dice').style.display = 'none';
    document.querySelector('#winner').style.display = 'block';

    const winnerText = document.querySelector('#winnerText');
    if (player1Points < player2Points) {
        winnerText.textContent = `Winner: ${player1Name} with ${player1Points} points`;
    } else {
        winnerText.textContent = `Winner: ${player2Name} with ${player2Points} points`;
    }
}




const playAgainButton = document.querySelector('#playAgain');

playAgainButton.addEventListener('click', () => {
    // Reset
player1Points = 0;
   player2Points = 0;
   currentRound = 1;
   currentPlayer = 1;



 document.querySelector('#scoreTableBody').innerHTML = '';

    resetBoard();

   document.querySelector('#winner').style.display = 'none';
   document.querySelector('#players').style.display = 'block';

    // Clear
 player1Input.value = '';
   player2Input.value = '';

    // start game 
    document.querySelector('#startGame').disabled = false;
});
