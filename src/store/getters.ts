import type { OverallState } from './types'

export const usersById = (state: OverallState) => state.users

export const allUsers = (state: OverallState) => Object.values(state.users)

export const allPosts = (state: OverallState) =>
  state.posts.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime())

export const reactionsByUser = (state: OverallState) => state.reactions

export const currentUser = (state: OverallState) => state.currentUser
