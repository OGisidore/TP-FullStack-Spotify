import React, { Fragment, ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '../Models/Post'

import { getDatasById, getUser } from '../Helpers/api/backendConnect/api'
import Loader from '../components/Loader/Loader'

export const PostId: React.FC = () => {
  const [post, setPost] = useState<Post>()
  const { id } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [postAuthor, setPostAuthor] = useState<string>()

  const getPosts = async () => {
    try {
      var JsonDatas: any = await getDatasById('posts', id!)
      if (JsonDatas.status === 201) {
        setPost(JsonDatas.post as Post)
        try {
          const author = await getUser('users', JsonDatas.post.userId)
          if (author.status === 201) {
            const { user } = author
            setPostAuthor(user.firstname + ' ' + user.lastname)
          }
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <section className="w-full md:w-[50rem] mt-10">
          <h1 className="text-4xl">{post?.title}</h1>
          <div className="content w-full p-4">
            <img
              src={post?.image as string}
              className="float-left m-5 w-[15rem] h-auto"
              alt={"image illustrative de l'article sur " + post?.title}
            />
            <h3 className=" mx-5">{post?.category}</h3>
            <p>{post?.content}</p>
          </div>
          <p className="italic">
            {' '}
            Published by <span className="font-bold">{postAuthor}</span> at{' '}
            {post?.publishedAt as ReactNode}
          </p>
        </section>
      )}
    </Fragment>
  )
}
