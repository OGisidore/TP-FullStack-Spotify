import { Post } from '../../../Models/Post'
interface AuthData {
  isAuth: boolean
  token: string
  userId: string
}
export interface GlobalState {
  storage: {
    posts: Post[]
  }
  auth: AuthData
}
