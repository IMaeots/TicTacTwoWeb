export default class UIBuilder {
    constructor(rootElementId) {
        this.rootElement = document.getElementById(rootElementId);
        if (!this.rootElement) {
            throw new Error(`Element with ID "${rootElementId}" not found`);
        }
    }

    createGameUI() {
        this.createHeading();
        this.createGameHelper();
        this.createTimer();
        this.createGameContainer();
        this.createMenuControls();
        
        document.body.classList.add('visible');
        
        return {
            gameHelper: document.getElementById('gameHelper'),
            gameTimer: document.getElementById('gameTimer'),
            localGameButton: document.getElementById('localGameButton'),
            botGameButton: document.getElementById('botGameButton'),
            resetButton: document.getElementById('resetButton'),
            gameContainer: document.querySelector('.game-container'),
            gameBoard: document.getElementById('gameBoard'),
            moveUpButton: document.getElementById('moveUpButton'),
            moveDownButton: document.getElementById('moveDownButton'),
            moveLeftButton: document.getElementById('moveLeftButton'),
            moveRightButton: document.getElementById('moveRightButton')
        };
    }

    createHeading() {
        const heading = document.createElement("h1");
        heading.textContent = "Basic TicTacTwo by IMaeots";
        this.rootElement.appendChild(heading);
    }

    createGameHelper() {
        const gameHelper = document.createElement("p");
        gameHelper.id = "gameHelper";
        gameHelper.textContent = "X's Turn";
        gameHelper.style.display = 'none';
        this.rootElement.appendChild(gameHelper);
    }

    createTimer() {
        const timerElement = document.createElement("div");
        timerElement.id = "gameTimer";
        timerElement.classList.add("game-timer");
        timerElement.textContent = "00:00";
        timerElement.style.display = 'none';
        this.rootElement.appendChild(timerElement);
    }

    createGameContainer() {
        const gameContainer = document.createElement("div");
        gameContainer.className = "game-container";
        gameContainer.style.display = 'none';
        this.rootElement.appendChild(gameContainer);
        
        this.addDirectionButton(gameContainer, "moveUpButton", "↑");
        
        const middleLayer = document.createElement("div");
        middleLayer.className = "middle-layer";
        gameContainer.appendChild(middleLayer);
        
        this.addDirectionButton(middleLayer, "moveLeftButton", "←");
        
        const gameBoard = document.createElement("div");
        gameBoard.id = "gameBoard";
        middleLayer.appendChild(gameBoard);
        
        this.addDirectionButton(middleLayer, "moveRightButton", "→");
        
        this.addDirectionButton(gameContainer, "moveDownButton", "↓");
        
        return {
            gameContainer: gameContainer,
            gameBoard: gameBoard
        };
    }
    
    addDirectionButton(parent, id, symbol) {
        const button = document.createElement("button");
        button.id = id;
        button.className = "grid-control";
        button.textContent = symbol;
        button.disabled = true;
        parent.appendChild(button);
        return button;
    }

    createMenuControls() {
        const menuControls = document.createElement("div");
        menuControls.className = "menu-controls";
        this.rootElement.appendChild(menuControls);
        
        this.addMenuButton(menuControls, "localGameButton", "Local Two Player");
        
        this.addMenuButton(menuControls, "botGameButton", "VS Computer");
        
        const resetButton = this.addMenuButton(menuControls, "resetButton", "Reset Game");
        resetButton.style.display = 'none';
    }
    
    addMenuButton(parent, id, text) {
        const button = document.createElement("button");
        button.id = id;
        button.className = "menu-button";
        button.textContent = text;
        parent.appendChild(button);
        return button;
    }
}
