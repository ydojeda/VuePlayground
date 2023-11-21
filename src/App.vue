<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavigationBar/NavBar.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'

onMounted(() => {
  const store = useStore()
  store.dispatch('resetUserData')
})
</script>

<template>
  <header>
    <NavBar />
  </header>
  <RouterView />
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}
header {
  position: absolute;
  width: 100%;
}
</style>
