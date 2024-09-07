import React, { FC } from 'react'
import './SignForm.css'
import { Button } from '../Ui/Button'
import { Link } from 'react-router-dom'

interface SignFormProps {}

const SignForm: FC<SignFormProps> = () => {
  return (
    <div className="SignForm mt-5 w-2/3">
      <form className="border shadow-lg rounded-md p-5 w-full">
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
            id=""
          />
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
            name="username"
            id=""
          />
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
            name="username"
            id=""
          />
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
            placeholder="password"
            type="password"
            name="password"
            id=""
          />
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
            name="confrm-password"
            id=""
          />
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
