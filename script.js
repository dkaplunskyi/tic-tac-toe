document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');
  const message = document.getElementById('message');
  const resetButton = document.getElementById('reset');

  let currentPlayer = 'X';
  let boardState = Array(9).fill(null);
  let gameActive = true;

  const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];

  const handleCellClick = (e) => {
      const index = e.target.getAttribute('data-index');

      if (boardState[index] || !gameActive) {
          return;
      }

      boardState[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      if (checkWin()) {
          message.textContent = `${currentPlayer} wins!`;
          gameActive = false;
      } else if (boardState.every(cell => cell)) {
          message.textContent = 'Draw!';
          gameActive = false;
      } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
  };

  const checkWin = () => {
      return winningCombinations.some(combination => {
          return combination.every(index => {
              return boardState[index] === currentPlayer;
          });
      });
  };

  const resetGame = () => {
      boardState = Array(9).fill(null);
      cells.forEach(cell => cell.textContent = '');
      message.textContent = '';
      currentPlayer = 'X';
      gameActive = true;
  };

  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetButton.addEventListener('click', resetGame);
});
