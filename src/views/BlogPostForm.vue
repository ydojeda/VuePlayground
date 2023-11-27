<template>
  <div class="page-container">
    <div class="page-content-base">
      <h2>Add Post</h2>
      <PostTags :tags="tags" :on-add-tags="addTags" :on-remove-tags="removeTag" />
      <textarea
        id="blogpostbodyinput"
        class="body-input"
        v-model="body"
        placeholder="What's on your mind?"
        @focus="isBodyFocused = true"
        @blur="isBodyFocused = false"
      />
      <div class="form-action-container">
        <button class="cancel-button" @click="onCancel">Cancel</button>
        <button @click="savePost" class="save-button">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { uuid } from 'vue-uuid'
import { useRouter, useRoute } from 'vue-router'
import PostTags from '@/components/BlogPostTags.vue'
import type { BlogPost, BlogUser } from '@/store/types'

const store = useStore()
const router = useRouter()
const route = useRoute()

const currentUser = computed<BlogUser>(() => store.getters.currentUser)
const blogPost = computed<BlogPost | null>(() =>
  store.getters.allPosts.find((post: BlogPost) => post.postId === route.params.id)
)

const body = ref(blogPost.value?.body ?? '')
const tags = ref<string[]>(blogPost.value?.tags ?? [])
const isBodyFocused = ref(false)

const addTags = (newTags: string) => {
  tags.value = [...tags.value, ...newTags.split(',')].map((tag) => tag.trim())
}
const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item) => item !== tag)
}
const savePost = () => {
  if (body.value?.length) {
    const postData = { ...(blogPost.value ?? {}) }
    store.dispatch(postData.postId ? 'updateBlogPost' : 'createBlogPost', {
      post: {
        userId: postData.userId ?? currentUser.value.userId,
        reactions: postData.reactions ?? 0,
        createDate: postData.createDate ?? new Date().toISOString(),
        postId: postData.postId ?? uuid.v1(),
        body: body.value,
        tags: tags.value
      }
    })
    router.push({
      name: 'blog-post-list'
    })
  }
}

const onCancel = () => {
  router.back()
}
</script>

<style scoped lang="less">
@import 'src/assets/main';

@body-input-height: 150px;

.page-content-base {
  .page-content-container();
  position: relative;
}
.body-input {
  height: @body-input-height;
}
.cancel-button {
  .base-button();
  color: @primary-btn-color;
  background-color: white;
}
.save-button {
  .base-button();
  color: white;
  background-color: @primary-btn-color;
}
.form-action-container {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: flex-end;
}
</style>
