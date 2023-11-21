import type { OverallState } from './types'

export const usersById = (state: OverallState) => state.users

export const allUsers = (state: OverallState) => Object.values(state.users)

export const postsByUser = (state: OverallState) => state.posts

export const reactionsByUser = (state: OverallState) => state.reactions
