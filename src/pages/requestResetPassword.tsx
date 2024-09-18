import React, { Fragment, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Button } from '../components/Ui/Button'
import {
  requestResetPassword,
  verifyUser,
} from '../Helpers/api/backendConnect/api'
import { setItem } from '../StorageService/localStorage'

export const RequestResetPassword: React.FC = () => {
  const [emailError, setEmailError] = useState<string>('')
  const [enableButon, setEnableButton] = useState<boolean>(false)
  const [shoulRedirect, setShouldRedirect] = useState<boolean>(false)
  const [inputemail, setEmail] = useState<String>()
  const [withCode, setWithCode] = useState<boolean>(false)
  const checkEmailExists = async (email: string) => {
    try {
      const response = await verifyUser('auth', { email })
      return response.isSuccess
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error)
      return false
    }
  }

  // Gérer la modification du champ email avec vérification asynchrone
  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
    if (value) {
      const emailExists = await checkEmailExists(value)
      if (emailExists) {
        setEnableButton(true)
        setEmailError('')
      } else {
        setEnableButton(false)
        setEmailError('no user such this email a correct email please')
      }
    }
  }
  const HandleSendRequestOfCode = async () => {
    try {
      const email = inputemail
      const response = await requestResetPassword(
        'auth',
        { email },
    
      )
      if (response.isSuccess) {
        setItem('email', email)
        setWithCode(true)
        console.log(email)

        setShouldRedirect(true)
      }
    } catch (error) {}
  }

  const HandleSendRequest = async () => {
    try {
      const email = inputemail
      const response = await requestResetPassword(
        'auth',
        { email },
      )
      if (response.ok) {
        console.log(email)
        setShouldRedirect(true)
      }
    } catch (error) {}
  }
  useEffect(() => {
    // getPosts()
  }, [])

  if (shoulRedirect) {
    return <Navigate to={'/verification' + (withCode ? '?Code=true' : '')} />
  }
  return (
    <Fragment>
      <section className="w-full md:w-[40rem] h-[70vh] flex flex-col justify-center mt-10">
        <div className="title">
          Request for password Reset By enter your Email and choose the reset
          method you want{' '}
        </div>
        <div className="content text-card-foreground bg-card border-b p-4 shadow-lg">
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
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleEmailChange}
              defaultValue=""
            />
            {emailError && (
              <div className="error text-destructive font-bold">
                {emailError}
              </div>
            )}
          </div>
          <div className="buttons mt-8 flex gap-4">
            <Button
              className=""
              onClick={HandleSendRequestOfCode}
              disabled={!enableButon}
            >
              send me a Code{' '}
            </Button>
            <Button
              className=""
              onClick={HandleSendRequest}
              disabled={!enableButon}
            >
              send me a Link{' '}
            </Button>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
