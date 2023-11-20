import { type ActionTree } from 'vuex'
import * as StoreTypes from '@/store/types'
import type { ResActionsPayload } from '@/store/types'

// const

const StoreActions: ActionTree<StoreTypes.OverallState, any> = {
  resetUserData({ commit }, payload?: ResActionsPayload) {
    const stateData = { users: {}, posts: {} }
    fetch(
      'https://dummyjson.com/users?limit=0&select=firstName,lastName,email,image,address,company'
    )
      .then((res) => {
        if (res.status !== 200) {
          return payload?.catch('Users | Non-200')
        }
        res
          .json()
          .then((data) => {
            stateData['users'] = (data['users'] || []).reduce((users: any, user: any) => {
              const { id, address, company, ...otherData } = user
              const userId = id.toString()
              users[userId] = {
                userId,
                addressCity: address?.city ?? '',
                companyName: company?.name ?? '',
                ...otherData
              }
              return users
            }, {})
          })
          .catch(payload?.catch)
      })
      .catch(payload?.catch)
      .finally(() => {
        fetch('https://dummyjson.com/posts?limit=0')
          .then((res) => {
            if (res.status !== 200) {
              return payload?.catch('Posts | Non-200')
            }
            res
              .json()
              .then((data) => {
                stateData['posts'] = (data['posts'] ?? []).reduce((posts: any, post: any) => {
                  const { id, userId, title, ...postData } = post
                  const postId = id.toString()
                  const strUserId = userId.toString()
                  if (!posts[strUserId]) {
                    posts[strUserId] = []
                  }
                  posts[strUserId].push({
                    postId,
                    userId: strUserId,
                    ...postData
                  })
                  return posts
                }, {})
                commit('resetData', stateData)
                payload?.success?.()
              })
              .catch(payload?.catch)
          })
          .catch(payload?.catch)
          .finally(payload?.finally)
      })
  },
  createBlogPost({ commit }, payload: { post: StoreTypes.BlogPost }) {
    commit('createBlogPost', payload.post)
  },
  updateBlogPost({ commit }, payload: { post: StoreTypes.BlogPost }) {
    commit('updateBlogPost', payload.post)
  },
  deleteBlogPost({ commit }, payload: { post: StoreTypes.BlogPost }) {
    commit('deleteBlogPost', payload.post)
  }
}

export default StoreActions
