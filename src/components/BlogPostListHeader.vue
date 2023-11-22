<template>
  <div class="header-container">
    <div class="greetings-row">
      <UserSwitcher
        @click="toggleSelectionMode"
        :current-user="currentUser"
        :user-id="currentUser.userId"
      />
      <button v-on:click="goToNewForm" class="add-new-post-button">New Post</button>
    </div>

    <div v-if="isSelectionMode">
      <input class="user-search" v-model="searchValue" />
      <div class="user-selection-content">
        <p v-if="!users.length">No Users to Show</p>
        <div
          v-for="user in users"
          :key="user.userId"
          class="user-item"
          :class="{ 'selected-user-item': user.userId === currentUser.userId }"
          @click="selectUser(user.userId)"
        >
          {{ user.firstName }} {{ user.lastName }}
          <span class="user-company-text">({{ user.companyName }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import UserSwitcher from '@/components/UserSwitcher.vue'
import { useRouter } from 'vue-router'
import type { BlogUser } from '@/store/types'

const store = useStore()
const router = useRouter()
const isSelectionMode = ref(true)
const isSearching = ref(false)
const searchValue = ref('')
const timeoutVar = ref(0)
const currentUser = computed<BlogUser>(() => store.getters.currentUser)
const users = computed<BlogUser[]>(() => {
  const allUsers = [
    currentUser.value,
    ...store.getters.allUsers.filter((user: BlogUser) => user.userId !== currentUser.value.userId)
  ]
  return !isSearching.value && searchValue.value?.length
    ? allUsers.filter((user: BlogUser) =>
        `${user.firstName}${user.lastName}${user.companyName}`
          .toLowerCase()
          .includes(searchValue.value.toLowerCase())
      )
    : allUsers
})

const goToNewForm = () => {
  router.push({
    name: 'Blog post form'
  })
}

const toggleSelectionMode = () => {
  isSelectionMode.value = !isSelectionMode.value
}

const selectUser = (userId: string) => {
  store.dispatch('setCurrentUser', { userId })
  isSelectionMode.value = false
}

const toggleIsSearching = () => {
  isSearching.value = !isSearching.value
}

watch(searchValue, async () => {
  clearTimeout(timeoutVar.value)
  isSearching.value = true
  timeoutVar.value = setTimeout(() => {
    toggleIsSearching()
  }, 300)
})
</script>

<style scoped>
.header-container {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 20px 35px;
  position: sticky;
  left: 0;
  right: 10px;
  top: 0;
  z-index: 10;
  margin: 10px 0;
}
.greetings-row {
  display: flex;
  justify-content: space-between;
}
.user-selection-content {
  max-height: 150px;
  overflow-y: scroll;
}
.add-new-post-button {
  line-height: 32px;
  font-size: 14px;
  color: white;
  padding: 0 16px;
  border: rgb(36, 137, 218) 1px solid;
  border-radius: 4px;
  background-color: rgb(43, 155, 244);
  cursor: pointer;
  &:hover {
    background-color: #2489da;
  }
}
.user-item {
  padding: 4px 8px;
  margin: 4px 0;
  cursor: pointer;
  &:hover {
    color: #2b9bf4;
    text-decoration: #2b9bf4 underline;
  }
}
.user-company-text {
  color: #8795a1;
}
.selected-user-item {
  background-color: #f8f8f8;
  color: #2b9bf4;
}
.user-search {
  background-color: #f5f6f7;
  outline: none;
  border: none;
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin: 10px 0;
}
</style>
