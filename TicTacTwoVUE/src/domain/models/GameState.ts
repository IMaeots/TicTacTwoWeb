import {GameResult, PlayerMark} from "@/domain/models/Enums.ts";

export default class GameState {
  public currentPlayer!: PlayerMark;
  public boardState!: Array<PlayerMark | null>;
  public moveCount!: number;
  public selectedMarker!: number | null;
  public gridPosition!: GridPosition;
  public playableCells!: Set<number>;
  public winner!: GameResult | null;

  constructor() {
    this.reset();
  }

  public reset(): void {
    this.currentPlayer = PlayerMark.X;
    this.boardState = Array(25).fill(null);
    this.moveCount = 0;
    this.selectedMarker = null;
    this.gridPosition = { row: 1, col: 1 };
    this.playableCells = new Set([6, 7, 8, 11, 12, 13, 16, 17, 18]);
    this.winner = null;
  }

  public switchPlayer(): void {
    this.currentPlayer = this.currentPlayer === PlayerMark.X ? PlayerMark.O : PlayerMark.X;
  }

  public checkAnyWin(): boolean {
    const baseWinPatterns: number[][] = [
      [6, 7, 8], [11, 12, 13], [16, 17, 18],
      [6, 11, 16], [7, 12, 17], [8, 13, 18],
      [6, 12, 18], [8, 12, 16]
    ];

    const offset = (this.gridPosition.row - 1) * 5 + (this.gridPosition.col - 1);
    const winners = new Set<PlayerMark>();

    const currentWinPatterns = baseWinPatterns.map(pattern =>
        pattern.map(index => {
          const newIndex = index + offset;
          return newIndex >= 0 && newIndex < 25 ? newIndex : null;
        })
    );

    for (const pattern of currentWinPatterns) {
      if (pattern.includes(null)) continue;

      const [a, b, c] = pattern as number[];
      const player = this.boardState[a];

      if (player && this.boardState[b] === player && this.boardState[c] === player) {
        winners.add(player);
      }
    }

    if (winners.size === 1) {
      this.winner = Array.from(winners)[0] === PlayerMark.X ? GameResult.X : GameResult.O;
      return true;
    } else if (winners.size > 1) {
      this.winner = GameResult.Draw;
      return true;
    }

    return false;
  }


  public updatePlayableCells(): void {
    const baseGrid: number[][] = [
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

interface GridPosition {
  row: number;
  col: number;
}
