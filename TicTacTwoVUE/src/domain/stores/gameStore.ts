import { defineStore } from 'pinia';
import GameState from '@/domain/models/GameState';
import { Direction, MoveType, PlayerMark, GameResult } from '@/domain/models/Enums';
import { getAIMove } from '@/domain/utils/AIHelper';

export const useGameStore = defineStore('game', {
    state: () => ({
        gameState: new GameState(),
        timerText: '00:00',
        startTime: 0,
        isVsBot: false,
        gameStarted: false,
        isBotThinking: false,
        timerInterval: null as number | null
    }),

    getters: {
        boardState: (state) => state.gameState.boardState,
        selectedMarker: (state) => state.gameState.selectedMarker,
        currentPlayer: (state) => state.gameState.currentPlayer,
        winner: (state) => state.gameState.winner,
        gameHelperText: (state) => {
            if (state.gameState.winner) {
                return state.gameState.winner === GameResult.Draw ?
                    "🤝 It's a Draw! 🤝" : 
                    `${state.gameState.winner} Wins!`;
            }
            return `${state.gameState.currentPlayer}'s Turn`;
        }
    },

    actions: {
        startLocalGame() {
            this.gameStarted = true;
            this.isVsBot = false;
            this.startTimer();
        },

        startBotGame() {
            this.gameStarted = true;
            this.isVsBot = true;
            this.startTimer();
        },

        resetGame() {
            this.gameState.reset();
            this.startTimer();
        },

        startTimer() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }
            this.startTime = Date.now();
            this.updateTimer();
            this.timerInterval = window.setInterval(() => {
                this.updateTimer();
            }, 1000);
        },

        updateTimer() {
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            this.timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },

        isPlayableCell(index: number): boolean {
            return this.gameState.playableCells.has(index);
        },

        countPlayerMarkers(player: PlayerMark): number {
            return this.gameState.boardState.filter(cell => cell === player).length;
        },

        canMoveGrid(direction: Direction): boolean {
            if (this.gameState.moveCount < this.gameState.numberOfTotalMovesForSpecials) return false;

            const { gridPosition } = this.gameState;
            switch (direction) {
                case Direction.Up: return gridPosition.row > 0;
                case Direction.Down: return gridPosition.row < 2;
                case Direction.Left: return gridPosition.col > 0;
                case Direction.Right: return gridPosition.col < 2;
            }
        },

        async moveGrid(direction: Direction) {
            const { gridPosition } = this.gameState;
            let moved = false;
            
            switch (direction) {
                case Direction.Up:
                    if (gridPosition.row > 0) {
                        gridPosition.row--;
                        moved = true;
                    }
                    break;
                case Direction.Down:
                    if (gridPosition.row < 2) {
                        gridPosition.row++;
                        moved = true;
                    }
                    break;
                case Direction.Left:
                    if (gridPosition.col > 0) {
                        gridPosition.col--;
                        moved = true;
                    }
                    break;
                case Direction.Right:
                    if (gridPosition.col < 2) {
                        gridPosition.col++;
                        moved = true;
                    }
                    break;
            }
            
            if (moved) {
                this.gameState.updatePlayableCells();
                await this.moveMade();
            }
        },

        async handleCellClick(index: number): Promise<void> {
            if (!this.isPlayableCell(index)) return;
            
            const { boardState, selectedMarker, currentPlayer, moveCount, numberOfTotalMovesForSpecials } = this.gameState;
            
            if (selectedMarker === null) {
                if (boardState[index] === null) {
                    if (this.countPlayerMarkers(currentPlayer) >= this.gameState.markersPerPlayer) {
                        return;
                    }
                    boardState[index] = currentPlayer;
                    await this.moveMade()
                } else if (boardState[index] === currentPlayer && moveCount >= numberOfTotalMovesForSpecials) {
                    this.gameState.selectedMarker = index;
                }
            } else {
                if (boardState[index] === null) {
                    boardState[index] = currentPlayer;
                    boardState[selectedMarker] = null;
                    await this.moveMade();
                } else {
                    this.gameState.selectedMarker = null;
                }
            }
        },

        async makeBotMove(): Promise<void> {
            if (!this.isVsBot || this.isBotThinking || this.gameState.winner) return;
            
            if (this.gameState.currentPlayer === PlayerMark.O) {
                this.isBotThinking = true;
                
                try {
                    await this.delay(500);
                    
                    const move = getAIMove(this.gameState);
                    if (!move) return;
                    
                    switch (move.type) {
                        case MoveType.Place:
                            if (move.index !== undefined) {
                                if (this.countPlayerMarkers(this.gameState.currentPlayer) < this.gameState.markersPerPlayer) {
                                    await this.handleCellClick(move.index);
                                }
                            }
                            break;
                        case MoveType.Move:
                            if (move.from !== undefined && move.to !== undefined) {
                                await this.handleCellClick(move.from);
                                await this.delay(300);
                                await this.handleCellClick(move.to);
                            }
                            break;
                        case MoveType.Grid:
                            if (move.direction) {
                                await this.moveGrid(move.direction);
                            }
                            break;
                    }
                } finally {
                    this.isBotThinking = false;
                }
            }
        },

        delay(ms: number): Promise<void> {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        async moveMade(): Promise<void> {
            this.gameState.moveCount++;
            this.gameState.selectedMarker = null;
            if (this.gameState.checkAnyWin()) {
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                }
            } else {
                this.gameState.switchPlayer();
                if (this.isVsBot) {
                    await this.makeBotMove();
                }
            }
        }
    }
});
