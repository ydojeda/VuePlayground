<template>
  <router-link :to="props.pathId" v-slot="{ isActive }" class="item-container">
    <div v-if="isActive" class="active-bar-indicator" />
    <font-awesome-icon :icon="['fas', props.icon]" font-size="25" />
  </router-link>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const props = defineProps({
  pathId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="less">
.item-container {
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 9px;
  color: #96a2ac;
  &.router-link-active {
    color: white;
  }
}
.active-bar-indicator {
  position: absolute;
  left: 0;
  width: 3px;
  background-color: white;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
  height: 44px;
}
</style>
