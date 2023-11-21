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
  createDate: string
}
export type BlogUsersState = {
  [userId: string]: BlogUser
}
export type BlogPostReactionsState = {
  [userId: string]: {
    [postId: string]: boolean
  }
}

export type OverallState = {
  users: BlogUsersState
  posts: BlogPost[]
  reactions: BlogPostReactionsState
}

export type ResActionsPayload = {
  success: (data?: any) => void
  catch: (data?: any) => void
  finally: (data?: any) => void
}
