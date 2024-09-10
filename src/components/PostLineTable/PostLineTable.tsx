import React, { FC } from 'react'
import './PostLineTable.css'
import { Button } from '../Ui/Button'
import { Edit, Trash, View } from 'lucide-react'
import { Post } from '../../Models/Post'

interface PostLineTableProps {
  post: Post
  index: number
  currentPoste: () => void
  setOpenPopup: () => void
  setOpenForm: () => void
}

const PostLineTable: FC<PostLineTableProps> = ({
  post,
  index,
  setOpenPopup,
  currentPoste,
  setOpenForm,
}) => {
  const handledelete = () => {
    setOpenPopup()
    currentPoste()
  }
  const handleEdit = () => {
    setOpenForm()
    currentPoste()
  }
  return (
    <tr className="tr">
      <td className="td">{index + 1}</td>
      <td className="td">
        <img
          src={post.image as string}
          className="h-8"
          alt={'image illustrative de ' + post.title}
        />
      </td>
      <td className="td">{post.title} </td>
      <td className="td">{post.category}</td>
      <td className="td flex justify-end gap-2">
        <Button variant="default" onClick={handleEdit}>
          <Edit />
        </Button>
        <Button variant="secondary">
          <View />{' '}
        </Button>
        <Button variant="destructive" onClick={handledelete}>
          <Trash />
        </Button>
      </td>
    </tr>
  )
}
export default PostLineTable
