export default class GameState {
    constructor() {
        this.currentPlayer = "X";
        this.boardState = Array(25).fill(null);
        this.moveCount = 0;
        this.selectedMarker = null;
        this.gridPosition = {row: 1, col: 1};
        this.playableCells = new Set([6, 7, 8, 11, 12, 13, 16, 17, 18]);
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }

    checkWin() {
        const baseWinPatterns = [
            [6, 7, 8], [11, 12, 13], [16, 17, 18],
            [6, 11, 16], [7, 12, 17], [8, 13, 18],
            [6, 12, 18], [8, 12, 16]
        ];

        const offset = (this.gridPosition.row - 1) * 5 + (this.gridPosition.col - 1);

        const currentWinPatterns = baseWinPatterns.map(pattern =>
            pattern.map(index => {
                const newIndex = index + offset;
                return newIndex >= 0 && newIndex < 25 ? newIndex : null;
            })
        );

        return currentWinPatterns.some(pattern =>
            !pattern.includes(null) &&
            pattern.every(index => this.boardState[index] === this.currentPlayer)
        );
    }

    updatePlayableCells() {
        const baseGrid = [
            [6, 7, 8],
            [11, 12, 13],
            [16, 17, 18]
        ];

        const offset = (this.gridPosition.row - 1) * 5 + (this.gridPosition.col - 1);
        this.playableCells.clear();

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const newIndex = baseGrid[row][col] + offset;
                if (newIndex >= 0 && newIndex < 25) {
                    this.playableCells.add(newIndex);
                }
            }
        }
    }
}
