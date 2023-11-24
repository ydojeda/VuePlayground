<template>
  <div class="card-container">
    <img :src="user.image" alt="Post User's Profile Picture" class="avatar-img" />
    <div class="post-content-container">
      <div class="user-header-container">
        <p class="user-name-text">{{ user.firstName }} {{ user.lastName }}</p>
        <p class="user-email-text">&centerdot; {{ user.email }}</p>
      </div>
      <p class="post-content-text">{{ props.post.body }}</p>
      <p class="tags-text" v-if="allTagsStr.length">
        {{ allTagsStr }}
      </p>
      <div class="actions-container">
        <div
          class="default-action-btn"
          @click="toggleReaction"
          :class="{ 'has-reacted': hasReacted }"
        >
          <FontAwesomeIcon :icon="[hasReacted ? 'fas' : 'far', 'heart']" />
          <a onclick="">Reacts {{ post.reactions ? `(${post.reactions})` : '' }}</a>
        </div>
        <div v-if="isPostByCurrentUser" class="default-action-btn" @click="goToPostEdit">
          <FontAwesomeIcon :icon="['far', 'pen-to-square']" />
          <a onclick="">Edit</a>
        </div>
        <div v-if="isPostByCurrentUser" class="delete-btn">
          <FontAwesomeIcon :icon="['far', 'trash-can']" />
          <a v-on:click="deletePost">Delete</a>
        </div>
      </div>
    </div>
    <div class="date-container">{{ postDateStr }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { BlogPost, BlogUser } from '@/store/types'
import { useStore } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'

const props = defineProps({
  post: {
    type: Object as PropType<BlogPost>,
    required: true
  },
  currentUserId: {
    type: String,
    required: true
  }
})
const store = useStore()
const router = useRouter()

// Formatted date of blog post
const postDateStr = props.post?.createDate
  ? new Date(props.post?.createDate).toLocaleDateString()
  : ''
const user = computed<BlogUser>(() => store.getters.usersById[props.post?.userId])
// if Current user has reacted to this post
const hasReacted = computed(
  () => store.getters.reactionsByUser[props.currentUserId]?.[props.post?.postId]
)
const isPostByCurrentUser = computed(() => store.getters.currentUser.userId === props.post?.userId)
// formatted user's address and company, along with the tags of the post
const allTagsStr = [
  user.value.addressCity ?? '',
  user.value.companyName ?? '',
  ...(props.post?.tags ?? [])
]
  .filter((tag) => tag?.length)
  .join(' &centerdot; ')

const toggleReaction = () => {
  store.dispatch('changePostReact', { userId: props.currentUserId, postId: props.post?.postId })
}
const deletePost = () => {
  if (props.post?.userId === props.currentUserId) {
    store.dispatch('deleteBlogPost', props.post)
  }
}

const goToPostEdit = () => {
  if (props.post?.postId) {
    router.push({
      name: 'blog-post-edit',
      params: { id: props.post?.postId }
    })
  }
}
</script>

<style scoped lang="less">
.card-container {
  position: relative;
  border-radius: 3px;
  border: rgb(245, 246, 247) 2px solid;
  padding: 20px 20px 15px 15px;
  margin-top: 40px;
  flex: 1;
  display: flex;
}
.avatar-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: rgb(30, 227, 137) solid 5px;
  margin-right: 10px;
}
.post-content-container {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.user-header-container {
  display: flex;
  flex-direction: row;
}
.user-name-text {
  font-size: 15px;
  font-weight: 700;
  margin-right: 5px;
}
.user-email-text {
  font-size: 15px;
  color: rgb(147, 153, 162);
}
.post-content-text {
  font-size: 18px;
  margin-top: 10px;
}
.tags-text {
  color: rgb(167, 172, 179);
  font-size: 12px;
  line-height: 20px;
  margin-top: 10px;
}
.actions-container {
  margin-top: 20px;
  display: flex;
}
.date-container {
  position: absolute;
  right: 20px;
  top: 15px;
  color: rgb(147, 153, 162);
  font-size: 12px;
  text-align: right;
  z-index: 1;
}
.default-action-btn {
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #9399a2;
  cursor: pointer;
  &:hover {
    color: #2b9bf4;
  }
  & a {
    margin-left: 5px;
  }
}
.has-reacted {
  color: #2b9bf4;
}
.delete-btn {
  .default-action-btn();
  &:hover {
    color: #f44d3d;
  }
}
</style>
