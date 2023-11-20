export type BlogUser = {
  userId: string
  firstName: string
  lastName: string
  email: string
  image: string
  addressCity: string
  companyName: string
}
export type BlogPost = {
  postId: string
  body: string
  userId: string
  tags: string[]
  reactions: number
}
export type BlogUsersState = {
  [userId: string]: BlogUser
}
export type BlogPostsState = {
  [userId: string]: BlogPost[]
}
export type BlogPostReactionsState = {
  [userId: string]: {
    [postId: string]: boolean
  }
}

export type OverallState = {
  users: BlogUsersState
  posts: BlogPostsState
  reactions: BlogPostReactionsState
}

export type ResActionsPayload = {
  success: (data?: any) => void
  catch: (data?: any) => void
  finally: (data?: any) => void
}
