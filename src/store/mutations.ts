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
