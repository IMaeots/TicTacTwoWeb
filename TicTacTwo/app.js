document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const gameHelper = document.getElementById("gameHelper");

    let currentPlayer = "X";
    let boardState = Array(25).fill(null);
    let moveCount = 0;
    let playableCells = new Set([6, 7, 8, 11, 12, 13, 16, 17, 18]);
    let selectedMarker = null;

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

        if (moveCount >= 6 && boardState[index] === currentPlayer) {
            selectMarker(index, cell);
            return;
        }

        if (boardState[index] === null && playableCells.has(index)) {
            placeMarker(index, cell);
        }
    }

    function placeMarker(index, cell) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        moveCount++;

        if (checkWin()) {
            gameHelper.textContent = `${currentPlayer} Wins!`;
            disableBoard();
            return;
        }

        switchPlayer();
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

        if (checkWin()) {
            gameHelper.textContent = `${currentPlayer} Wins!`;
            disableBoard();
            return;
        }

        switchPlayer();
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

    // TODO: Currently accounts only for hardcoded size & non-movable grid.
    function checkWin() {
        const winPatterns = [
            [6, 7, 8], [11, 12, 13], [16, 17, 18],
            [6, 11, 16], [7, 12, 17], [8, 13, 18],
            [6, 12, 18], [8, 12, 16]
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => boardState[index] === currentPlayer)
        );
    }

    function disableBoard() {
        document.querySelectorAll(".playable").forEach(cell => {
            cell.removeEventListener("click", handleCellClick);
        });
    }

    createBoard();
});
