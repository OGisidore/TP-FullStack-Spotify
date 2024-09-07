import React, { Fragment, useState } from 'react'
import { Button } from '../components/Ui/Button'
import FormModal from '../components/FormModal/FormModal'
import PostsTable from '../components/PostsTable/PostsTable'

export const Admin: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Fragment>
      <section className="w-full relative md:w-[50rem] flex flex-col items-center  mt-10">
        <div className="latest w-full p-4 border-b-4 shadow-sm bg-muted text-muted-foreground">
          <h2 className="font-bold text-2xl"> Admin</h2>
        </div>
        <Button
          variant="secondary"
          className="self-start mt-3"
          onClick={() => setOpen(true)}
        >
          Add Post
        </Button>
        {open && <FormModal closeModal={() => setOpen(false)} />}
        <PostsTable />
      </section>
    </Fragment>
  )
}
