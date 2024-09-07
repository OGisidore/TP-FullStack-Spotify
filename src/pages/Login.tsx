import React, { Fragment } from 'react'

import LoginForm from '../components/LoginForm/LoginForm'

export const Login: React.FC = () => {
  return (
    <Fragment>
      <section className="w-full md:w-[50rem] flex flex-col items-center  mt-10">
        <div className="latest w-full p-4 border-b-4 shadow-sm bg-muted text-muted-foreground">
          <h2 className="font-bold text-2xl"> Login</h2>
        </div>
        <LoginForm />
      </section>
    </Fragment>
  )
}
