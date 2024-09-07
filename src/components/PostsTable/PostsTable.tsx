import React, { FC } from 'react'
import './PostsTable.css'
import PostLineTable from '../PostLineTable/PostLineTable'

interface PostsTableProps {}

const PostsTable: FC<PostsTableProps> = () => (
  <div className="PostsTable relative mt-8 w-full overflow-auto">
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
        <PostLineTable />
      </tbody>
    </table>
  </div>
)

export default PostsTable
