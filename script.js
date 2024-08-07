const resetBtn = document.querySelector('#reset');
const cells = document.querySelectorAll('.cell');
// Event listeners
resetBtn.addEventListener('click', resetGame)
cells.forEach(cell => cell.addEventListener('click', startGame));

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

// Reset game
function resetGame() {
  player1.cells = new Array(9).fill(null);
  player2.cells = new Array(9).fill(null);

  currentPlayer.setPlayerMarker('X');
  cells.forEach(cell => cell.textContent = '');
  cells.forEach(cell => cell.addEventListener('click', startGame));
}

// Main functionality of game
function startGame(event) {
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

  switchPlayer();

  console.log(player1.cells);
  console.log(player2.cells);
  console.log(checkWinner(player1));
  console.log(checkWinner(player2));
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
    console.log(player.getMarker() + ' is win!');
    cells.forEach(cell => cell.removeEventListener('click', startGame));
  }
}




