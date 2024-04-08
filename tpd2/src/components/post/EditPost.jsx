import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostServices } from '../../appwrite'
import { NotFound } from '../'
import { DocForm } from '../post'

export default function EditPost() {
  const {postId} = useParams()
  const navigate = useNavigate()
  const [user, setuser] = useState(null)
  const [post, setpost] = useState(null)

  const getPost = async () => {
    if (postId) {
      const postRes = await PostServices.getPost(postId) 
      if (postRes) {
        const userRes = await PostServices.getProfile(postRes.userId)
        if (postRes && userRes) {
          setuser(userRes)
          setpost(postRes)
        }
      }
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    getPost()
  }, [postId, navigate])

  return post ? (
    <DocForm user={user} post={post}/>
  ) : (
  <NotFound title='Post Not Found'/>
  )
}
