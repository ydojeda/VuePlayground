<template>
  <div class="page-container">
    <BlogPostListHeader />
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
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import BlogPostCard from '@/components/BlogPostCard.vue'
import type { BlogPost } from '@/store/types'
import BlogPostListMenu from '@/components/BlogPostListMenu.vue'
import BlogPostListHeader from '@/components/BlogPostListHeader.vue'

const store = useStore()

const currentUser = computed(() => store.getters.currentUser)
const allPosts = computed<BlogPost[]>(() => store.getters.allPosts)
const userPosts = computed<BlogPost[]>(() =>
  store.getters.allPosts.filter((post: BlogPost) => post.userId === currentUser.value.userId)
)

const postsType = ref('All')

const changePostsType = (type: string) => {
  if (postsType.value !== type) {
    postsType.value = type
  }
}
</script>

<style lang="less" scoped>
.page-container {
  margin: 0 10px;
}
.content-container {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 20px 35px;
}
.title-text {
  margin: 20px 0;
}
.posts-list-container {
  display: flex;
  flex-direction: column;
}
</style>
