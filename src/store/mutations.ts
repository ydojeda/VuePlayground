import { type MutationTree } from 'vuex'
import * as StoreTypes from '@/store/types'

const StoreMutations: MutationTree<StoreTypes.OverallState> = {
  resetData(state, payload: { users: StoreTypes.BlogUsersState; posts: StoreTypes.BlogPost[] }) {
    state.users = { ...state.users, ...payload.users }
    state.posts = payload.posts

    state.reactions = {}
  },
  createBlogPost(state: StoreTypes.OverallState, blogPost: StoreTypes.BlogPost) {
    state.posts = [...state.posts, blogPost]
  },
  updateBlogPost(state: StoreTypes.OverallState, blogPost: StoreTypes.BlogPost) {
    const postIndex = state.posts.findIndex((post) => post.postId === blogPost.postId)
    if (postIndex >= 0) {
      state.posts[postIndex] = blogPost
    }
  },
  changePostReact(state, payload: { userId: string; postId: string }) {
    const postIndex = state.posts.findIndex((post) => post.postId === payload.postId)
    if (postIndex >= 0) {
      const newReact = !state.reactions[payload.userId]?.[payload.postId]
      const reactCount = state.posts[postIndex].reactions ?? 0
      state.reactions[payload.userId] = {
        ...(state.reactions[payload.userId] ?? {}),
        [payload.postId]: newReact
      }
      state.posts[postIndex] = {
        ...state.posts[postIndex],
        // if user has reacted to the post, add to count, if user unreacted, subtract the count
        reactions: reactCount + (newReact ? 1 : -1)
      }
    }
  },
  deleteBlogPost(state: StoreTypes.OverallState, blogPost: StoreTypes.BlogPost) {
    const { userId, postId } = blogPost
    state.posts = state.posts.filter((post) => post.postId !== blogPost.postId)
    if (state.reactions[userId]?.[postId]) {
      const userReactions = { ...state.reactions[userId] }
      delete userReactions[postId]
      state.reactions = {
        ...state.reactions,
        [userId]: userReactions
      }
    }
  }
}
export default StoreMutations
