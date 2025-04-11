import GameState from '../models/GameState';
import { Direction, UIElements, GameResult } from '../models/Interfaces';
import { getAIMove } from '../utils/AIHelper';

export default class GameController {
  private readonly gameState: GameState;
  private gameBoard: HTMLDivElement;
  private gameHelper: HTMLParagraphElement;
  private gameTimer: HTMLDivElement;
  private readonly isAIGame: boolean;
  private timerInterval: number | null;
  private gameTime: number;

  constructor(gameState: GameState, ui: UIElements, isAIGame = false) {
    this.gameState = gameState;
    this.gameBoard = ui.gameBoard;
    this.gameHelper = ui.gameHelper;
    this.gameTimer = ui.gameTimer;
    
    this.isAIGame = isAIGame;
    this.timerInterval = null;
    this.gameTime = 0;
    
    this.setupControls(ui);
  }

  private setupControls(ui: UIElements): void {
    this.setupMovementControls(ui);
    this.setupResetControl(ui.resetButton);
  }

  private setupMovementControls(ui: UIElements): void {
    ui.moveUpButton.addEventListener('click', () => this.moveGrid('up'));
    ui.moveDownButton.addEventListener('click', () => this.moveGrid('down'));
    ui.moveLeftButton.addEventListener('click', () => this.moveGrid('left'));
    ui.moveRightButton.addEventListener('click', () => this.moveGrid('right'));
  }

  private setupResetControl(resetButton: HTMLButtonElement): void {
    resetButton.addEventListener('click', () => this.resetGame());
  }

