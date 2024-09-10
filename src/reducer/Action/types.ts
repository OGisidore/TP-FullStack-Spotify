import { Post } from '../../Models/Post'
import { ADD_TO_STORAGE, REMOVE_FROM_STORAGE } from './action.types'

export interface StorageAction {
  type: typeof ADD_TO_STORAGE | typeof REMOVE_FROM_STORAGE | null
  key: string | null
  unique?: boolean
  payload: Post |null
}

