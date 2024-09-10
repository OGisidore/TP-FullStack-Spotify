import { GlobalState } from './types/GlobalState'

export const getPost = (state: GlobalState) => state.storage.posts
