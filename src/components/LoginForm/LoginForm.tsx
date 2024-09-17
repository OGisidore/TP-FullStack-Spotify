import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { signin, verifyUser } from '../../Helpers/api/backendConnect/api'
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
  const [emailError, setEmailError] = useState<string>('') // État pour gérer l'erreur d'email
  // const [enableButon, setEnableButton] = useState<boolean>(false)

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
  const checkEmailExists = async (email: string) => {
    try {
      const response = await verifyUser('users', { email })
      return response.exist // Si l'email existe déjà
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error)
      return false
    }
  }

  // Gérer la modification du champ email avec vérification asynchrone
  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    formik.handleChange(e)
    if (value) {
      const emailExists = await checkEmailExists(value)
      if (emailExists) {
        // setEnableButton(true)
        setEmailError('')
      } else {
        // setEnableButton(false)
        setEmailError('no user such this email a correct email please')
      }
    }
  }

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
        <div className="email mt-4 grid w-full  items-center gap-3">
          <label
            htmlFor=""
            className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {' '}
            Email
          </label>
          <input
            className="input"
            type=""
            name="email"
            placeholder="Your Email"
            onChange={handleEmailChange}
            value={formik.values.email}
          />
          {emailError ? (
            <div className="error text-destructive font-bold">{emailError}</div>
          ) : formik.touched.email && formik.errors.email ? (
            <div className="error  text-destructive font-bold">
              {formik.errors.email}
            </div>
          ) : null}
          {/* {formik.touched.email && formik.errors.email ? (
            <div className="error  text-destructive font-bold">{formik.errors.email}</div>
          ) : null} */}
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
            <div className="error  text-destructive font-bold">
              {formik.errors.password}
            </div>
          ) : null}
          <p className="div mt-4 w-full text-center ">
            <Link
              className="text-accent w-full font-bold"
              to={'/request-reset-password'}
            >
              {' '}
              forgotten password?
            </Link>{' '}
          </p>
        </div>
        <div className="bt mt-4 w-full">
          <Button
            type="submit"
            // disabled={!enableButon}
            className="w-full font-bold text-2xl"
          >
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
