import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { setItem } from '../../StorageService/localStorage'
import { getAuthState } from '../../reducer/selector/selector.types'

const PrivateRoute = ({ children }: any) => {
  const isAuth = useSelector(getAuthState)
  const location = useLocation()
  if (!isAuth) {
    setItem('pathname', location.pathname)
  }

  return isAuth ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}

export default PrivateRoute
