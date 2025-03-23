import GameState from './gameState.js';
import GameController from './gameController.js';
import UIBuilder from './uiBuilder.js';

document.addEventListener("DOMContentLoaded", () => {
    const uiBuilder = new UIBuilder("app");
    const ui = uiBuilder.createGameUI();
    
    setupGameEvents(ui);
});

function setupGameEvents(ui) {
    const { localGameButton, botGameButton } = ui;

    localGameButton.addEventListener('click', () => {
        setupGameEnvironment(ui);

        let gameState = new GameState();
        let gameController = new GameController(gameState, ui, false);
        gameController.initializeGame();
    });

    botGameButton.addEventListener('click', () => {
        setupGameEnvironment(ui);

        let gameState = new GameState();
        let gameController = new GameController(gameState, ui, true);
        gameController.initializeGame();
    });
}

function setupGameEnvironment(ui) {
    const {
        gameHelper,
        gameTimer,
        localGameButton,
        botGameButton,
        resetButton,
        gameContainer
    } = ui;
    
    localGameButton.style.display = 'none';
    botGameButton.style.display = 'none';
    gameContainer.style.display = 'flex';
    resetButton.style.display = 'block';
    gameHelper.style.display = 'block';
    gameTimer.style.display = 'block';
}
