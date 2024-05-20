var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6; // Game rules
var columns = 7; // Grid according to game rules
var currColumns = []; // Keeps track of which row each column is at

window.onload = function() {
    initializeGame();
};

function initializeGame() {
    board = [];
    currColumns = Array(columns).fill(rows - 1); // Initialize each column to the bottom row

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            tile.addEventListener("click", placePiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function clearBoard() {
    document.querySelectorAll(".tile").forEach(tile => {
        tile.classList.remove("red-piece", "yellow-piece");
    });

    // Reset game variables
    currPlayer = playerRed;
    gameOver = false;
    board = [];
    currColumns = Array(columns).fill(rows - 1); // Reset each column to the bottom row

    // Clear winner message
    document.getElementById("winner").innerText = "";
}

document.getElementById("restartButton").addEventListener("click", clearBoard);

function placePiece() {
    if (gameOver) return;

    let [r, c] = this.id.split("-").map(Number);
    r = currColumns[c]; // Get the current available row for this column

    if (r < 0) return; // If no rows are available in this column

    board[r][c] = currPlayer;
    let tile = document.getElementById(`${r}-${c}`);
    tile.classList.add(currPlayer === playerRed ? "red-piece" : "yellow-piece");

    currPlayer = currPlayer === playerRed ? playerYellow : playerRed;
    currColumns[c]--; // Move to the next row up in this column

    checkWinner();
}

function checkWinner() {
    // Check all win conditions: horizontal, vertical, and both diagonals

    // Horizontal check
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && 
                board[r][c] === board[r][c + 1] && 
                board[r][c + 1] === board[r][c + 2] && 
                board[r][c + 2] === board[r][c + 3]) {
                announceWinner(r, c);
                return;
            }
        }
    }

    // Vertical check
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== ' ' && 
                board[r][c] === board[r + 1][c] && 
                board[r + 1][c] === board[r + 2][c] && 
                board[r + 2][c] === board[r + 3][c]) {
                announceWinner(r, c);
                return;
            }
        }
    }

    // Diagonal check (bottom-left to top-right)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && 
                board[r][c] === board[r + 1][c + 1] && 
                board[r + 1][c + 1] === board[r + 2][c + 2] && 
                board[r + 2][c + 2] === board[r + 3][c + 3]) {
                announceWinner(r, c);
                return;
            }
        }
    }

    // Diagonal check (top-left to bottom-right)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && 
                board[r][c] === board[r - 1][c + 1] && 
                board[r - 1][c + 1] === board[r - 2][c + 2] && 
                board[r - 2][c + 2] === board[r - 3][c + 3]) {
                announceWinner(r, c);
                return;
            }
        }
    }
}

function announceWinner(r, c) {
    let winnerText = board[r][c] === playerRed ? "Congratulations, Player 1 Wins" : "Congratulations, Player 2 Wins";
    document.getElementById("winner").innerText = winnerText;
    gameOver = true;
}
