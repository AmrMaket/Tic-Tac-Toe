const PLAYER_X = 'X';
const PLAYER_O = 'O';
const WINNING_COMBINATIONS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];


let currentPlayer = PLAYER_X;
let gameActive = true;
const board = ['', '', '', '', '', '', '', '', ''];


const boxes = document.querySelectorAll('.box');
const restartButton = document.getElementById('restartBtn');
const gameTitle = document.getElementById('gameTitle');


for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', handleBoxClick);
}
restartButton.addEventListener('click', restartGame);


function handleBoxClick() {
  const boxId = parseInt(this.getAttribute('id'));

  if (gameActive && board[boxId - 1] === '') {
    board[boxId - 1] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
      endGame(`Player ${currentPlayer} wins!`);
    } else if (checkDraw()) {
      endGame("It's a draw!");
    } else {
      currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
      gameTitle.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}


function checkWin(player) {
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    if (
      board[a - 1] === player &&
      board[b - 1] === player &&
      board[c - 1] === player
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return board.every((box) => box !== '');
}

function endGame(message) {
  gameActive = false;
  gameTitle.textContent = message;
}

function restartGame() {
  currentPlayer = PLAYER_X;
  gameActive = true;
  board.fill('');
  gameTitle.textContent = `Player ${currentPlayer}'s turn`;

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = '';
    boxes[i].classList.remove(PLAYER_X, PLAYER_O);
  }
}
