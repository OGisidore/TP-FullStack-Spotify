import { Post } from '../../../Models/Post'

export interface GlobalState {
  storage : {
    posts: Post []
  }
  
}
