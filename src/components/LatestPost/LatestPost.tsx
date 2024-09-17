import { FC, ReactNode, useEffect, useState } from 'react'
import { getLatestData, getUser } from '../../Helpers/api/backendConnect/api'
import { Post } from '../../Models/Post'
import Loader from '../Loader/Loader'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../Ui/Accordion'
import './LatestPost.css'

interface LatestPostProps {}

const LatestPost: FC<LatestPostProps> = () => {
  const [LatestData, setLatestPost] = useState<Post | null>()
  const [loading, setLoading] = useState<boolean>(true)
  const [postAuthor, setPostAuthor] = useState<string>()
  const getlatesPost = async () => {
    try {
      const latest = await getLatestData('posts')
      if (latest.isSuccess) {
        setLatestPost(latest.post)
        try {
          const author = await getUser('users', latest.post.userId)
          if (author.status === 201) {
            const { user } = author
            setPostAuthor(user.firstname + ' ' + user.lastname)
          }
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getlatesPost()
  }, [])
  return (
    <div className="article border-l border-b shadow-sm">
      {loading ? (
        <Loader />
      ) : (
        <>
          {LatestData ? (
            <>
              <div className="blogIlustra p-4 flex justify-between">
                <img
                  className="text-wrap w-52"
                  src={LatestData.image as string}
                  alt={"image de l'article sur" + LatestData.title}
                />
                <div className="descri">
                  <h2 className="font-bold text-3xl">{LatestData.title}</h2>
                  <p>
                    Published by <span className="font-bold">{postAuthor}</span> at{' '}
                    {LatestData.publishedAt as ReactNode}
                  </p>
                </div>
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="p-2 ">
                    Lire en entier{' '}
                  </AccordionTrigger>
                  <AccordionContent>{LatestData.content}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          ) : (
            <div className="d">NO article</div>
          )}
        </>
      )}
    </div>
  )
}
export default LatestPost
