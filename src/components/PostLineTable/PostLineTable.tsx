import React, { FC } from 'react'
import './PostLineTable.css'
import { Button } from '../Ui/Button'
import { Edit, Trash, View } from 'lucide-react'

interface PostLineTableProps {}

const PostLineTable: FC<PostLineTableProps> = () => (
  <tr className="tr">
    <td className="td">01</td>
    <td className="td">
      <img src="" alt="image de ..." />
    </td>
    <td className="td">comment </td>
    <td className="td">design</td>
    <td className="td flex justify-end gap-2">
      <Button variant="default">
        <Edit />
      </Button>
      <Button variant="secondary">
        <View />{' '}
      </Button>
      <Button variant="destructive">
        <Trash />
      </Button>
    </td>
  </tr>
)

export default PostLineTable
