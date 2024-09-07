import React, { Fragment } from 'react'

import LatestPost from '../components/LatestPost/LatestPost'
import { Button } from '../components/Ui/Button'
import { Link } from 'react-router-dom'

export const Home: React.FC = () => {
  return (
    <Fragment>
      <section className="w-full md:w-[50rem] mt-10">
        <div className="latest w-full p-4 border-b-4 shadow-sm bg-muted text-muted-foreground">
          <h2 className="font-bold text-2xl"> latest Post</h2>
        </div>
        <LatestPost />
        <div className="call-to-action flex mt-4 w-fit gap-4">
          <Button variant="default">
            <Link to={'/posts'}>Show more posts</Link>
          </Button>
          <Button variant="secondary">
            <Link to={'/posts'}>Add Posts</Link>
          </Button>
        </div>
      </section>
    </Fragment>
  )
}
