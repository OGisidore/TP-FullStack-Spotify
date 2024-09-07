export interface Post {
  _id: string
  title: string
  content: string
  category: string
  image: File | Blob | null | string
  userId?: string
  publishedAt: Date
}
