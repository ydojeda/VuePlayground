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

// toggle between showing users list for switching or hiding it
const isSelectionMode = ref(false)
// boolean for determining if user is typing in search bar
const isSearching = ref(false)
const searchValue = ref('')
const timeoutVar = ref(0)

const currentUser = computed<BlogUser>(() => store.getters.currentUser)

const users = computed<BlogUser[]>(() => {
  // make sure that the current user is always on top of the list
  const allUsers = [
    currentUser.value,
    ...store.getters.allUsers.filter((user: BlogUser) => user.userId !== currentUser.value.userId)
  ]
  // if user is not typing (!isSearching) and there's a search value
  //  return a filtered list
  //  otherwise, return list of all users
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
    name: 'blog-post-new'
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

// watch changes for search value to determine if user is typing in search bar
watch(searchValue, async () => {
  clearTimeout(timeoutVar.value)
  isSearching.value = true
  // for every change in search value, set isSearching is true
  // and toggle isSearching off after a certain delay
  timeoutVar.value = setTimeout(() => {
    toggleIsSearching()
  }, 300)
})
</script>

<style scoped lang="less">
@import 'src/assets/main';

.header-container {
  .page-content-container();
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
  .base-button();
  line-height: 32px;
  color: white;
  padding: 0 16px;
  border: @soft-blue-hover-color 1px solid;
  background-color: @soft-blue-color;
  &:hover {
    background-color: @soft-blue-hover-color;
  }
}
.user-item {
  padding: 4px 8px;
  margin: 4px 0;
  cursor: pointer;
  &:hover {
    color: @soft-blue-color;
    text-decoration: @soft-blue-color underline;
  }
}
.user-company-text {
  color: @gray-color;
}
.selected-user-item {
  background-color: @muted-border-color;
  color: @soft-blue-color;
}
.user-search {
  background-color: @muted-border-color;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  margin: 10px 0;
}
</style>
