<script setup lang="ts">
const props = defineProps<{
  isGameSessionActive: boolean
  isGameOver?: boolean
}>()

const emit = defineEmits<{
  (e: 'start-local'): void
  (e: 'start-bot'): void
  (e: 'reset'): void
  (e: 'play-again'): void
  (e: 'back-to-home'): void
}>()

defineExpose({
  isGameSessionActive: props.isGameSessionActive,
  isGameOver: props.isGameOver,
  $emit: emit
})
</script>

<template>
  <div class="menu-controls">
    <div v-if="!isGameSessionActive">
      <button class="menu-button" @click="$emit('start-local')">Local Two Player</button>
      <button class="menu-button" @click="$emit('start-bot')">VS Computer</button>
    </div>
    <div v-if="isGameSessionActive && isGameOver">
      <button class="menu-button" @click="$emit('play-again')">Play Again</button>
      <button class="menu-button" @click="$emit('back-to-home')">Back To Home</button>
    </div>
    <button v-if="isGameSessionActive && !isGameOver"
            class="menu-button" @click="$emit('reset')">Reset Game</button>
  </div>
</template>

<style scoped>
.menu-controls,
.menu-controls div {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.menu-button {
  padding: 12px 32px;
  font-size: 18px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
}

.menu-button:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
}

.menu-button:active {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
  .menu-button {
    padding: 10px 20px;
    font-size: 16px;
    min-width: 160px;
  }
}
</style>
