<script lang="ts">
import { defineComponent } from 'vue'
import { useGameStore } from '@/domain/stores/gameStore'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import GameBoard from '@/components/GameBoard.vue'
import GameMenu from '@/components/GameMenu.vue'

export default defineComponent({
  name: 'GameView',
  components: {
    GameBoard,
    GameMenu
  },
  setup() {
    const store = useGameStore()
    const router = useRouter()

    watch(() => store.winner, (newValue) => {
      if (newValue) {
        router.push('/game-over')
      }
    })

    return {
      store
    }
  }
})
</script>

<template>
  <div class="game-view">
    <div class="game-header">
      <p id="gameHelper">{{ store.gameHelperText }}</p>
      <div id="gameTimer" class="game-timer">{{ store.timerText }}</div>
    </div>

    <GameBoard />
    
    <GameMenu
      :is-game-session-active="true"
      @reset="store.resetGame"
    />
  </div>
</template>

<style scoped>
.game-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.game-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

#gameHelper {
  font-size: 16px;
  margin: 0;
  font-weight: bold;
}

.game-timer {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
