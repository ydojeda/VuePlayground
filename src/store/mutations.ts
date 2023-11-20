import { type MutationTree } from 'vuex'
import * as StoreTypes from '@/store/types'

const StoreMutations: MutationTree<StoreTypes.OverallState> = {
  resetData(
    state,
    payload: { users: StoreTypes.BlogUsersState; blogPosts: StoreTypes.BlogPostsState }
  ) {
    state.posts = { ...state.posts, ...payload.blogPosts }
    state.users = { ...state.users, ...payload.users }
    state.reactions = {}
  },
  createBlogPost(state: StoreTypes.OverallState, blogPost: StoreTypes.BlogPost) {
    const userPosts = [...(state.posts[blogPost.userId] ?? []), blogPost]
    state.posts = {
      ...state.posts,
      [blogPost.userId]: userPosts
    }
  },
  updateBlogPost(state: StoreTypes.OverallState, blogPost: StoreTypes.BlogPost) {
    const userPosts = [...(state.posts[blogPost.userId] ?? [])]
    const postIndex = userPosts.findIndex((post) => post.postId === blogPost.postId)
    if (postIndex >= 0) {
      userPosts[postIndex] = blogPost
      state.posts = {
        ...state.posts,
        [blogPost.userId]: userPosts
      }
    }
  },
  deleteBlogPost(state: StoreTypes.OverallState, blogPost: StoreTypes.BlogPost) {
    const { userId, postId } = blogPost
    if (state.posts[userId]?.length) {
      state.posts = {
        ...state.posts,
        [userId]: state.posts[userId].filter((post) => post.postId !== postId)
      }
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
}
export default StoreMutations
