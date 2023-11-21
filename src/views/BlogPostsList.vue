<template>
  <div class="page-container">
    <div class="header-container">
      <UserSwitcher :current-user="currentUser" :user-id="currentUser.userId" />
      <button v-on:click="addNewPost" class="add-new-post-button">New Post</button>
    </div>

    <div class="content-container">
      <h1 class="title-text">Blog posts</h1>

      <BlogPostListMenu
        :active-item="postsType"
        :menu-items="['All', 'My Posts']"
        :on-press-menu-item="changePostsType"
      />

      <div class="posts-list-container">
        <BlogPostCard
          v-for="post in postsType === 'All' ? allPosts : userPosts"
          :post="post"
          :current-user-id="currentUser.userId"
          :key="post.postId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import UserSwitcher from '@/components/UserSwitcher.vue'
import BlogPostCard from '@/components/BlogPostCard.vue'
import { useRouter } from 'vue-router'
import type { BlogPost } from '@/store/types'
import BlogPostListMenu from '@/components/BlogPostListMenu.vue'
import { uuid } from 'vue-uuid'

const store = useStore()

const currentUser = computed(() => store.getters.usersById['1'])
const allPosts = computed<BlogPost[]>(() => store.getters.allPosts)
const userPosts = computed<BlogPost[]>(() =>
  store.getters.allPosts.filter((post: BlogPost) => post.userId === currentUser.value.userId)
)

const postsType = ref('All')

const router = useRouter()
const goToNewForm = () => {
  console.log('attempting to go to new form')
  router.push({
    name: 'Blog post form'
  })
}
const changePostsType = (type: string) => {
  if (postsType.value !== type) {
    postsType.value = type
  }
}
const addNewPost = () => {
  store.dispatch('createBlogPost', {
    post: {
      postId: uuid.v1(),
      body: 'Lorem ipsum',
      userId: currentUser.value.userId,
      tags: ['Random', 'Test'],
      reactions: 0,
      createDate: new Date().toISOString()
    }
  })
}
</script>

<style lang="less" scoped>
.page-container {
  margin: 0 10px;
}
.page-content-base {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 20px 35px;
}
.content-container {
  .page-content-base();
}
.header-container {
  .page-content-base();
  position: sticky;
  left: 0;
  right: 10px;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.title-text {
  margin: 20px 0;
}
.posts-list-container {
  display: flex;
  flex-direction: column;
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
</style>
