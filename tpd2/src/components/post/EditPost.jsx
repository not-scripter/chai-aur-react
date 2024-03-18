import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PostServices from '../../appwrite/PostServices'
import NotFound from '../NotFound'
import PostForm from './PostForm'

export default function EditPost() {
  const {slug} = useParams()
  const navigate = useNavigate()
  const [post, setpost] = useState(null)

  useEffect(() => {
    if (post) {
      PostServices.getPost(post).then(data => setpost(data))
    } else {
      navigate("/")
    }
  }, [slug, navigate])
  return post ? (
    <PostForm post={post}/>
  ) : (
  <NotFound title='Post Not Found'/>
  )
}
