import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { signup, verifyUser } from '../../Helpers/api/backendConnect/api'
import { validateRegisterForm } from '../../Helpers/utiles/utils'
import { getAuthState } from '../../reducer/selector/selector.types'
import { Button } from '../Ui/Button'
import './SignForm.css'

interface SignFormProps {}

const SignForm: FC<SignFormProps> = () => {
  const [redirect, setRedirect] = useState<boolean>(false)
  const [formError, setFomError] = useState<string>('')
  const isAuth = useSelector(getAuthState)
  const location = useLocation()
  const [emailError, setEmailError] = useState<string>('') // État pour gérer l'erreur d'email
  const [enableButon, setEnableButton] = useState<boolean>(false)

  // On récupère l'URL de redirection, sinon on redirige vers la page d'accueil par défaut
  const from = location.state?.from?.pathname || '/'

  const validate = (values: any) => validateRegisterForm(values)

  // validateRegisterForm
  const formik = useFormik({
    initialValues: {
      firstname: 'isidore2',
      lastname: 'dev',
      username: 'isidore',
      password: '123654',
      email: 'i@gmail.com',
      confirmPassword: '123654',
    },
    validate,
    onSubmit: async (user) => {
      console.log('yes')

      const result = await signup(user)
      if (result.status === 201) {
        setRedirect(true)
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
      return response.exist
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
        setEnableButton(false)
        setEmailError(
          `user exist please <Link className="text-accent w-full font-bold" to={'/login'}> here</Link> login to continue `
        )
      } else {
        setEnableButton(true)
        setEmailError('')
      }
    }
  }

  // const [state, setState] = useState<any>(null)

  useEffect(() => {
    const runLocalData = async () => {
      console.log(formError)
    }
    runLocalData()
  }, [])
  if (redirect) {
    return <Navigate to={'/login'} />
  }
  if (isAuth) {
    return <Navigate to={from} />
  }
  return (
    <div className="SignForm mt-5 w-2/3">
      <form
        className="border shadow-lg rounded-md p-5 w-full"
        onSubmit={formik.handleSubmit}
      >
        <p className="error"> {formError}</p>
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
            placeholder="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="username mt-4 grid w-full  items-center gap-3">
          <label
            htmlFor=""
            className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {' '}
            Firstname
          </label>
          <input
            className="input"
            type="text"
            placeholder="firstname"
            name="firstname"
            onChange={formik.handleChange}
            value={formik.values.firstname}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <div className="error">{formik.errors.firstname}</div>
          ) : null}
        </div>
        <div className="lastname mt-4 grid w-full  items-center gap-3">
          <label
            htmlFor=""
            className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {' '}
            Lastname
          </label>
          <input
            className="input"
            type="text"
            placeholder="Lastname"
            name="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
          />
          {formik.touched.lastname && formik.errors.lastname ? (
            <div className="error">{formik.errors.lastname}</div>
          ) : null}
        </div>
        <div className="lastname mt-4 grid w-full  items-center gap-3">
          <label
            htmlFor=""
            className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {' '}
            email
          </label>
          <input
            className="input"
            type="email"
            placeholder="Lastname"
            name="email"
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
            <div className="error">{formik.errors.email}</div>
          ) : null} */}
        </div>
        <div className="password mt-4 grid w-full  items-center gap-1.5">
          <label
            htmlFor=""
            className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Passsword
          </label>
          <input
            className="input"
            placeholder="password"
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="ConfirmPasswor mt-4 grid w-full  items-center gap-1.5">
          <label
            htmlFor=""
            className='"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Confirm password
          </label>
          <input
            className="input"
            placeholder="password confirm"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <div className="bt mt-4 w-full">
          <Button
            type="submit"
            disabled={!enableButon}
            className="w-full font-bold text-2xl"
          >
            Create{' '}
          </Button>
        </div>
        <div className="div mt-4 w-full text-center ">
          You have account? Click{' '}
          <Link className="text-accent w-full font-bold" to={'/login'}>
            {' '}
            here
          </Link>{' '}
          to login
        </div>
      </form>
    </div>
  )
}

export default SignForm
