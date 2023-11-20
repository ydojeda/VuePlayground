<template>
  <div>
    <p class="current-user-name">Hi, {{ selectedUser.firstName }} &#x1F44B;</p>
    <p class="switch-user-text">View as someone else...</p>
    <div v-if="isSwitching">
      <!-- TODO implement user selector -->
      <div>{{ selectedUser.firstName }}</div>
      <div v-for="user in allUsers" :key="user.userId">{{ user.firstName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { useStore } from 'vuex'
import { type BlogUser } from '@/store/types'

const props = defineProps({
  currentUser: {
    type: Object as PropType<BlogUser>,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const store = useStore()
const allUsers = computed<BlogUser[]>(() =>
  store.getters.allUsers.filter((user: BlogUser) => user.userId !== props.userId)
)
const selectedUser = computed<BlogUser>(() => store.getters.usersById[props.userId])
const isSwitching = ref(false)
</script>

<style scoped>
.current-user-name {
  font-weight: 500;
  font-size: 20px;
}

.switch-user-text {
  font-size: 11px;
}
</style>
