import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostServices } from '../../../appwrite'
import { useSelector } from 'react-redux'
import { Loader, NotFound } from '../../'
import { ReplyCardComp } from '..'

export default function Replies() {
  const {profileData} = useSelector(state => state.auth)
  const {userId, postId} = useParams()
  const [replies, setreplies] = useState([])
  const isAuthor = profileData.$id === userId ? true : false ;
  const [loading, setloading] = useState(true);

  const getReplies = async () => {
    const repRes = await PostServices.getReplies(postId)
    if (repRes) {
      setreplies(repRes.documents)
      setloading(false)
    }
  }

  useEffect(() => {
    getReplies()
  }, [userId, postId])

  return !loading ? (
    replies.length > 0 ? (
      <div className="flex flex-col gap-2">
      {replies.map((item) => <ReplyCardComp userId={item.userId} replyId={item.$id}/>)}
      </div>
    ) : (
      <NotFound title="No Reply- Found" />
    )
  ) : (
    <Loader />
  );
}
