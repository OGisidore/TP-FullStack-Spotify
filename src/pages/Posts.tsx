import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import { Post } from '../Models/Post'
import { Link } from 'react-router-dom'

import { getData } from '../Helpers/api/backendConnect/api'

export const Posts: React.FC = () => {
  // const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])

  const getPosts = async () => {
    try {
      var JsonDatas: any = await getData('posts')
      if (JsonDatas.isSuccess) {
        console.log(JsonDatas.posts)

        setPosts(JsonDatas.posts as Post[])
      }
    } catch (error) {
      console.log('error' + error)
    }
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <Fragment>
      <section className="w-full md:w-[50rem] mt-10">
        <h1 className="text-4xl">Posts</h1>
        {posts.map((post: Post) => {
          return (
            <Link
              to={'/post/' + post._id}
              key={post._id}
              className="w-full p-4 flex border-b-2 shadow-md justify-between items-center"
            >
              <h3 className="text-3xl font-bold">{post.title}</h3>
              <p>{post.publishedAt as ReactNode}</p>
            </Link>
          )
        })}
      </section>
    </Fragment>
  )
}
