<template>
  <div class="tags-container">
    <button @click="toggleInputBar" class="new-tag-button">
      <FontAwesomeIcon :icon="['fas', 'plus']" /> New Tag
    </button>
    <div v-for="tag in props.tags" :key="tag" class="tag-button">
      {{ tag }}
      <font-awesome-icon
        class="remove-tag-icon"
        :icon="['fas', 'xmark']"
        @click="props.onRemoveTags(tag)"
      />
    </div>
    <div v-if="showInputBar" class="new-tag-input-container">
      <input
        name="newTagsInput"
        v-model="newTags"
        class="new-tag-input"
        placeholder="Enter comma separated tags"
        @keyup.enter="onAddTags"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  tags: {
    type: Array as PropType<string[]>,
    default: [] as string[]
  },
  onAddTags: {
    type: Function,
    required: true
  },
  onRemoveTags: {
    type: Function,
    required: true
  }
})

const showInputBar = ref(false)
const newTags = ref('')

const toggleInputBar = () => {
  showInputBar.value = !showInputBar.value
  newTags.value = ''
}
const onAddTags = () => {
  props.onAddTags(newTags.value)
  toggleInputBar()
}
</script>

<style scoped lang="less">
.tags-container {
  margin: 10px 0;
  display: flex;
  position: relative;
  align-items: center;
}
.base-button {
  font-weight: 500;
  font-size: 14px;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 6px;
}
.new-tag-button {
  .base-button();
  color: #2e5bff;
  border: 1px solid #2e5bff;
  background-color: white;
}
.tag-button {
  .base-button();
  color: rgb(46, 91, 255);
  border: none;
  background-color: #dee6ff;
  margin-left: 5px;
}
.remove-tag-icon {
  margin: 0 5px;
}
.new-tag-input-container {
  position: absolute;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 10px 10px;
  font-size: 14px;
  background-color: white;
  z-index: 1;
  top: 30px;
}
.new-tag-input {
  border-radius: 3px;
  border: 1px solid rgb(224, 231, 255);
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  padding: 8px 16px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    background-color: #f8fcfe;
    outline: none;
  }
  &::placeholder {
    color: #999999;
  }
}
</style>
