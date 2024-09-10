import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '../components/Ui/Button'
import FormModal from '../components/FormModal/FormModal'
import PostsTable from '../components/PostsTable/PostsTable'
import { useDispatch } from 'react-redux'
import { ADD_TO_STORAGE } from '../reducer/Action/action.types'
import { getData } from '../Helpers/api/backendConnect/api'
import { Post } from '../Models/Post'
interface ApiResponse {
  status: number
  posts: Post[]
}
export const Admin: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useDispatch()
  const getPosts = async () => {
    try {
      //get data from backend
      var JsonDatas: ApiResponse = await getData('posts')
      if (JsonDatas.status === 200) {
        console.log(JsonDatas.posts)
        // add data to store
        JsonDatas.posts.forEach((post: Post) => {
          dispatch({
            type: ADD_TO_STORAGE,
            key: 'posts',
            unique: false,
            payload: post,
          })
        })
      }
    } catch (error) {
      console.log('error' + error)
    }
  }
  useEffect(() => {
    getPosts()
  }, [open])
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
