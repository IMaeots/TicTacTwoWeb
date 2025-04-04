import GameState from '@/domain/models/GameState';
import { Direction, MoveType, PlayerMark } from '@/domain/models/Enums.ts';

export function getAIMove(gameState: GameState): AIMove | null {
  const opponent: PlayerMark = gameState.currentPlayer === PlayerMark.X ? PlayerMark.O : PlayerMark.X;

  const winningMove = findWinningMove(gameState, gameState.currentPlayer);
  if (winningMove !== null) {
    return { type: MoveType.Place, index: winningMove };
  }

  const blockingMove = findWinningMove(gameState, opponent);
  if (blockingMove !== null) {
    return { type: MoveType.Place, index: blockingMove };
  }

  const randomBasicMove = chooseRandomMove(gameState);
  if (randomBasicMove !== null) {
    return { type: MoveType.Place, index: randomBasicMove };
  }

  const reMove = getReMove(gameState);
  if (reMove !== null) {
    return { type: MoveType.Move, from: reMove.from, to: reMove.to };
  }

  const directions = Object.values(Direction);
  for (const direction of directions) {
    if (canMoveGrid(gameState, direction)) {
      return { type: MoveType.Grid, direction };
    }
  }

  return null;
}

function findWinningMove(gameState: GameState, player: PlayerMark): number | null {
  const { boardState, playableCells } = gameState;
  
  for (const cell of playableCells) {
    if (boardState[cell] === null && canWin(gameState, cell, player)) {
      return cell;
    }
  }

  return null;
}

function chooseRandomMove(gameState: GameState): number | null {
  const { boardState, playableCells } = gameState;
  const emptyCells: number[] = [];

  for (const cell of playableCells) {
    if (boardState[cell] === null) {
      emptyCells.push(cell);
    }
  }

  if (emptyCells.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
}

function getReMove(gameState: GameState): { from: number; to: number } | null {
  const { boardState, currentPlayer, gridPosition } = gameState;
  const allBotMarkers: number[] = [];

  const startX = gridPosition.row * 5;
  const startY = gridPosition.col;

  for (let x = startX; x < startX + 3; x++) {
    for (let y = startY; y < startY + 3; y++) {
      const index = x + y * 5;
      if (boardState[index] === currentPlayer) {
        allBotMarkers.push(index);
      }
    }
  }

  if (allBotMarkers.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * allBotMarkers.length);
  const fromIndex = allBotMarkers[randomIndex];

  const toIndex = chooseRandomMove(gameState);
  if (toIndex === null || toIndex === fromIndex) return null;

  return { from: fromIndex, to: toIndex };
}

function canMoveGrid(gameState: GameState, direction: Direction): boolean {
  const { gridPosition } = gameState;
  switch (direction) {
    case Direction.Up: return gridPosition.row > 0;
    case Direction.Down: return gridPosition.row < 2;
    case Direction.Left: return gridPosition.col > 0;
    case Direction.Right: return gridPosition.col < 2;
  }
}

function canWin(gameState: GameState, index: number, player: PlayerMark): boolean {
  const {boardState, gridPosition} = gameState;
  const testBoard = [...boardState];
  testBoard[index] = player;

  const baseWinPatterns: number[][] = [
    [0, 1, 2], [5, 6, 7], [10, 11, 12],
    [0, 5, 10], [1, 6, 11], [2, 7, 12],
    [0, 6, 12], [2, 6, 10]
  ];

  const offset = gridPosition.row * 5 + gridPosition.col;

  const currentWinPatterns = baseWinPatterns.map(pattern =>
      pattern.map(i => i + offset)
  );

  return currentWinPatterns.some(pattern =>
      pattern.every(i => testBoard[i] === player)
  );
}

interface AIMove {
  type: MoveType,
  index?: number;
  from?: number;
  to?: number;
  direction?: Direction;
}
