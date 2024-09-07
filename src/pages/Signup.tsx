import React, { Fragment } from 'react'
import SignForm from '../components/SignForm/SignForm'

export const Signup: React.FC = () => {
  return (
    <Fragment>
      <section className="w-full md:w-[50rem] flex flex-col items-center  mt-10">
        <div className="latest w-full p-4 border-b-4 shadow-sm bg-muted text-muted-foreground">
          <h2 className="font-bold text-2xl"> Sing-up</h2>
        </div>
        <SignForm />
      </section>
    </Fragment>
  )
}
