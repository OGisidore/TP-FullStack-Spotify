import React, { Fragment, useEffect, useState } from 'react'
import { Post } from '../Models/Post'
import { useParams } from 'react-router-dom'

import { getDatasById } from '../Helpers/api/backendConnect/api'

export const PostId: React.FC = () => {
  const [post, setPost] = useState<Post>()
  const { id } = useParams()
  console.log(id);
  

  const getPosts = async () => {
    try {
      var JsonDatas: any = await getDatasById('posts', id!)
      if (JsonDatas.status === 201) {
        console.log(JsonDatas.post)

        setPost(JsonDatas.post as Post)
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
      </section>
    </Fragment>
  )
}
