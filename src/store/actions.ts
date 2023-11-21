import { type ActionTree } from 'vuex'
import * as StoreTypes from '@/store/types'
import type { ResActionsPayload } from '@/store/types'

// const

const StoreActions: ActionTree<StoreTypes.OverallState, any> = {
  resetUserData({ commit }, payload?: ResActionsPayload) {
    const stateData = { users: {}, posts: {}, currentUser: null }
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
            stateData.currentUser = data['users']?.[0]
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
                stateData['posts'] = (data['posts'] ?? []).map((post: any) => {
                  const { id, userId, title, ...postData } = post
                  /* Calculating random date */
                  const minTime = new Date('2000-01-01').getTime()
                  const today = new Date().getTime()
                  return {
                    postId: id.toString(),
                    userId: userId.toString(),
                    createDate: new Date(minTime + Math.random() * (today - minTime)).toISOString(),
                    ...postData
                  }
                })
                commit('resetData', stateData)
                payload?.success?.()
              })
              .catch(payload?.catch)
          })
          .catch(payload?.catch)
          .finally(payload?.finally)
      })
  },
  setCurrentUser({ commit }, payload: { userId: string }) {
    commit('setCurrentUser', payload.userId)
  },
  createBlogPost({ commit }, payload: { post: StoreTypes.BlogPost }) {
    commit('createBlogPost', payload.post)
  },
  changePostReact({ commit }, payload: { userId: string; postId: string }) {
    commit('changePostReact', payload)
  },
  updateBlogPost({ commit }, payload: { post: StoreTypes.BlogPost }) {
    commit('updateBlogPost', payload.post)
  },
  deleteBlogPost({ commit }, payload: { userId: string; postId: string }) {
    commit('deleteBlogPost', payload)
  }
}

export default StoreActions
