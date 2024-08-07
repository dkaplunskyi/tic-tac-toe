function createPlayer(name, marker) {
  return {
    name: name,
    marker: marker,
    cells: new Array(9).fill(null),
    getName: function () {
      return this.name;
    }
  };
}

function createCurrentPlayer(initialMarker) {
  return {
    currentPlayerMarker: initialMarker,
    getPlayerMarker: function () {
      return this.currentPlayerMarker;
    },
    setPlayerMarker: function (newMarker) {
      this.currentPlayerMarker = newMarker;
    }
  };
}

const player1 = createPlayer('Player 1', 'X');
const player2 = createPlayer('Player 2', 'O');

// Creating an instance for currentPlayer
const currentPlayer = createCurrentPlayer('X');

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', resetGame)
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', assignCellToPlayer));

function resetGame() {
  player1.cells = new Array(9).fill(null);
  player2.cells = new Array(9).fill(null);

  currentPlayer.setPlayerMarker('X');
  cells.forEach(cell => cell.textContent = '');
  cells.forEach(cell => cell.addEventListener('click', assignCellToPlayer));
}

function assignCellToPlayer(event) {
  let index = event.target.getAttribute('data-index');

  // Check if the cell is already taken
  if (event.target.textContent !== '') {
    return;
  }

  event.target.textContent = currentPlayer.getPlayerMarker();

  if (currentPlayer.getPlayerMarker() === 'X') {
    player1.cells[index] = index;
  } else {
    player2.cells[index] = index;
  }
  switchPlayer();

  console.log(player1.cells);
  console.log(player2.cells);
  console.log(checkWinner(player1));
  console.log(checkWinner(player2));

}

function switchPlayer() {
  currentPlayer.setPlayerMarker(currentPlayer.getPlayerMarker() === 'X' ? 'O' : 'X');
}

function checkWinner(player) {
  const winningCombinations = [
    ['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], // Rows
    ['0', '3', '6'], ['1', '4', '7'], ['2', '5', '8'], // Columns
    ['0', '4', '8'], ['2', '4', '6']                  // Diagonals
  ];

  let winner = winningCombinations.some(combination =>
    combination.every(cell => player.cells.includes(cell)));

  if (winner) {
    console.log(player.getName() + ' Win!');
    cells.forEach(cell => cell.removeEventListener('click', assignCellToPlayer));
  }
}




