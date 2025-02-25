import GameState from './gameState.js';
import GameController from './gameController.js';

document.addEventListener("DOMContentLoaded", () => {
    const localGameButton = document.getElementById("localGame");
    const botGameButton = document.getElementById("botGame");
    const gameContainer = document.querySelector(".game-container");
    const resetButton = document.getElementById("reset");
    const gameHelper = document.getElementById("gameHelper");

    setupMenuEnvironment();

    localGameButton.addEventListener('click', () => {
        setupLocalGameEnvironment();

        const gameState = new GameState();
        const gameController = new GameController(gameState);
        gameController.initializeGame();
    });

    botGameButton.addEventListener('click', () => {
        setupBotGameEnvironment();
        setTimeout(setupMenuEnvironment, 2000);
    });

    function setupMenuEnvironment() {
        gameHelper.style.display = 'none';
        gameContainer.style.display = 'none';
        resetButton.style.display = 'none';
        localGameButton.style.display = 'block';
        botGameButton.style.display = 'block';
    }

    function setupLocalGameEnvironment() {
        localGameButton.style.display = 'none';
        botGameButton.style.display = 'none';
        gameContainer.style.display = 'flex';
        resetButton.style.display = 'block';
        gameHelper.style.display = 'block';
    }

    function setupBotGameEnvironment() {
        localGameButton.style.display = 'none';
        botGameButton.style.display = 'none';
        gameHelper.style.display = 'block';
        gameHelper.textContent = "AI mode coming soon!";
    }
});
