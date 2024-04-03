import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostServices } from '../../appwrite'
import { NotFound } from '../'
import { PostForm } from '../post'

export default function EditPost() {
  const {userId} = useParams()
  const navigate = useNavigate()
  const [post, setpost] = useState(null)

  const getPost = async () => {
    if (userId) {
      const post = await PostServices.getPost(userId) 
      if (post) {
      setpost(data)
      }
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    getPost()
  }, [userId, navigate])

  return post ? (
    <PostForm post={post}/>
  ) : (
  <NotFound title='Post Not Found'/>
  )
}
