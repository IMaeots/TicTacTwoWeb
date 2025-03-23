export interface GridPosition {
  row: number;
  col: number;
}

export interface UIElements {
  gameHelper: HTMLParagraphElement;
  gameTimer: HTMLDivElement;
  gameBoard: HTMLDivElement;
  gameContainer: HTMLDivElement;
  moveUpButton: HTMLButtonElement;
  moveDownButton: HTMLButtonElement;
  moveLeftButton: HTMLButtonElement;
  moveRightButton: HTMLButtonElement;
  localGameButton: HTMLButtonElement;
  botGameButton: HTMLButtonElement;
  resetButton: HTMLButtonElement;
}

export type PlayerMark = 'X' | 'O';
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface AIMove {
  type: 'place' | 'move' | 'grid';
  index?: number;
  from?: number;
  to?: number;
  direction?: Direction;
}
