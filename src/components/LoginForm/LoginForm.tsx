import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { signin } from '../../Helpers/api/backendConnect/api'
import { validateLoginForm } from '../../Helpers/utiles/utils'
import { CONNECTED } from '../../reducer/Action/action.types'
import { getAuthState } from '../../reducer/selector/selector.types'
import { getItem, removeItem } from '../../StorageService/localStorage'
import { Button } from '../Ui/Button'
import './LoginForm.css'

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const validate = (values: any) => validateLoginForm(values)
  const [redirect, setRedirect] = useState<boolean>(false)
  const [formError, setFomError] = useState<string>('')
  const dispatch = useDispatch()
  const isAuth = useSelector(getAuthState)
  const location = useLocation()

  // On récupère l'URL de redirection, sinon on redirige vers la page d'accueil par défaut
  const from = location.state?.from?.pathname || '/'
  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validate,
    onSubmit: async (user) => {
      const result = await signin(user)
      if (result.isSuccess) {
        setRedirect(true)
        dispatch({
          type: CONNECTED,
          payload: {
            token: result.token,
            userId: result.userId,
          },
        })
        setFomError('')
      } else {
        setRedirect(false)

        setFomError(result.message)
      }
      // alert(JSON.stringify(result, null, 2));
    },
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {}
    runLocalData()
  }, [])
  if (redirect) {
    const pathname = getItem('pathname')
    if (pathname) {
      removeItem('pathname')
      return <Navigate to={pathname} />
    }
    return <Navigate to={from} />
  }
  if (isAuth) {
    const pathname = getItem('pathname')
    if (pathname) {
      removeItem('pathname')
      return <Navigate to={pathname} />
    }

    return <Navigate to={from} />
  }

  return (
    <div className="LoginForm mt-5 w-2/3">
      <form
        onSubmit={formik.handleSubmit}
        className="border shadow-lg rounded-md p-5 w-full"
      >
        <p className="errors text-destructive font-bold">{formError}</p>
        <div className="username mt-4 grid w-full  items-center gap-3">
          <label
            htmlFor=""
            className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {' '}
            username
          </label>
          <input
            className="input"
            type="text"
            name="email"
            placeholder="Your Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="passwor mt-4 grid w-full  items-center gap-1.5">
          <label
            htmlFor=""
            className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Passsword
          </label>
          <input
            className="input"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <p className="div mt-4 w-full text-center ">
            <Link
              className="text-accent w-full font-bold"
              to={'/reset-password'}
            >
              {' '}
              forgotten password?
            </Link>{' '}
          </p>
        </div>
        <div className="bt mt-4 w-full">
          <Button type="submit" className="w-full font-bold text-2xl">
            Login{' '}
          </Button>
        </div>
        <div className="div mt-4 w-full text-center ">
          You have not account? Click{' '}
          <Link className="text-accent w-full font-bold" to={'/signup'}>
            {' '}
            here
          </Link>{' '}
          to create account
        </div>
      </form>
    </div>
  )
}

export default LoginForm
