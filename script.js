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
const currentPlayer = document.getElementById('currentPlayer');             // Creating current player object
const player1Score = document.getElementById('player-1-score');             // Creating player 1 score object
const player2Score = document.getElementById('player-2-score');             // Creating player 2 score object
const boxes = document.querySelectorAll('.box');                            // Creating box object
const rematch = document.querySelector('.btn');                             // Creating rematch button object
let gameBoxContent = ['*', '*', '*', '*', '*', '*', '*', '*', '*'];         // Creating gamebox arrays
let player1 = 0;                                                            // Player 1 score
let player2 = 0;                                                            // Player 2 score
let nowPlaying = 1;                                                         // Current player
let gameOn = true;                                                          // Boolean condition for the game to run
let clicks = 0;                                                             // Click monitor in case of a tie
currentPlayer.textContent += 'X';                                           // Current player (visual)
// ------------------------------------------------------GAME MECHANIC-------------------------------------------------------------------------------
const current = function () {                                               // Checking for current player on the board
    if (gameOn) {
        if (nowPlaying === 1) {                                             // If current player is Player 1 'X'
            currentPlayer.textContent = 'Current Player: ';                 // Update status
            currentPlayer.textContent += 'X';
        } else {
            currentPlayer.textContent = 'Current Player: ';                 // If current player is Player 2 'O'
            currentPlayer.textContent += 'O';                               // Update status
        }
    }
}

const playerSwitch = function (index) {                                     // Switching between player 1 and player 2
    if (gameOn) {
        if (nowPlaying === 1) {                                             // If current player is player 1
            boxes[index].textContent = 'X';                                 // Check box with 'X'
            gameBoxContent[index] = 'X';                                    // Update gameBoxContent array
            ++nowPlaying;                                                   // Move to player 2
        } else {                                                            // IF current player is player 2
            boxes[index].textContent = 'O';                                 // Check box with 'O'
            gameBoxContent[index] = 'O';                                    // Update gameBoxContent array
            --nowPlaying;                                                   // Move back to player 1
        }
    }
}

const win = function () {
    for (let i = 0; i < winning.length; ++i) {                              // Based on the game grid array object checking if all 3 elements are the same
        if (gameBoxContent[winning[i][0]] === 'X' && gameBoxContent[winning[i][1]] === 'X' && gameBoxContent[winning[i][2]] === 'X') {
            gameOn = false;                                                 // If all three elements are the same the game is stoped
            currentPlayer.textContent = 'Player X Won!';                    // Status informs of winning player 
            boxes[winning[i][0]].style.color = '#228B22';                   // The winning line is highlighted 
            boxes[winning[i][1]].style.color = '#228B22';                   // The winning line is highlighted
            boxes[winning[i][2]].style.color = '#228B22';                   // The winning line is highlighted
            break;                                                          // If a winning combination is found then break the loop
        }

        if (gameBoxContent[winning[i][0]] === 'O' && gameBoxContent[winning[i][1]] === 'O' && gameBoxContent[winning[i][2]] === 'O') {
            gameOn = false;                                                 // If all three elements are the same the game is stoped
            currentPlayer.textContent = 'Player O Won!';                    // Status informs of winning player 
            boxes[winning[i][0]].style.color = '#228B22';                   // The winning line is highlighted
            boxes[winning[i][1]].style.color = '#228B22';                   // The winning line is highlighted
            boxes[winning[i][2]].style.color = '#228B22';                   // The winning line is highlighted
            break;                                                          // If a winning combination is found then break the loop
        }
    }
}
// ------------------------------------------------------END OF GAME-------------------------------------------------------------------------------

const scoreUpdate = function () {                                           // Depending on which player won
    if (currentPlayer.textContent === 'Player X Won!') {                    // If player 1 wins 
        ++player1;                                                          // Score counter will be incremented
        player1Score.textContent = player1;                                 // Player's score will be updated
    }

    if (currentPlayer.textContent === 'Player O Won!') {                    // If player 2 win
        ++player2;                                                          // Score counter will be incremented
        player2Score.textContent = player2;                                 // Player's score will be updated
    }
}

const resetGame = function () {                                             // Starts a new match
    gameOn = true;                                                          // Game is turned back on
    nowPlaying = 1;                                                         // Current player is set to player 1
    clicks = 0;                                                             // Reset click counter
    gameBoxContent = ['*', '*', '*', '*', '*', '*', '*', '*', '*'];         // gameBoxContent is set back to default 
    currentPlayer.textContent = 'Current Player: ';                         // Status of current player is updated
    currentPlayer.textContent += 'X';                                       // Current player is player 1 'X'
    for (let i = 0; i < 9; ++i) {                                           // Resetting game board
        boxes[i].textContent = '';                                          // Clear every box
        boxes[i].style.color = '#eee';                                      // Set color back to default
    }
}
// -------------------------------------------------------------------------------------------------------------------------------------------------

for (let i = 0; i < boxes.length; ++i) {                                    // GAME MECHANIC
    boxes[i].addEventListener('click', function () {
        if (gameOn && gameBoxContent[i] === '*') {                          // As log as the game is running ang box has not been checked
            playerSwitch(i);                                                // Switch player after 'click'
            current();                                                      // Update screen of current player        
            win();                                                          // Check grid for winning combination
            ++clicks;                                                       // Increase click counter
        }

        if (clicks === 9 && gameOn) {
            currentPlayer.textContent = 'Current match is a TIE'
            rematch.classList.remove('hidden');
        }

        if (!gameOn) {                                                      // If the game has stopped 
            rematch.classList.remove('hidden');                             // Add rematch button to screen
        }
    });
}
rematch.addEventListener('click', function () {                             // After rematch button has been clicked
    scoreUpdate();                                                          // Update winning player score
    resetGame();                                                            // Set game back to default
    rematch.classList.add('hidden');                                        // Hide rematch button
})                                                                          // END GAME
