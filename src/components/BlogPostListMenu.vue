<template>
  <div class="menu-container">
    <div
      class="menu-item"
      :class="{ 'active-menu-item': item === props.activeItem }"
      v-for="item in props.menuItems"
      @click="props.onPressMenuItem?.(item)"
      :key="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  onPressMenuItem: {
    type: Function,
    required: false
  },
  menuItems: {
    type: Array as PropType<string[]>,
    required: true
  },
  activeItem: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.menu-container {
  display: flex;
}
.menu-item {
  display: flex;
  min-width: 80px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 10px;
  justify-content: center;
  &:hover {
    color: #2b9bf4;
  }
}
.active-menu-item {
  border-bottom: 1px solid rgb(0, 126, 255);
}
</style>
