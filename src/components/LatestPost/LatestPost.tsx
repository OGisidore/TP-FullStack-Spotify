import React, { FC, ReactNode, useEffect, useState } from 'react'
import './LatestPost.css'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../Ui/Accordion'
import { Post } from '../../Models/Post'
import { getLatestData } from '../../Helpers/api/backendConnect/api'

interface LatestPostProps {}

const LatestPost: FC<LatestPostProps> = () => {
  const [LatestData, setLatestPost] = useState<Post | null>()
  const getlatesPost = async () => {
    try {
      const latest = await getLatestData('posts')
      if (latest.status === 200) {
        setLatestPost(latest.post)
        console.log(latest.post)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getlatesPost()
  }, [])
  return (
    <div className="article border-l border-b shadow-sm">
      {LatestData ? (
        <>
          <div className="blogIlustra flex">
            <img
              className="text-wrap w-52"
              src={LatestData.image as string}
              alt=""
            />
            <div className="descri">
              <h2 className="font-bold text-3xl">{LatestData.title}</h2>
              <p>create at {LatestData.publishedAt as ReactNode}</p>
            </div>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="">Lecture</AccordionTrigger>
              <AccordionContent>{LatestData.content}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ) : (
        <div className="d">NO article</div>
      )}
    </div>
  )
}
export default LatestPost
