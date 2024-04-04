import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostServices } from '../../../appwrite'
import { useSelector } from 'react-redux'
import ReplieCard from './ReplyCard'
import { Loader, NotFound } from '../../'

export default function Replies() {
  const {profileData} = useSelector(state => state.auth)
  const {userId, postId} = useParams()
  const [replies, setreplies] = useState([])
  const isAuthor = profileData.$id === userId ? true : false ;
  const [loading, setloading] = useState(true);

  const getReplies = async () => {
    const repRes = await PostServices.getReplies(postId)
    if (repRes) {
      setreplies(repRes)
      setloading(false)
    }
  }

  // const replies = useCallback(
  //   () => {
  //   PostServices.getReplies(postId).then(res => res)
  //   },
  //   [],
  // )

  useEffect(() => {
    getReplies()
  }, [userId, postId])
  console.log(replies)

  return !loading ? (
    replies.length > 0 ? (
      <div className="flex flex-col gap-2">
      {posts.map((item) => <ReplieCard userId={item.userId} {...item} />)}
      </div>
    ) : (
      <NotFound title="No Reply- Found" />
    )
  ) : (
    <Loader />
  );
}
