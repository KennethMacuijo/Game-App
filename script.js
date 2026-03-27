// Game State
let gameMode = null; // 'computer' or 'player'
let currentRound = 1;
let totalRounds = 3;
let player1Score = 0;
let player2Score = 0;
let timer = null;
let timeLeft = 10;
let roundInProgress = false;
let player1Choice = null;
let player2Choice = null;
let currentPlayerTurn = 1; // For 2-player mode

// DOM Elements
const modeSelection = document.getElementById('mode-selection');
const gameUI = document.getElementById('game-ui');
const gameOver = document.getElementById('game-over');

const vsComputerBtn = document.getElementById('vs-computer');
const vsPlayerBtn = document.getElementById('vs-player');

const currentRoundDisplay = document.getElementById('current-round');
const totalRoundsDisplay = document.getElementById('total-rounds');
const timerFill = document.getElementById('timer-fill');
const timerCount = document.getElementById('timer-count');

const player1Choices = document.querySelectorAll('#player1-choices .choice-btn');
const player2Choices = document.querySelectorAll('#player2-choices .choice-btn');

const resultText = document.getElementById('result-text');
const statusMessage = document.getElementById('status-message');
const roundWinner = document.getElementById('round-winner');

const player1ChoiceDisplay = document.getElementById('player1-choice-display');
const player2ChoiceDisplay = document.getElementById('player2-choice-display');

const playAgainBtn = document.getElementById('play-again');

// Initialize game
function initGame() {
    // Mode selection event listeners
    vsComputerBtn.addEventListener('click', () => startGame('computer'));
    vsPlayerBtn.addEventListener('click', () => startGame('player'));

    // Choice button event listeners
    player1Choices.forEach(btn => {
        btn.addEventListener('click', () => makeChoice(1, btn.dataset.choice));
    });

    player2Choices.forEach(btn => {
        btn.addEventListener('click', () => makeChoice(2, btn.dataset.choice));
    });

    // Play again button
    playAgainBtn.addEventListener('click', resetGame);
}

// Start game with selected mode
function startGame(mode) {
    gameMode = mode;
    modeSelection.classList.add('hidden');
    gameUI.classList.remove('hidden');

    // Set player names and avatars
    if (mode === 'computer') {
        document.getElementById('player2-name').textContent = 'Computer';
        document.getElementById('player2-avatar').textContent = '🤖';
        document.getElementById('final-player2-name').textContent = 'Computer';
    } else {
        document.getElementById('player2-name').textContent = 'Player 2';
        document.getElementById('player2-avatar').textContent = '👤';
        document.getElementById('final-player2-name').textContent = 'Player 2';
    }

    startNewRound();
}

// Start a new round
function startNewRound() {
    roundInProgress = true;
    player1Choice = null;
    player2Choice = null;
    currentPlayerTurn = 1;
    timeLeft = 10;

    // Reset UI
    resetRoundUI();

    // Update round display
    currentRoundDisplay.textContent = currentRound;
    totalRoundsDisplay.textContent = totalRounds;

    // Start timer
    startTimer();

    // Set initial status
    if (gameMode === 'computer') {
        statusMessage.textContent = 'Choose your weapon!';
        enablePlayerChoices(1);
        disablePlayerChoices(2);
    } else {
        statusMessage.textContent = 'Player 1, choose your weapon!';
        enablePlayerChoices(1);
        disablePlayerChoices(2);
    }
}

// Make a choice
function makeChoice(player, choice) {
    if (!roundInProgress) return;

    if (gameMode === 'computer' && player === 2) return; // Computer makes choice automatically

    if (gameMode === 'player' && player !== currentPlayerTurn) return; // Wrong player's turn

    // Set choice
    if (player === 1) {
        player1Choice = choice;
        highlightChoice(1, choice);
        disablePlayerChoices(1);

        if (gameMode === 'computer') {
            // Computer makes choice after a short delay
            setTimeout(() => {
                player2Choice = getComputerChoice();
                highlightChoice(2, player2Choice);
                resolveRound();
            }, 1000);
        } else {
            // Switch to player 2's turn
            currentPlayerTurn = 2;
            statusMessage.textContent = 'Player 2, choose your weapon!';
            enablePlayerChoices(2);
        }
    } else if (player === 2 && gameMode === 'player') {
        player2Choice = choice;
        highlightChoice(2, choice);
        disablePlayerChoices(2);
        resolveRound();
    }
}

// Get computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Highlight selected choice
function highlightChoice(player, choice) {
    const choices = player === 1 ? player1Choices : player2Choices;
    choices.forEach(btn => {
        if (btn.dataset.choice === choice) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

// Enable/disable player choices
function enablePlayerChoices(player) {
    const choices = player === 1 ? player1Choices : player2Choices;
    const playerDiv = player === 1 ? document.querySelector('.player1') : document.querySelector('.player2');

    choices.forEach(btn => {
        btn.classList.remove('disabled');
        btn.style.cursor = 'pointer';
    });

    playerDiv.classList.add('thinking');
}

function disablePlayerChoices(player) {
    const choices = player === 1 ? player1Choices : player2Choices;
    const playerDiv = player === 1 ? document.querySelector('.player1') : document.querySelector('.player2');

    choices.forEach(btn => {
        btn.classList.add('disabled');
        btn.style.cursor = 'not-allowed';
    });

    playerDiv.classList.remove('thinking');
    playerDiv.classList.add('ready');
}

// Start timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerCount.textContent = timeLeft;
        timerFill.style.width = `${(timeLeft / 10) * 100}%`;

        if (timeLeft <= 3) {
            timerFill.classList.add('warning');
        }

        if (timeLeft <= 0) {
            timeUp();
        }
    }, 1000);
}

