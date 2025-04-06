<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/domain/stores/gameStore'
import GameMenu from '@/components/GameMenu.vue'
import GameBoard from "@/components/GameBoard.vue";

export default defineComponent({
  name: 'GameOverView',
  components: {
    GameBoard,
    GameMenu
  },
  setup() {
    const router = useRouter()
    const store = useGameStore()

    const gameResult = computed(() => {
      return store.winner ? `${store.winner} Wins` : `Draw!`
    })

    const gameDuration = computed(() => {
      return store.timerText
    })

    const playAgain = () => {
      store.resetGame()
      router.push('/game')
    }

    const backToHome = () => {
      store.$reset()
      router.push('/')
    }

    return {
      gameResult,
      gameDuration,
      playAgain,
      backToHome
    }
  }
})
</script>

<template>
  <div class="game-over">
    <h1>Game Over! <span style="color: #e74c3c; font-weight: bold">{{ gameResult }}</span></h1>
    <p class="game-duration">Game Duration: {{ gameDuration }}</p>
    <div class="winning-board">
      <GameBoard />
    </div>

    <GameMenu
      :is-game-session-active="true"
      :is-game-over="true"
      @play-again="playAgain"
      @back-to-home="backToHome"
    />
  </div>
</template>

<style scoped>
.game-over {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.winning-board {
  opacity: 0.6;
  pointer-events: none;
  margin: 16px 0;
}
</style>
