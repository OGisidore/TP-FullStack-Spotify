import { GlobalState } from './types/GlobalState'

export const getPost = (state: GlobalState) => state.storage.posts
export const getAuthState = (state: GlobalState) => state.auth.isAuth
export const getUserID = (state: GlobalState) => state.auth.userId

export const getAuthToken = (state: GlobalState) => state.auth.token