// Handle time up
function timeUp() {
    clearInterval(timer);

    if (gameMode === 'computer') {
        if (!player1Choice) {
            // Player didn't choose, computer wins
            player2Choice = getComputerChoice();
            highlightChoice(2, player2Choice);
            resolveRound();
        }
    } else {
        // In 2-player mode, skip the current player's turn
        if (currentPlayerTurn === 1 && !player1Choice) {
            currentPlayerTurn = 2;
            statusMessage.textContent = 'Time\'s up! Player 2, choose your weapon!';
            enablePlayerChoices(2);
            timeLeft = 10;
            startTimer();
        } else if (currentPlayerTurn === 2 && !player2Choice) {
            resolveRound();
        }
    }
}

// Resolve the round
function resolveRound() {
    clearInterval(timer);
    roundInProgress = false;

    // Show choices in battle arena
    displayChoices();

    // Determine winner
    const winner = getWinner(player1Choice, player2Choice);

    // Update scores and UI
    if (winner === 1) {
        player1Score++;
        resultText.textContent = 'Player 1 Wins!';
        roundWinner.textContent = '🏆 Player 1';
        player1ChoiceDisplay.classList.add('winner');
    } else if (winner === 2) {
        player2Score++;
        resultText.textContent = 'Player 2 Wins!';
        roundWinner.textContent = '🏆 Player 2';
        player2ChoiceDisplay.classList.add('winner');
    } else {
        resultText.textContent = 'It\'s a Tie!';
        roundWinner.textContent = '🤝 Tie';
    }

    // Update score displays
    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;

    // Check if game is over
    if (currentRound >= totalRounds || Math.abs(player1Score - player2Score) > (totalRounds - currentRound)) {
        setTimeout(() => showGameOver(), 2000);
    } else {
        setTimeout(() => {
            currentRound++;
            startNewRound();
        }, 3000);
    }
}

// Display choices in battle arena
function displayChoices() {
    const choiceEmojis = {
        rock: '🪨',
        paper: '📄',
        scissors: '✂️'
    };

    player1ChoiceDisplay.textContent = choiceEmojis[player1Choice] || '❓';
    player2ChoiceDisplay.textContent = choiceEmojis[player2Choice] || '❓';
}

// Determine winner
function getWinner(choice1, choice2) {
    if (!choice1 && !choice2) return null; // Both didn't choose
    if (!choice1) return 2; // Player 1 didn't choose
    if (!choice2) return 1; // Player 2 didn't choose

    if (choice1 === choice2) return null; // Tie

    if (
        (choice1 === 'rock' && choice2 === 'scissors') ||
        (choice1 === 'paper' && choice2 === 'rock') ||
        (choice1 === 'scissors' && choice2 === 'paper')
    ) {
        return 1;
    }

    return 2;
}

// Reset round UI
function resetRoundUI() {
    // Reset choice highlights
    player1Choices.forEach(btn => btn.classList.remove('selected', 'disabled'));
    player2Choices.forEach(btn => btn.classList.remove('selected', 'disabled'));

    // Reset player states
    document.querySelector('.player1').classList.remove('ready', 'thinking');
    document.querySelector('.player2').classList.remove('ready', 'thinking');

    // Reset battle arena
    player1ChoiceDisplay.textContent = '';
    player2ChoiceDisplay.textContent = '';
    player1ChoiceDisplay.classList.remove('winner');
    player2ChoiceDisplay.classList.remove('winner');
    roundWinner.textContent = '';

    // Reset timer
    timerFill.style.width = '100%';
    timerFill.classList.remove('warning');
    timerCount.textContent = '10';
}

// Show game over screen
function showGameOver() {
    const winner = player1Score > player2Score ? 'Player 1' :
                   player2Score > player1Score ? (gameMode === 'computer' ? 'Computer' : 'Player 2') :
                   'It\'s a Tie!';

    document.getElementById('game-over-title').textContent =
        winner === 'It\'s a Tie!' ? '🤝 It\'s a Tie!' : `🏆 ${winner} Wins!`;

    document.getElementById('final-player1-score').textContent = player1Score;
    document.getElementById('final-player2-score').textContent = player2Score;

    gameOver.classList.remove('hidden');
}

// Reset game
function resetGame() {
    gameMode = null;
    currentRound = 1;
    player1Score = 0;
    player2Score = 0;
    roundInProgress = false;
    player1Choice = null;
    player2Choice = null;
    currentPlayerTurn = 1;

    // Reset UI
    gameOver.classList.add('hidden');
    gameUI.classList.add('hidden');
    modeSelection.classList.remove('hidden');

    // Clear any running timers
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', initGame);