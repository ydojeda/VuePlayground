<template>
  <div class="nav-container">
    <NavBarItem
      v-for="item in NavBarItemData"
      :key="item.pathId"
      :icon="item.icon_code"
      :name="item.name"
      :pathId="item.pathId"
    />
  </div>
</template>

<script setup lang="ts">
import { NavBarItemData } from './constants'
import NavBarItem from '@/components/NavigationBar/NavBarItem.vue'
</script>

<style scoped>
.nav-container {
  width: 62px;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  z-index: 1;
  background-color: #3c415b;
}
</style>
