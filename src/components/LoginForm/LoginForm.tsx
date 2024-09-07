import React, { FC } from 'react'
import './LoginForm.css'
import { Link } from 'react-router-dom'
import { Button } from '../Ui/Button'

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => (
  <div className="LoginForm mt-5 w-2/3">
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
        <p className="div mt-4 w-full text-center ">
          <Link className="text-accent w-full font-bold" to={'/reset-password'}>
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

export default LoginForm
