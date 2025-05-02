export function getAIMove(gameState) {
    let opponent = gameState.currentPlayer === "X" ? "O" : "X";

    const playerMarkerCount = gameState.boardState.filter(cell => cell === gameState.currentPlayer).length;
    
    if (playerMarkerCount < gameState.markersPerPlayer) {
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
    let { boardState, currentPlayer, gridPosition, playableCells } = gameState;
    let allBotMarkers = [];


    for (let cellIndex of playableCells) {
        if (boardState[cellIndex] === currentPlayer) {
            allBotMarkers.push(cellIndex);
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
    if (gameState.moveCount < gameState.numberOfTotalMovesForSpecials) return false;
    
    const { gridPosition } = gameState;
    switch (direction) {
        case 'up': return gridPosition.row > 0;
        case 'down': return gridPosition.row < 2;
        case 'left': return gridPosition.col > 0;
        case 'right': return gridPosition.col < 2;
    }
    return false;
}

function canWin(gameState, index, player) {
    let { boardState, gridPosition } = gameState;
    let testBoard = [...boardState];
    testBoard[index] = player;

    const baseWinPatterns = [
        [0, 1, 2], [5, 6, 7], [10, 11, 12],
        [0, 5, 10], [1, 6, 11], [2, 7, 12],
        [0, 6, 12], [2, 6, 10]
    ];

    let offset = gridPosition.row * 5 + gridPosition.col;

    let currentWinPatterns = baseWinPatterns.map(pattern =>
        pattern.map(i => i + offset)
    );

    return currentWinPatterns.some(pattern =>
        pattern.every(i => testBoard[i] === player)
    );
} 
