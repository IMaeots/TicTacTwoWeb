export function getAIMove(gameState) {
    let opponent = gameState.currentPlayer === "X" ? "O" : "X";

    let winningMove = findWinningMove(gameState, gameState.currentPlayer);
    if (winningMove !== null) {
        return { type: 'place', index: winningMove };
    }

    let blockingMove = findWinningMove(gameState, opponent);
    if (blockingMove !== null) {
        return { type: 'place', index: blockingMove };
    }

    let randomBasicMove = chooseRandomMove(gameState);
    if (randomBasicMove !== null) {
        return { type: 'place', index: randomBasicMove };
    }

    let reMove = getReMove(gameState);
    if (reMove !== null) {
        return { type: 'move', from: reMove.from, to: reMove.to};
    }

    let directions = ['up', 'down', 'left', 'right'];
    for (let direction of directions) {
        if (canMoveGrid(gameState, direction)) {
            return { type: 'grid', direction };
        }
    }

    return null;
}

function findWinningMove(gameState, player) {
    let { boardState, playableCells } = gameState;
    for (let cell of playableCells) {
        if (boardState[cell] === null && canWin(gameState, cell, player)) {
            return cell;
        }
    }

    return null;
}

function chooseRandomMove(gameState) {
    let { boardState, playableCells } = gameState;
    let emptyCells = [];

    for (let cell of playableCells) {
        if (boardState[cell] === null) {
            emptyCells.push(cell);
        }
    }

    if (emptyCells.length === 0) return null;

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
}

function getReMove(gameState) {
    let { boardState, currentPlayer, gridPosition } = gameState;
    let allBotMarkers = [];

    let startX = gridPosition.row * 5;
    let startY = gridPosition.col;

    for (let x = startX; x < startX + 3; x++) {
        for (let y = startY; y < startY + 3; y++) {
            let index = x + y * 5;
            if (boardState[index] === currentPlayer) {
                allBotMarkers.push(index);
            }
        }
    }

    if (allBotMarkers.length === 0) return null;

    let randomIndex = Math.floor(Math.random() * allBotMarkers.length);
    let fromIndex = allBotMarkers[randomIndex];

    let toIndex = chooseRandomMove(gameState);
    if (toIndex === null || toIndex === fromIndex) return null;

    return { from: fromIndex, to: toIndex };
}

function canMoveGrid(gameState, direction) {
    let { gridPosition } = gameState;
    switch (direction) {
        case 'up': return gridPosition.row > 0;
        case 'down': return gridPosition.row < 2;
        case 'left': return gridPosition.col > 0;
        case 'right': return gridPosition.col < 2;
        default: return false;
    }
}

function canWin(gameState, index, player) {
    let { boardState, gridPosition } = gameState;
    let testBoard = [...boardState];
    testBoard[index] = player;

    let baseWinPatterns = [
        [6, 7, 8], [11, 12, 13], [16, 17, 18],
        [6, 11, 16], [7, 12, 17], [8, 13, 18],
        [6, 12, 18], [8, 12, 16]
    ];

    let offset = gridPosition.row * 5 + gridPosition.col;

    let currentWinPatterns = baseWinPatterns.map(pattern =>
        pattern.map(i => i + offset)
    );

    return currentWinPatterns.some(pattern =>
        pattern.every(i => testBoard[i] === player)
    );
} 
