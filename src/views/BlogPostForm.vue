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
        <button class="cancel-button">Cancel</button>
        <button @click="savePost" class="save-button">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { uuid } from 'vue-uuid'
import { useRouter } from 'vue-router'
import PostTags from '@/components/BlogPostTags.vue'
import type { BlogUser } from '@/store/types'

const store = useStore()
const router = useRouter()

const body = ref('')
const tags = ref<string[]>([])
const isBodyFocused = ref(false)
const currentUser = computed<BlogUser>(() => store.getters.currentUser)

const addTags = (newTags: string) => {
  tags.value = [...tags.value, ...newTags.split(',')].map((tag) => tag.trim())
}
const removeTag = (tag: string) => {
  tags.value = tags.value.filter((item) => item !== tag)
}
const savePost = () => {
  if (body.value?.length) {
    store.dispatch('createBlogPost', {
      post: {
        userId: currentUser.value.userId, // TODO: create global current user
        postId: uuid.v1(),
        body: body.value,
        tags: tags.value,
        reactions: 0,
        createDate: new Date().toISOString()
      }
    })
    router.push({
      name: 'Blog posts list'
    })
  }
}
</script>

<style scoped lang="less">
.page-container {
  margin: 0 10px;
}
.page-content-base {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  padding: 20px 35px;
  position: relative;
}
h2 {
  font-weight: 400;
}
.body-input {
  resize: none;
  border-radius: 3px;
  border: 2px solid rgb(237, 238, 239);
  margin-top: 15px;
  font-size: 14px;
  line-height: 20px;
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
.form-base-buttons {
  border-radius: 4px;
  padding: 8px 24px;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
}
.cancel-button {
  .form-base-buttons();
  color: #2e5bff;
  background-color: white;
}
.save-button {
  .form-base-buttons();
  color: white;
  background-color: #2e5bff;
}
.form-action-container {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: flex-end;
}
</style>
