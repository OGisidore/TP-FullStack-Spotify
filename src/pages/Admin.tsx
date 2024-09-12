import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FormModal from '../components/FormModal/FormModal'
import PostsTable from '../components/PostsTable/PostsTable'
import { Button } from '../components/Ui/Button'
import { getDatasByUserId } from '../Helpers/api/backendConnect/api'
import { Post } from '../Models/Post'
import { ADD_TO_STORAGE } from '../reducer/Action/action.types'
import { getItem } from '../StorageService/localStorage'
interface ApiResponse {
  status: number
  posts: Post[]
}
export const Admin: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const dispatch = useDispatch()
  const userId = getItem('auth').userId
  const getPosts = async () => {
    try {
      //get data from backend
      var JsonDatas: ApiResponse = await getDatasByUserId('posts', userId)
      if (JsonDatas.status === 201) {
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
      <section className="w-full  md:w-[50rem] flex flex-col items-center  mt-10">
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
