'use strict'
// -------------------------------------------------------GAME GRID---------------------------------------------------------------------------------
const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
// -------------------------------------------------------------------------------------------------------------------------------------------------
const currentPlayer = document.getElementById('currentPlayer');                     // Creating current player object
const player1Score = document.getElementById('player-1-score');                     // Creating player 1 score object
const player2Score = document.getElementById('player-2-score');                     // Creating player 2 score object
const boxes = document.querySelectorAll('.box');                                    // Creating box object
const rematch = document.querySelector('.btn');                                     // Creating rematch button object
let gameBoxContent = ['*', '*', '*', '*', '*', '*', '*', '*', '*'];                 // Creating gamebox arrays
let player1 = 0;                                                                    // Player 1 score
let player2 = 0;                                                                    // Player 2 score
let nowPlaying = 'player1';                                                         // Current player
let gameOn = true;                                                                  // Boolean condition for the game to run
let clicks = 0;                                                                     // Click monitor in case of a tie
let playerPlacements = [];
let computerPlacements = [];
currentPlayer.textContent += 'X';                                                   // Current player (visual)
// ------------------------------------------------------GAME MECHANIC-------------------------------------------------------------------------------
for (let unit = 0; unit < boxes.length; ++unit) {
    boxes[unit].addEventListener('click', function () {
        ++clicks;
        if (gameOn && gameBoxContent[unit] == '*' && clicks <= 1) {
            player(unit);                                                           // Calling 'player' function
            checkBoard();                                                           // Calling 'checkBoard' function
            setTimeout(virtualPlayer, 200);                                         // Delay the calling of the 'virtualPlayer' function
        }
        if (gameBoxContent[unit] == 'O') clicks = 0;                                // Reset click counter in case of missclick
        if (!gameBoxContent.includes('*')) rematch.classList.remove('hidden');      // Show reset button
    });
}

function player(index) {                                                            // Add 'X' for player
    boxes[index].textContent = 'X';
    gameBoxContent[index] = 'X';
    nowPlaying = 'player2';
    checkForWin();                                                                  // Calling 'checkForWin' function
}

function virtualPlayer() {                                                          // Add 'O' for virtual player
    counterPlacement();                                                             // Calling 'counterPlacement' function
    checkForWin();                                                                  // Calling 'checkForWin' function
    nowPlaying = 'player1';
    clicks = 0;

}

function checkBoard() {                                                             // Checking board for posible countermoves for virtual player
    for (let i = 0; i < winning.length; ++i) {
        let playerChecksOnRow = 0;
        let computerChecksOnRow = 0;
        for (let j = 0; j < winning[i].length; ++j) {
            if (gameBoxContent[winning[i][j]] == 'X') {                             // Counting the total number of 'X' checks on every line
                ++playerChecksOnRow;
            } else if (gameBoxContent[winning[i][j]] == 'O') {
                --playerChecksOnRow;
            }

            if (gameBoxContent[winning[i][j]] == 'O') {                             // Counting the total number of 'O' checks on every line
                ++computerChecksOnRow;
            } else if (gameBoxContent[winning[i][j]] == 'X') {
                --computerChecksOnRow;
            }
        }
        if (playerChecksOnRow == 2) playerPlacements.push(i);                       // If the player has a possible winning line, add that line to an array
        if (computerChecksOnRow == 2) computerPlacements.push(i);                   // If the virtual player has a possible winning line, add that line to an array
    }
}

function counterPlacement() {                                                       // Counter player based on his checks
    // If player has no possible winning combination, place 'O' on the board
    if (computerPlacements.length == 0 && playerPlacements.length == 0 && gameBoxContent.includes('*')) {
        return randomPlacement();
    }
    // If possible to complete winning line, then place 'O' on winning line 
    if (computerPlacements.length != 0 && gameBoxContent.includes('*') && gameOn) {
        for (let i = 0; i < computerPlacements.length; ++i) {
            let row = computerPlacements[i];
            for (let col = 0; col < winning[row].length; ++col) {
                if (gameBoxContent[winning[row][col]] == '*') {
                    boxes[winning[row][col]].textContent = 'O';
                    gameBoxContent[winning[row][col]] = 'O';
                    return computerPlacements = [];
                }
            }
        }
    }
    // If NO possibility for winning line, block player from completing winning line
    if (playerPlacements.length != 0 && gameBoxContent.includes('*') && gameOn) {
        for (let i = 0; i < playerPlacements.length; ++i) {
            let row = playerPlacements[i];

            for (let col = 0; col < winning[row].length; ++col) {
                if (gameBoxContent[winning[row][col]] == '*') {
                    boxes[winning[row][col]].textContent = 'O';
                    gameBoxContent[winning[row][col]] = 'O';
                    return playerPlacements = [];
                }
            }
        }
    }
}

function randomPlacement() {                                                        // Place a random 'O' check on the empty unit
    let response = Math.floor(Math.random() * 9);
    if (gameBoxContent[response] == 'X' || gameBoxContent[response] == 'O') {
        return virtualPlayer();
    } else if (gameOn) {
        boxes[response].textContent = 'O';
        gameBoxContent[response] = 'O';
    }
}

function checkForWin() {                                                            // Check is player or virtualPlayer has completed a line with the same element 
    for (let i = 0; i < winning.length; ++i) {

        if (gameBoxContent[winning[i][0]] === 'X' && gameBoxContent[winning[i][1]] === 'X' && gameBoxContent[winning[i][2]] === 'X') {
            gameOn = false;
            currentPlayer.textContent = 'Player X Won!';
            highlightWinner(i);
            return;
        }

        if (gameBoxContent[winning[i][0]] === 'O' && gameBoxContent[winning[i][1]] === 'O' && gameBoxContent[winning[i][2]] === 'O') {
            gameOn = false;
            currentPlayer.textContent = 'Player O Won!';
            highlightWinner(i);
            return;
        }
    }
}

function highlightWinner(row) {                                                     // Highlight the winning line
    for (let col = 0; col < winning[row].length; ++col) {
        boxes[winning[row][col]].style.color = '#228B22';
    }
    rematch.classList.remove('hidden');
}

function scoreUpdate() {                                                            // Update score
    if (currentPlayer.textContent === 'Player X Won!') {                            // If player 1 wins 
        ++player1;                                                                  // Score counter will be incremented
        player1Score.textContent = player1;                                         // Player's score will be updated
    }

    if (currentPlayer.textContent === 'Player O Won!') {                            // If player 2 win
        ++player2;                                                                  // Score counter will be incremented
        player2Score.textContent = player2;                                         // Player's score will be updated
    }
}

function resetGame() {
    gameOn = true;                                                                  // Game is turned back on
    nowPlaying = 'player1';                                                         // Current player is set to player 1
    clicks = 0;                                                                     // Reset click counter
    gameBoxContent = ['*', '*', '*', '*', '*', '*', '*', '*', '*'];                 // gameBoxContent is set back to default 
    currentPlayer.textContent = 'Current Player: ';                                 // Status of current player is updated
    currentPlayer.textContent += 'X';                                               // Current player is player 1 'X'
    for (let i = 0; i < 9; ++i) {                                                   // Resetting game board
        boxes[i].textContent = '';                                                  // Clear every box
        boxes[i].style.color = '#eee';                                              // Set color back to default
    }
}

rematch.addEventListener('click', function () {                                     // After rematch button has been clicked
    scoreUpdate();                                                                  // Update winning player score
    resetGame();                                                                    // Set game back to default
    rematch.classList.add('hidden');                                                // Hide rematch button
})
