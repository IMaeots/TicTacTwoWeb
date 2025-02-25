import GameState from './gameState.js';
import GameController from './gameController.js';

document.addEventListener("DOMContentLoaded", () => {
    let localGameButton = document.getElementById("localGame");
    let botGameButton = document.getElementById("botGame");
    let gameContainer = document.querySelector(".game-container");
    let resetButton = document.getElementById("reset");
    let gameHelper = document.getElementById("gameHelper");

    setupMenuEnvironment();

    localGameButton.addEventListener('click', () => {
        setupLocalGameEnvironment();

        let gameState = new GameState();
        let gameController = new GameController(gameState);
        gameController.initializeGame();
    });

    botGameButton.addEventListener('click', () => {
        setupBotGameEnvironment();

        let gameState = new GameState();
        let gameController = new GameController(gameState, true);
        gameController.initializeGame();
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
        gameContainer.style.display = 'flex';
        resetButton.style.display = 'block';
        gameHelper.style.display = 'block';
    }

    document.body.classList.add('visible');
});
