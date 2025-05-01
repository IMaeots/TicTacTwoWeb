<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameStore } from '@/domain/stores/gameStore'
import GameMenu from '@/components/GameMenu.vue'

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

defineExpose({
  startLocalGame,
  startBotGame
})
</script>

<template>
  <GameMenu
    :is-game-session-active="false"
    @start-local="startLocalGame"
    @start-bot="startBotGame"
  />
</template>
