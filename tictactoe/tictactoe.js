document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restart-button');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    let currentPlayer = 'X';
    let moves = 0;
    let gameEnded = false;

    // Initialize the game
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Display initial turn
    displayTurn();

    // Restart button event listener
    restartButton.addEventListener('click', () => {
        resetGame();
    });

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell'));

        if (cell.textContent !== '' || gameEnded) return; // Cell already filled or game ended

        // Place the current player's mark
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer); // Adds 'X' or 'O' class
        moves++;

        // Check for win
        if (checkWin(currentPlayer)) {
            announceWinner(currentPlayer);
            gameEnded = true;
            showRestartButton();
            return;
        }

        // Check for draw
        if (moves === 9) {
            announceDraw();
            gameEnded = true;
            showRestartButton();
            return;
        }

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayTurn(); // Update turn display
    }

    function checkWin(player) {
        return winningCombos.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(player);
            });
        });
    }

    function announceWinner(player) {
        statusDisplay.textContent = `Player ${player} wins!`;
    }

    function announceDraw() {
        statusDisplay.textContent = "It's a draw!";
    }

    function displayTurn() {
        statusDisplay.textContent = `Current Turn: Player ${currentPlayer}`;
    }

    function showRestartButton() {
        restartButton.style.display = 'block';
    }

    function resetGame() {
        // Clear the board
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O'); // Remove 'X' and 'O' classes
        });

        // Reset game state
        currentPlayer = 'X';
        moves = 0;
        gameEnded = false;
        displayTurn();
        restartButton.style.display = 'none'; // Hide the restart button
    }
});
