export default class UIController {
    constructor(gameState) {
        this.gameState = gameState;
        this.gameBoard = document.getElementById("gameBoard");
        this.gameHelper = document.getElementById("gameHelper");
        this.setupControls();
        this.createBoard();
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
        if (this.gameState.winner) return;

        const cell = event.target;
        const index = parseInt(cell.getAttribute("data-index"));

        if (this.gameState.selectedMarker !== null) {
            if (this.gameState.boardState[index] === null && this.gameState.playableCells.has(index)) {
                this.moveMarker(index);
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

    moveMarker(newIndex) {
        const oldCell = this.gameBoard.children[this.gameState.selectedMarker];
        const newCell = this.gameBoard.children[newIndex];

        this.gameState.boardState[newIndex] = this.gameState.currentPlayer;
        this.gameState.boardState[this.gameState.selectedMarker] = null;

        oldCell.textContent = "";
        oldCell.classList.remove(this.gameState.currentPlayer, "selected");
        newCell.textContent = this.gameState.currentPlayer;
        newCell.classList.add(this.gameState.currentPlayer);

        this.gameState.selectedMarker = null;
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
        }

        this.gameState.switchPlayer();
        this.updateHelperText(`${this.gameState.currentPlayer}'s Turn`);
        this.updateBoard();
    }

    enableGridControls() {
        document.querySelectorAll('.grid-control').forEach(control => control.disabled = false);
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

    endGame() {
        this.disableBoard();
        this.gameState.winner = this.gameState.currentPlayer;
        this.updateHelperText(`🎉 ${this.gameState.currentPlayer} Wins Tic-Tac-Two! 🎉`);
    }

    updateHelperText(text) {
        this.gameHelper.textContent = text;
    }

    setupControls() {
        document.getElementById('moveUp').addEventListener('click', () => this.moveGrid('up'));
        document.getElementById('moveDown').addEventListener('click', () => this.moveGrid('down'));
        document.getElementById('moveLeft').addEventListener('click', () => this.moveGrid('left'));
        document.getElementById('moveRight').addEventListener('click', () => this.moveGrid('right'));
    }
}
