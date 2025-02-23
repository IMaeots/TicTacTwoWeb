document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const gameHelper = document.getElementById("gameHelper");

    let currentPlayer = "X";
    let boardState = Array(25).fill(null);
    let moveCount = 0;
    let selectedMarker = null;
    let gridPosition = { row: 1, col: 1 };
    let playableCells = new Set([6, 7, 8, 11, 12, 13, 16, 17, 18]);

    function createBoard() {
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index", i);

            if (playableCells.has(i)) {
                cell.classList.add("playable");
                cell.addEventListener("click", handleCellClick);
            }

            gameBoard.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute("data-index"));

        if (selectedMarker !== null) {
            if (boardState[index] === null && playableCells.has(index)) {
                moveMarker(index);
                return;
            }
        }

        if (moveCount >= 4 && boardState[index] === currentPlayer) {
            selectMarker(index, cell);
            return;
        }

        if (boardState[index] === null && playableCells.has(index)) {
            placeMarker(index, cell);
        }
    }

    function handleMoveMade() {
        if (checkWin()) {
            endGame();
            return;
        }
        switchPlayer();
        updateHelperText(`${currentPlayer}'s Turn`);
    }

    function placeMarker(index, cell) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        moveCount++;

        if (moveCount === 4) {
            enableGridControls();
        }

        handleMoveMade();
    }

    function selectMarker(index, cell) {
        if (selectedMarker !== null) {
            clearSelectedMarker();
        }

        selectedMarker = index;
        cell.classList.add("selected");
        gameHelper.textContent = `${currentPlayer}, select a new position to move the marker.`;
    }

    function moveMarker(newIndex) {
        const oldCell = gameBoard.children[selectedMarker];
        const newCell = gameBoard.children[newIndex];

        boardState[newIndex] = currentPlayer;
        boardState[selectedMarker] = null;

        oldCell.textContent = "";
        oldCell.classList.remove(currentPlayer, "selected");
        newCell.textContent = currentPlayer;
        newCell.classList.add(currentPlayer);

        selectedMarker = null;

        handleMoveMade();
    }

    function clearSelectedMarker() {
        if (selectedMarker !== null) {
            const cell = gameBoard.children[selectedMarker];
            cell.classList.remove("selected");
        }
        selectedMarker = null;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        gameHelper.textContent = `${currentPlayer}'s Turn`;
    }

    function enableGridControls() {
        const controls = document.querySelectorAll('.grid-control');
        controls.forEach(control => control.disabled = false);
    }

    function updatePlayableCells() {
        const baseGrid = [
            [6, 7, 8],
            [11, 12, 13],
            [16, 17, 18]
        ];

        const offset = (gridPosition.row - 1) * 5 + (gridPosition.col - 1);
        playableCells.clear();

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const newIndex = baseGrid[row][col] + offset;
                if (newIndex >= 0 && newIndex < 25) {
                    playableCells.add(newIndex);
                }
            }
        }

        document.querySelectorAll('.cell').forEach(cell => {
            const index = parseInt(cell.getAttribute('data-index'));
            cell.classList.toggle('playable', playableCells.has(index));
            if (playableCells.has(index)) {
                cell.addEventListener('click', handleCellClick);
            } else {
                cell.removeEventListener('click', handleCellClick);
            }
        });
    }

    function moveGrid(direction) {
        const movements = {
            up: () => gridPosition.row > 0 && gridPosition.row--,
            down: () => gridPosition.row < 2 && gridPosition.row++,
            left: () => gridPosition.col > 0 && gridPosition.col--,
            right: () => gridPosition.col < 2 && gridPosition.col++
        };

        if (movements[direction]()) {
            updatePlayableCells();
            handleMoveMade();
        }
    }

    function checkWin() {
        const baseWinPatterns = [
            [6, 7, 8], [11, 12, 13], [16, 17, 18],
            [6, 11, 16], [7, 12, 17], [8, 13, 18],
            [6, 12, 18], [8, 12, 16]
        ];

        const offset = (gridPosition.row - 1) * 5 + (gridPosition.col - 1);

        const currentWinPatterns = baseWinPatterns.map(pattern =>
            pattern.map(index => {
                const newIndex = index + offset;
                return newIndex >= 0 && newIndex < 25 ? newIndex : null;
            })
        );

        return currentWinPatterns.some(pattern =>
            !pattern.includes(null) &&
            pattern.every(index => boardState[index] === currentPlayer)
        );
    }

    function disableBoard() {
        document.querySelectorAll(".playable").forEach(cell => {
            cell.removeEventListener("click", handleCellClick);
        });
        document.querySelectorAll(".grid-control").forEach(control => {
            control.disabled = true;
        });
    }

    function endGame() {
        disableBoard();
        gameHelper.textContent = `${currentPlayer} Wins!`;
    }

    function updateHelperText(text) {
        gameHelper.textContent = text;
    }

    document.getElementById('moveUp').addEventListener('click', () => moveGrid('up'));
    document.getElementById('moveDown').addEventListener('click', () => moveGrid('down'));
    document.getElementById('moveLeft').addEventListener('click', () => moveGrid('left'));
    document.getElementById('moveRight').addEventListener('click', () => moveGrid('right'));

    createBoard();
});
