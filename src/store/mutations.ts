import { type MutationTree } from 'vuex'
import * as StoreTypes from '@/store/types'

const StoreMutations: MutationTree<StoreTypes.OverallState> = {
  resetData(
    state,
    payload: {
      users: StoreTypes.BlogUsersState
      posts: StoreTypes.BlogPost[]
      currentUser: StoreTypes.BlogUser
    }
  ) {
    state.users = { ...state.users, ...payload.users }
    state.posts = payload.posts
    state.currentUser = payload.currentUser

    state.reactions = {}
  },
  setCurrentUser(state, userId: string) {
    if (state.users[userId]) {
      state.currentUser = state.users[userId]
    }
  },
  createBlogPost(state: StoreTypes.OverallState, blogPost: StoreTypes.BlogPost) {
    state.posts = [...state.posts, blogPost]
  },
  updateBlogPost(state: StoreTypes.OverallState, blogPost: StoreTypes.BlogPost) {
    const posts = [...state.posts]
    const postIndex = posts.findIndex((post) => post.postId === blogPost.postId)
    if (postIndex >= 0) {
      posts[postIndex] = blogPost
      state.posts = posts
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
  deleteBlogPost(state: StoreTypes.OverallState, payload: { userId: string; postId: string }) {
    state.posts = state.posts.filter((post) => post.postId !== payload.postId)
    if (state.reactions[payload.userId]?.[payload.postId] != null) {
      const userReactions = { ...state.reactions[payload.userId] }
      delete userReactions[payload.postId]
      state.reactions = {
        ...state.reactions,
        [payload.userId]: userReactions
      }
    }
  }
}
export default StoreMutations
