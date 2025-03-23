import { getAIMove } from './aiHelper.js';

export default class GameController {
    constructor(gameState, isAIGame = false) {
        this.gameState = gameState;
        this.gameBoard = document.getElementById("gameBoard");
        this.gameHelper = document.getElementById("gameHelper");
        this.resetButton = document.getElementById("reset");
        
        this.isAIGame = isAIGame;
        this.timerInterval = null;
        this.gameTime = 0;
        this.setupControls();
        this.setupTimer();
    }

    setupControls() {
        this.setupMovementControls();
        this.setupResetControl();
    }

    setupMovementControls() {
        document.getElementById('moveUp').addEventListener('click', () => this.moveGrid('up'));
        document.getElementById('moveDown').addEventListener('click', () => this.moveGrid('down'));
        document.getElementById('moveLeft').addEventListener('click', () => this.moveGrid('left'));
        document.getElementById('moveRight').addEventListener('click', () => this.moveGrid('right'));
    }

    setupResetControl() {
        this.resetButton.addEventListener('click', () => this.resetGame());
    }

    setupTimer() {
        if (!document.getElementById('gameTimer')) {
            const timerElement = document.createElement('div');
            timerElement.id = 'gameTimer';
            timerElement.classList.add('game-timer');
            timerElement.textContent = '00:00';
            this.gameHelper.parentNode.insertBefore(timerElement, this.gameHelper.nextSibling);
        }
        this.timerElement = document.getElementById('gameTimer');
    }

