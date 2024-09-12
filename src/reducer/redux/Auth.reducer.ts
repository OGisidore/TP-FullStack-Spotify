import { CONNECTED, LOGOUT } from '../Action/action.types'
import { AuthAction } from '../Action/types'
import { getInitPost } from '../lib/initlib'

export const initPost = getInitPost()
const initACtion: AuthAction = {
  type: LOGOUT,
  payload: initPost,
}

export const authReducers = (
  state = initPost,
  action: AuthAction = initACtion
) => {
  switch (action.type) {
    case CONNECTED:
      return {
        isAuth: true,
        token: action.payload?.token,
        userId: action.payload?.userId,
      }

      break
    case LOGOUT:
      localStorage.removeItem('auth')
      return {
        isAuth: false,
        token: '',
        userId: '',
      }

      break

    default:
      return state
      break
  }
}
