<template>
  <main>
    <h1>{{ header }}</h1>
    <input v-model="newItem" @keyup.enter="addNewItem" type="text" placeholder="Add an item" />
    <label>
      <input type="checkbox" v-model="isNewItemPriority" />
      High Priority
    </label>
    <p v-if="!items.length">Nothing to shop</p>
    <ul>
      <li
        v-for="item in orderedItems"
        :key="item.id"
        class="static-class"
        :class="{ strikeout: item.purchased, priority: item.priority }"
        @click="togglePurchased(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { uuid } from 'vue-uuid'
const header = ref('Shopping List App')
const items = ref([
  { text: '10 party hats', id: uuid.v1(), priority: false, purchased: false },
  { text: '2 board games', id: uuid.v1(), priority: false, purchased: false },
  { text: '20 cups', id: uuid.v1(), priority: false, purchased: true }
])
const orderedItems = computed(() => [...items.value].reverse())
const newItem = ref('')
const isNewItemPriority = ref(false)
const addNewItem = () => {
  if (newItem.value.length) {
    items.value.push({
      id: uuid.v1(),
      text: newItem.value,
      priority: isNewItemPriority.value,
      purchased: false
    })
    newItem.value = ''
    isNewItemPriority.value = false
  }
}
const togglePurchased = (item) => {
  item.purchased = !item.purchased
}
</script>

<style scoped>
main {
  padding: 10px;
}

h1 {
  color: #3d4852;
  margin: 10px 0;
}

ul {
  list-style: none;
  padding: 0;
}

a {
  color: #6cb2eb;
  font-size: 1.25rem;
  transition: all 0.1s ease-in;
  margin-top: 0.5rem;
  display: block;
}

a:hover {
  color: #3490dc;
}

li,
p {
  display: flex;
  align-items: center;
  line-height: 1.75;
  letter-spacing: 0.5px;
  color: #3d4852;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.1s ease-in;
  margin: 5px 0;
}

li:hover {
  color: #22292f;
}

li input {
  margin: 0 0.5rem 0;
}

#shopping-list > input,
#shopping-list > select {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f8;
  color: #606f7b;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0.5rem 0;
}

.add-item-form input {
  width: 70%;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f8;
  color: #606f7b;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0.5rem 0;
}

.strikeout {
  text-decoration: line-through;
  color: #b8c2cc;
}

.strikeout:hover {
  color: #8795a1;
}

.priority {
  color: #de751f;
}
input[type='checkbox'] {
  display: inline !important;
  box-shadow: none;
  width: auto;
}
</style>
