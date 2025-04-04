<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '@/domain/stores/gameStore'
import { Direction } from "@/domain/models/Enums.ts";

export default defineComponent({
  name: 'GameBoard',
  computed: {
    Direction() {
      return Direction
    }
  },
  setup() {
    const store = useGameStore()

    return {
      store,
      isPlayableCell: store.isPlayableCell,
      canMoveGrid: store.canMoveGrid,
      moveGrid: store.moveGrid,
      handleCellClick: store.handleCellClick
    }
  }
})
</script>

<template>
  <div :class="['game-board-container', { disabled: store.isBotThinking }]">
    <button class="grid-control" :disabled="!store.canMoveGrid(Direction.Up)" @click="store.moveGrid(Direction.Up)">↑</button>
    
    <div class="middle-layer">
      <button class="grid-control" :disabled="!store.canMoveGrid(Direction.Left)" @click="store.moveGrid(Direction.Left)">←</button>
      
      <div id="gameBoard">
        <div v-for="(cell, index) in store.boardState" 
             :key="index"
             class="cell"
             :class="{
               'playable': store.isPlayableCell(index),
               'selected': store.selectedMarker === index,
               'X': cell === 'X',
               'O': cell === 'O'
             }"
             @click="store.handleCellClick(index)">
          {{ cell }}
        </div>
      </div>
      
      <button class="grid-control" :disabled="!store.canMoveGrid(Direction.Right)" @click="store.moveGrid(Direction.Right)">→</button>
    </div>
    
    <button class="grid-control" :disabled="!store.canMoveGrid(Direction.Down)" @click="store.moveGrid(Direction.Down)">↓</button>
  </div>
</template>

<style scoped>
.game-board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.game-board-container.disabled {
  opacity: 0.8;
  pointer-events: none;
}

#gameBoard {
  display: grid;
  grid-template-columns: repeat(5, 96px);
  grid-template-rows: repeat(5, 96px);
  gap: 8px;
  background-color: #ccc;
  padding: 10px;
  border-radius: 8px;
  margin: 10px;
  justify-content: center;
}

.middle-layer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.grid-control {
  padding: 8px 16px;
  font-size: 24px;
  cursor: pointer;
  background-color: #34495e;
  color: white;
  border: none;
  border-radius: 4px;
  width: 50px;
  height: 50px;
  margin: 5px;
}

.grid-control:disabled {
  background-color: #7f8c8d;
  opacity: 0.5;
  cursor: not-allowed;
}

.grid-control:not(:disabled):hover {
  background-color: #2c3e50;
}

.cell {
  width: 96px;
  height: 96px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: bold;
  cursor: default;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.cell.playable {
  background-color: lightskyblue;
  cursor: pointer;
}

.cell.playable:hover {
  background-color: lightblue;
}

.cell.X {
  color: #e74c3c;
}

.cell.O {
  color: #3498db;
}

.cell.selected {
  background-color: #f1c40f;
}

@media (max-width: 800px) {
  #gameBoard {
    grid-template-columns: repeat(5, 80px);
    grid-template-rows: repeat(5, 80px);
  }
  .cell {
    width: 80px;
    height: 80px;
    font-size: 3rem;
  }
}

@media (max-width: 600px) {
  #gameBoard {
    grid-template-columns: repeat(5, 60px);
    grid-template-rows: repeat(5, 60px);
  }
  .cell {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
  .grid-control {
    width: 40px;
    height: 40px;
    font-size: 16px;
    padding: 4px 8px;
  }
}
</style>
