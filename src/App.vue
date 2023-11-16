<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Vue Fundamentals</RouterLink>
      <RouterLink to="/ex2">Component Fundamentals</RouterLink>
    </nav>
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

nav a.router-link-exact-active {
  color: var(--color-text);
  margin: 5px;
}
</style>
