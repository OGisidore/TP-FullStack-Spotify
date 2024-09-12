import React, { FC, useState } from 'react'
import './PostsTable.css'
import PostLineTable from '../PostLineTable/PostLineTable'
import { deleteData } from '../../Helpers/api/backendConnect/api'
import { Post } from '../../Models/Post'
import { Button } from '../Ui/Button'
import FormModal from '../FormModal/FormModal'
import { useSelector } from 'react-redux'
import { getPost } from '../../reducer/selector/selector.types'
import { useDispatch } from 'react-redux'
import { REMOVE_FROM_STORAGE } from '../../reducer/Action/action.types'

interface PostsTableProps {}

const PostsTable: FC<PostsTableProps> = () => {
  // const [posts, setPosts] = useState<Post[]>([])
  const [currentPoste, setCurrentPoste] = useState<Post | null>()
  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [openForm, setOpenForm] = useState<boolean>(false)

  const posts: Post[] = useSelector(getPost)
  console.log(posts)

  const dispatch = useDispatch()

  const handleDelete = async () => {
    try {
      // delete from backend
      await deleteData('posts', currentPoste?._id!)
      // delete from local

      dispatch({
        type: REMOVE_FROM_STORAGE,
        key: 'posts',
        payload: currentPoste,
      })

      setOpenPopup(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="PostsTable mt-8 w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className=" border-t bg-muted/50 font-medium [&_tr]:border-b">
          <tr className="tr">
            <th className="th">id</th>
            <th className="th">image</th>
            <th className="th">title</th>
            <th className="th">category</th>
            <th className="th">Action</th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {posts?.map((post: Post, index: number) => {
            return (
              <PostLineTable
                key={post._id}
                post={post}
                index={index}
                setOpenPopup={() => setOpenPopup(true)}
                currentPoste={() => setCurrentPoste(post)}
                setOpenForm={() => setOpenForm(true)}
              />
            )
          })}
        </tbody>
      </table>
      {openPopup && (
        <div className="alertDeleteModal absolute h-screen backdrop-blur-sm top-0 left-0 bg-popover/4 z-10 w-full flex  justify-center">
          <div className="content w-[40%] bg-background h-fit p-4">
            <p>
              {' '}
              Are you sure to delete this post titled : {currentPoste?.title}
            </p>
            <div className="bt mt-4 w-full flex justify-end gap-3">
              <Button
                onClick={() => setOpenPopup(false)}
                variant="destructive"
                className=" font-bold text-2xl"
              >
                Cancel{' '}
              </Button>
              <Button onClick={handleDelete} className=" font-bold text-2xl">
                Delete{' '}
              </Button>
            </div>
          </div>
        </div>
      )}
      {openForm && (
        <FormModal
          current_={currentPoste!}
          closeModal={() => setOpenForm(false)}
        />
      )}
    </div>
  )
}
export default PostsTable
