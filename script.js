const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const line = document.getElementById('line');

let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const linePositions = {
  "0,1,2": "row-0",
  "3,4,5": "row-1",
  "6,7,8": "row-2",
  "0,3,6": "col-0",
  "1,4,7": "col-1",
  "2,5,8": "col-2",
  "0,4,8": "diag-0",
  "2,4,6": "diag-1"
};

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer.toLowerCase());

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      const key = condition.join(",");
      line.className = 'line ' + linePositions[key];
      return true;
    }
  }
  line.className = 'line';
  return false;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
  line.className = 'line';
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

// Hide welcome screen after animation (4 seconds)
setTimeout(() => {
  const welcome = document.getElementById('welcome');
  welcome.style.display = 'none';
}, 4000);
