const createGameBoardElements = (function () {
  const game = document.createElement('div');
  const board = document.createElement('div');
  const header = document.createElement('h1');
  const resetBtn = document.createElement('button');
  const outputMsg = document.createElement('div');

  game.id = 'game';
  board.id = 'board';
  header.textContent = 'Tic Tac Toe';
  resetBtn.id = 'reset';
  resetBtn.textContent = 'Reset Game';
  outputMsg.id = 'message';

  
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute(`data-index`, i)
    board.appendChild(cell);
  }
  
  document.body.appendChild(game);
  game.appendChild(header);
  game.appendChild(board)
  game.appendChild(resetBtn);
  game.appendChild(outputMsg);

})();

// Get DOM elements
const resetBtn = document.querySelector('#reset');
const output = document.querySelector('#message');
const cells = document.querySelectorAll('.cell');

// Set event listeners
resetBtn.addEventListener('click', resetGame)
cells.forEach(cell => cell.addEventListener('click', playerAction));

// Function factory to create a player.
function createPlayer(marker) {
  return {
    marker: marker,
    cells: new Array(9).fill(null),
    getMarker: function () {
      return this.marker;
    }
  };
}

// Function factory to create a game board.
function createGameBoard() {
  return {
    board: new Array(9).fill(null),
    winner: null
  }
}

// Create an empty game board.
let gameBoard = createGameBoard();

// Current player object. The marker of current player changes after each click.
const currentPlayer = {
  currentPlayerMarker: 'X',
  getPlayerMarker: function () {
    return this.currentPlayerMarker;
  },
  setPlayerMarker: function (newMarker) {
    this.currentPlayerMarker = newMarker;
  }
};

// Creating a two players
const player1 = createPlayer('X');
const player2 = createPlayer('O');

// Main functionality of game
function playerAction(event) {
  let targetCellIndex = event.target.getAttribute('data-index');

  // Check if the cell is already taken
  if (event.target.textContent !== '') {
    return;
  }

  // Display a marker in the clicked cell.
  event.target.textContent = currentPlayer.getPlayerMarker();

  // Check who is a current player to know who is clicked and occupied a cell.
  if (currentPlayer.getPlayerMarker() === 'X') {
    player1.cells[targetCellIndex] = targetCellIndex;
  } else {
    player2.cells[targetCellIndex] = targetCellIndex;
  }

  gameBoard.board[targetCellIndex] = targetCellIndex;

  switchPlayer();

  checkWinner(player1);
  checkWinner(player2);
}

// Switch a player depends on current player marker.
function switchPlayer() {
  currentPlayer.setPlayerMarker(currentPlayer.getPlayerMarker() === 'X' ? 'O' : 'X');
}

// Check for a winner function.
function checkWinner(player) {
  // Winning combinations.
  const winningCombinations = [
    ['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], // Rows
    ['0', '3', '6'], ['1', '4', '7'], ['2', '5', '8'], // Columns
    ['0', '4', '8'], ['2', '4', '6']                  // Diagonals
  ];
  // Find a player that has a winning combination in his cells array.
  let winner = winningCombinations.some(combination =>
    combination.every(cell => player.cells.includes(cell)));

  // Display a winner and remove a 'click' event listener from cells to prevent the game from continuing if there is a winner.
  if (winner) {
    gameBoard.winner = player.getMarker();
    cells.forEach(cell => cell.removeEventListener('click', playerAction));
    output.textContent = `${gameBoard.winner} is win!`;
  }
  // Check if there is no winner.
  if (gameBoard.board.every(cell => cell != null) && gameBoard.winner == null) {
    output.textContent = `Draw!`;
  }
}

// Reset game
function resetGame() {
  player1.cells.fill(null);
  player2.cells.fill(null);

  currentPlayer.setPlayerMarker('X');
  gameBoard = createGameBoard();
  output.textContent = '';
  cells.forEach(cell => cell.textContent = '');
  cells.forEach(cell => cell.addEventListener('click', playerAction));
}
