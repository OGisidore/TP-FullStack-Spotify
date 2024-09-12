import { useFormik } from 'formik'
import React, { Fragment, useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { Button } from '../components/Ui/Button'
import { resetPassword } from '../Helpers/api/backendConnect/api'
import { validatePassword } from '../Helpers/utiles/utils'
import { getItem, removeItem } from '../StorageService/localStorage'

export const ResetPassword: React.FC = () => {
  const validate = (values: any) => validatePassword(values)
  const [redirect, setRedirect] = useState<boolean>(false)
  const [formError, setFomError] = useState<string>('')
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: async (value) => {
      const email = getItem('email')
      const newPassword = value.confirmPassword
      const result = await resetPassword(
        'users',
        token ? { token, newPassword } : { email, newPassword }
      )
      if (result.isSuccess) {
        console.log("yes");
        removeItem("email")
        setRedirect(true)
        setFomError('')
      } else {
        setRedirect(false)
        setFomError(result.message)
      }
      // alert(JSON.stringify(result, null, 2));
    },
  })
  useEffect(() => {}, [])
  if (redirect) {
    return <Navigate to="/login" />
  }
  return (
    <Fragment>
      <section className="w-full md:w-[50rem]  mt-10">
        {' '}
        <div className="content text-card-foreground bg-card border-b p-4 shadow-lg">
          <div className=" items-center gap-2">
            <form
              onSubmit={formik.handleSubmit}
              className="border shadow-lg rounded-md p-5 w-full"
            >
              <p className="errors text-destructive font-bold">{formError}</p>
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
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="error">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <div className="bt mt-4 w-full">
                <Button type="submit" className="w-full font-bold text-2xl">
                  Save new Password{' '}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