  private startTimer(): void {
    this.gameTime = 0;
    this.updateTimerDisplay();
    this.gameTimer.style.display = 'block';
    this.timerInterval = window.setInterval(() => {
      this.gameTime++;
      this.updateTimerDisplay();
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private updateTimerDisplay(): void {
    const minutes = Math.floor(this.gameTime / 60).toString().padStart(2, '0');
    const seconds = (this.gameTime % 60).toString().padStart(2, '0');
    this.gameTimer.textContent = `${minutes}:${seconds}`;
  }

  public initializeGame(): void {
    this.createBoard();
    this.updateHelperText(`${this.gameState.currentPlayer}'s Turn`);
    this.startTimer();
    const controls = document.querySelectorAll<HTMLButtonElement>('.grid-control');
    controls.forEach(control => {
      control.disabled = true;
    });
  }

  private resetGame(): void {
    this.gameState.reset();
    this.stopTimer();
    this.initializeGame();
    this.clearSelectedMarker();
  }

  private updateHelperText(text: string): void {
    this.gameHelper.textContent = text;
  }

  private endGame(): void {
    this.disableBoard();
    this.updateHelperText(this.gameState.winner === GameResult.Draw ? 
        "🤝 It's a Draw! 🤝" : 
        `🎉 ${this.gameState.winner} Wins Tic-Tac-Two! 🎉`);
    this.stopTimer();
  }

  private createBoard(): void {
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

  private updateBoard(): void {
    const cells = document.querySelectorAll<HTMLDivElement>('.cell');
    cells.forEach(cell => {
      const indexAttr = cell.getAttribute('data-index');
      if (!indexAttr) return;
      
      const index = parseInt(indexAttr);
      cell.textContent = this.gameState.boardState[index] || "";
      cell.classList.toggle('playable', this.gameState.playableCells.has(index));
      cell.classList.remove("X", "O", "selected");

      if (this.gameState.boardState[index]) {
        cell.classList.add(this.gameState.boardState[index] as string);
      }

      if (this.gameState.selectedMarker === index) {
        cell.classList.add("selected");
      }

      if (this.gameState.playableCells.has(index)) {
        cell.addEventListener('click', (e) => this.handleCellClick(e));
      } else {
        const newCell = cell.cloneNode(true) as HTMLDivElement;
        if (cell.parentNode) {
          cell.parentNode.replaceChild(newCell, cell);
        }
      }
    });
  }

  private handleCellClick(event: MouseEvent): void {
    if (this.gameState.winner || (this.isAIGame && this.gameState.currentPlayer === "O")) return;

    const target = event.target as HTMLElement;
    if (!(target instanceof HTMLElement)) return;

    const indexAttr = target.getAttribute("data-index");
    if (!indexAttr) return;
    
    const index = parseInt(indexAttr);

    if (this.gameState.selectedMarker !== null) {
      if (this.gameState.boardState[index] === null && this.gameState.playableCells.has(index)) {
        this.moveMarker(this.gameState.selectedMarker, index);
        this.gameState.selectedMarker = null;
        return;
      }
    }

    if (this.gameState.moveCount >= 4 && this.gameState.boardState[index] === this.gameState.currentPlayer) {
      this.selectMarker(index, target as HTMLDivElement);
      return;
    }

    if (this.gameState.boardState[index] === null && this.gameState.playableCells.has(index)) {
      this.placeMarker(index, target as HTMLDivElement);
    }
  }

  private placeMarker(index: number, cell: HTMLDivElement): void {
    this.gameState.boardState[index] = this.gameState.currentPlayer;
    cell.textContent = this.gameState.currentPlayer;
    cell.classList.add(this.gameState.currentPlayer);
    this.gameState.moveCount++;

    if (this.gameState.moveCount === 4) {
      this.enableGridControls();
    }

    this.handleMoveMade();
  }

  private selectMarker(index: number, cell: HTMLDivElement): void {
    if (this.gameState.selectedMarker !== null) {
      this.clearSelectedMarker();
    }

    this.gameState.selectedMarker = index;
    cell.classList.add("selected");
    this.updateHelperText(`${this.gameState.currentPlayer}, select a new position to move selected marker to.`);
  }

  private moveMarker(fromIndex: number, toIndex: number): void {
    const children = Array.from(this.gameBoard.children);
    const fromCell = children[fromIndex] as HTMLDivElement;
    const toCell = children[toIndex] as HTMLDivElement;

    this.gameState.boardState[toIndex] = this.gameState.currentPlayer;
    this.gameState.boardState[fromIndex] = null;

    fromCell.textContent = "";
    fromCell.classList.remove(this.gameState.currentPlayer);
    toCell.textContent = this.gameState.currentPlayer;
    toCell.classList.add(this.gameState.currentPlayer);

    this.handleMoveMade();
  }

  private clearSelectedMarker(): void {
    if (this.gameState.selectedMarker !== null) {
      const children = Array.from(this.gameBoard.children);
      const cell = children[this.gameState.selectedMarker] as HTMLDivElement;
      cell.classList.remove("selected");
    }

    this.gameState.selectedMarker = null;
  }

  private moveGrid(direction: Direction): void {
    const movements: Record<Direction, () => boolean> = {
      up: (): boolean => {
        if (this.gameState.gridPosition.row > 0) {
          this.gameState.gridPosition.row--;
          return true;
        }
        return false;
      },
      down: (): boolean => {
        if (this.gameState.gridPosition.row < 2) {
          this.gameState.gridPosition.row++;
          return true;
        }
        return false;
      },
      left: (): boolean => {
        if (this.gameState.gridPosition.col > 0) {
          this.gameState.gridPosition.col--;
          return true;
        }
        return false;
      },
      right: (): boolean => {
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

  private handleMoveMade(): void {
    this.clearSelectedMarker();
    if (this.gameState.checkAnyWin()) {
      this.endGame();
      return;
    } else {
      this.enableBoard();
    }

    this.gameState.switchPlayer();
    this.updateHelperText(`${this.gameState.currentPlayer}'s Turn`);
    this.updateBoard();

    if (this.isAIGame && this.gameState.currentPlayer === "O") {
      this.disableBoard();
      setTimeout(() => this.makeAIMove(), 500);
    }
  }

  private enableGridControls(): void {
    const controls = document.querySelectorAll<HTMLButtonElement>('.grid-control');
    controls.forEach(control => {
      control.disabled = false;
    });
  }

  private makeAIMove(): void {
    const aiMove = getAIMove(this.gameState);
    if (!aiMove) return;

    switch (aiMove.type) {
      case 'place':
        if (typeof aiMove.index === 'number') {
          const children = Array.from(this.gameBoard.children);
          const cell = children[aiMove.index] as HTMLDivElement;
          this.placeMarker(aiMove.index, cell);
        }
        break;
      case 'move':
        if (typeof aiMove.from === 'number' && typeof aiMove.to === 'number') {
          this.moveMarker(aiMove.from, aiMove.to);
        }
        break;
      case 'grid':
        if (aiMove.direction) {
          this.moveGrid(aiMove.direction);
        }
        break;
    }
  }

  private disableBoard(): void {
    const playableCells = document.querySelectorAll<HTMLDivElement>(".playable");
    playableCells.forEach(cell => {
      const newCell = cell.cloneNode(true) as HTMLDivElement;
      if (cell.parentNode) {
        cell.parentNode.replaceChild(newCell, cell);
      }
    });
    
    const controls = document.querySelectorAll<HTMLButtonElement>(".grid-control");
    controls.forEach(control => {
      control.disabled = true;
    });
  }

  private enableBoard(): void {
    const cells = document.querySelectorAll<HTMLDivElement>('.cell');
    cells.forEach(cell => {
      const indexAttr = cell.getAttribute('data-index');
      if (!indexAttr) return;
      
      const index = parseInt(indexAttr);
      if (this.gameState.playableCells.has(index)) {
        cell.classList.add('playable');
        cell.addEventListener('click', (e) => this.handleCellClick(e));
      }
    });
    
    const controls = document.querySelectorAll<HTMLButtonElement>('.grid-control');
    controls.forEach(control => {
      control.disabled = this.gameState.moveCount < 4;
    });
  }
}
