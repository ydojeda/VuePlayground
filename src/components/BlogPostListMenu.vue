<template>
  <div class="menu-container">
    <div
      class="menu-item"
      :class="{ 'active-menu-item': item === props.activeItem }"
      v-for="item in props.menuItems as string[]"
      @click="onPressMenuItem(item)"
      :key="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  onPressMenuItem: {
    type: Function,
    required: false
  },
  menuItems: {
    type: Array<String>,
    required: true
  },
  activeItem: {
    type: String,
    required: true
  }
})

const onPressMenuItem = (item: string) => {
  props.onPressMenuItem?.(item)
}
</script>

<style scoped lang="less">
@import 'src/assets/main';
@menu-width: 80px;

.menu-container {
  display: flex;
}
.menu-item {
  display: flex;
  min-width: @menu-width;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 10px;
  justify-content: center;
  &:hover {
    color: @soft-blue-color;
  }
}
.active-menu-item {
  border-bottom: 1px solid @soft-blue-color;
}
</style>
