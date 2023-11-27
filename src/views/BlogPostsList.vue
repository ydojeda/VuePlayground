<template>
  <div class="page-container">
    <BlogPostListHeader />
    <div class="page-content-container">
      <h1 class="title-text">Blog posts</h1>

      <BlogPostListMenu
        :active-item="postsType"
        :menu-items="['All', 'My Posts']"
        :on-press-menu-item="changePostsType"
      />

      <div class="posts-list-container">
        <p class="empty-blog" v-if="!posts.length">No blog posts to show</p>
        <BlogPostCard
          v-for="post in posts"
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
const postsType = ref('All')
const posts = computed<BlogPost[]>(() => {
  const posts = store.getters.allPosts
  return postsType.value === 'All'
    ? posts
    : posts.filter((post: BlogPost) => post.userId === currentUser.value.userId)
})

const changePostsType = (type: string) => {
  if (postsType.value !== type) {
    postsType.value = type
  }
}
</script>

<style lang="less" scoped>
@import 'src/assets/main';
.title-text {
  margin: 20px 0;
}
.posts-list-container {
  display: flex;
  flex-direction: column;
}
.empty-blog {
  margin: 10px;
}
</style>
