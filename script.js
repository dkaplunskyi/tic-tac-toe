const player1 = {
  name: 'Player 1',
  marker: 'X',
  cells: new Array(9).fill(null),
  getName: function(){
    return this.name
  }
}
const player2 = {
  name: 'Player 2',
  marker: 'O',
  cells: new Array(9).fill(null),
  getName: function(){
    return this.name
  }
}

let currentPlayer = 'X';

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', assignCellToPlayer));

function assignCellToPlayer(event) {
  let index = event.target.getAttribute('data-index');

  // Check if the cell is already taken
  if (event.target.textContent !== '') {
    return;
  }

  event.target.textContent = currentPlayer;

  if (player1.cells[index] === null && currentPlayer === 'X') {
    player1.cells[index] = index;
  }else{
    player2.cells[index] = index;
  }
  switchPlayer();

  console.log(player1.cells);
  console.log(player2.cells);
  console.log(checkWinner(player1));
  console.log(checkWinner(player2));

}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner(player) {
  const winningCombinations = [
    ['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], // Rows
    ['0', '3', '6'], ['1', '4', '7'], ['2', '5', '8'], // Columns
    ['0', '4', '8'], ['2', '4', '6']                  // Diagonals
  ];

  let result = winningCombinations.some(combination =>
    combination.every(cell => player.cells.includes(cell))
  );

  if (result) {
    console.log(player.getName() + ' Win!');
  }
}




