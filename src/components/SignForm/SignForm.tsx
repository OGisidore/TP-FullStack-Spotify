import { useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { signup } from '../../Helpers/api/backendConnect/api'
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
      console.log("yes");
      
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

  // const [state, setState] = useState<any>(null)

  useEffect(() => {
    const runLocalData = async () => {
      console.log(formError)
    }
    runLocalData()
  }, [])
  if (redirect) {
    return <Navigate to={'/signin'} />
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
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
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
          <Button type="submit" className="w-full font-bold text-2xl">
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
