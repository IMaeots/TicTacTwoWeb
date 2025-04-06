<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'

onMounted(() => {
  setTimeout(() => {
    document.body.classList.add('visible')
  }, 100)
})
</script>

<template>
  <div class="app">
    <header>
      <h1>TicTacTwoVUEdition by IMaeots</h1>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>
