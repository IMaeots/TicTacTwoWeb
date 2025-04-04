<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/domain/stores/gameStore'
import GameMenu from '@/components/GameMenu.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    GameMenu
  },
  setup() {
    const router = useRouter()
    const store = useGameStore()

    const startLocalGame = () => {
      store.startLocalGame()
      router.push('/game')
    }

    const startBotGame = () => {
      store.startBotGame()
      router.push('/game')
    }

    return {
      startLocalGame,
      startBotGame
    }
  },
  mounted() {
    document.body.classList.add('visible')
  }
})
</script>

<template>
  <GameMenu
    :is-game-session-active="false"
    @start-local="startLocalGame"
    @start-bot="startBotGame"
  />
</template>