    startTimer() {
        this.gameTime = 0;
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.gameTime++;
            this.updateTimerDisplay();
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.gameTime / 60).toString().padStart(2, '0');
        const seconds = (this.gameTime % 60).toString().padStart(2, '0');
        this.timerElement.textContent = `${minutes}:${seconds}`;
    }

    initializeGame() {
        this.createBoard();
        this.updateHelperText(`${this.gameState.currentPlayer}'s Turn`);
        this.startTimer();
        document.querySelectorAll('.grid-control').forEach(control => control.disabled = true);
    }

    resetGame() {
        this.gameState.reset();
        this.initializeGame();
        this.clearSelectedMarker();
    }

    updateHelperText(text) {
        this.gameHelper.textContent = text;
    }

    endGame() {
        this.disableBoard();
        this.gameState.winner = this.gameState.currentPlayer;
        this.updateHelperText(`🎉 ${this.gameState.currentPlayer} Wins Tic-Tac-Two! 🎉`);
        this.stopTimer();
    }

    createBoard() {
        this.gameBoard.innerHTML = "";
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index", i.toString());

            if (this.gameState.playableCells.has(i)) {
                cell.classList.add("playable");
                cell.addEventListener("click", (e) => this.handleCellClick(e));
            }

            this.gameBoard.appendChild(cell);
        }

        this.updateBoard();
    }

    updateBoard() {
        document.querySelectorAll('.cell').forEach(cell => {
            const index = parseInt(cell.getAttribute('data-index'));
            cell.textContent = this.gameState.boardState[index] || "";
            cell.classList.toggle('playable', this.gameState.playableCells.has(index));
            cell.classList.remove("X", "O", "selected");

            if (this.gameState.boardState[index]) {
                cell.classList.add(this.gameState.boardState[index]);
            }

            if (this.gameState.selectedMarker === index) {
                cell.classList.add("selected");
            }

            if (this.gameState.playableCells.has(index)) {
                cell.addEventListener('click', (e) => this.handleCellClick(e));
            } else {
                const newCell = cell.cloneNode(true);
                cell.parentNode.replaceChild(newCell, cell);
            }
        });
    }

    handleCellClick(event) {
        if (this.gameState.winner || (this.isAIGame && this.gameState.currentPlayer === "O")) return;

        const cell = event.target;
        const index = parseInt(cell.getAttribute("data-index"));

        if (this.gameState.selectedMarker !== null) {
            if (this.gameState.boardState[index] === null && this.gameState.playableCells.has(index)) {
                this.moveMarker(this.gameState.selectedMarker, index);
                this.gameState.selectedMarker = null;
                return;
            }
        }

        if (this.gameState.moveCount >= 4 && this.gameState.boardState[index] === this.gameState.currentPlayer) {
            this.selectMarker(index, cell);
            return;
        }

        if (this.gameState.boardState[index] === null && this.gameState.playableCells.has(index)) {
            this.placeMarker(index, cell);
        }
    }

    placeMarker(index, cell) {
        this.gameState.boardState[index] = this.gameState.currentPlayer;
        cell.textContent = this.gameState.currentPlayer;
        cell.classList.add(this.gameState.currentPlayer);
        this.gameState.moveCount++;

        if (this.gameState.moveCount === 4) {
            this.enableGridControls();
        }

        this.handleMoveMade();
    }

    selectMarker(index, cell) {
        if (this.gameState.selectedMarker !== null) {
            this.clearSelectedMarker();
        }

        this.gameState.selectedMarker = index;
        cell.classList.add("selected");
        this.updateHelperText(`${this.gameState.currentPlayer}, select a new position to move selected marker to.`);
    }

    moveMarker(fromIndex, toIndex) {
        const fromCell = this.gameBoard.children[fromIndex];
        const toCell = this.gameBoard.children[toIndex];

        this.gameState.boardState[toIndex] = this.gameState.currentPlayer;
        this.gameState.boardState[fromIndex] = null;

        fromCell.textContent = "";
        fromCell.classList.remove(this.gameState.currentPlayer);
        toCell.textContent = this.gameState.currentPlayer;
        toCell.classList.add(this.gameState.currentPlayer);

        this.handleMoveMade();
    }

    clearSelectedMarker() {
        if (this.gameState.selectedMarker !== null) {
            const cell = this.gameBoard.children[this.gameState.selectedMarker];
            cell.classList.remove("selected");
        }

        this.gameState.selectedMarker = null;
    }

    moveGrid(direction) {
        const movements = {
            up: () => {
                if (this.gameState.gridPosition.row > 0) {
                    this.gameState.gridPosition.row--;
                    return true;
                }
                return false;
            },
            down: () => {
                if (this.gameState.gridPosition.row < 2) {
                    this.gameState.gridPosition.row++;
                    return true;
                }
                return false;
            },
            left: () => {
                if (this.gameState.gridPosition.col > 0) {
                    this.gameState.gridPosition.col--;
                    return true;
                }
                return false;
            },
            right: () => {
                if (this.gameState.gridPosition.col < 2) {
                    this.gameState.gridPosition.col++;
                    return true;
                }
                return false;
            }
        };

        if (movements[direction]()) {
            this.gameState.updatePlayableCells();
            this.updateBoard();

            this.handleMoveMade();
        }
    }

    handleMoveMade() {
        if (this.gameState.checkWin()) {
            this.endGame();
            return;
        } else {
            this.enableBoard()
        }

        this.gameState.switchPlayer();
        this.updateHelperText(`${this.gameState.currentPlayer}'s Turn`);
        this.updateBoard();

        if (this.isAIGame && this.gameState.currentPlayer === "O") {
            this.disableBoard();
            setTimeout(() => this.makeAIMove(), 500);
        }
    }

    enableGridControls() {
        document.querySelectorAll('.grid-control').forEach(control => control.disabled = false);
    }

    makeAIMove() {
        const aiMove = getAIMove(this.gameState);
        if (aiMove) {
            switch (aiMove.type) {
                case 'place':
                    const cell = this.gameBoard.children[aiMove.index];
                    this.placeMarker(aiMove.index, cell);
                    break;
                case 'move':
                    this.moveMarker(aiMove.from, aiMove.to);
                    break;
                case 'grid':
                    this.moveGrid(aiMove.direction);
                    break;
            }
        }
    }

    disableBoard() {
        document.querySelectorAll(".playable").forEach(cell => {
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);
        });
        document.querySelectorAll(".grid-control").forEach(control => {
            control.disabled = true;
        });
    }

    enableBoard() {
        document.querySelectorAll('.cell').forEach(cell => {
            const index = parseInt(cell.getAttribute('data-index'));
            if (this.gameState.playableCells.has(index)) {
                cell.classList.add('playable');
                cell.addEventListener('click', (e) => this.handleCellClick(e));
            }
        });
        document.querySelectorAll('.grid-control').forEach(control => {
            control.disabled = false;
        });
    }
}
