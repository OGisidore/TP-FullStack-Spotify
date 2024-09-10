
export interface Post {
  _id: string
  title: string
  content: string
  category: string
  image?:  File | String
  userId?: string
  publishedAt?: Date
}
