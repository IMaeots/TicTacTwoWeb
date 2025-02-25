import GameState from './gameState.js';
import UIController from './uiController.js';

document.addEventListener("DOMContentLoaded", () => {
    const gameState = new GameState();
    const uiController = new UIController(gameState);
});
