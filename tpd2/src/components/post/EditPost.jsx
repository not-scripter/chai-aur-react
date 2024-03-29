import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PostServices } from '../../appwrite'
import { NotFound } from '../'
import { PostForm } from '../post'

export default function EditPost() {
  const {slug} = useParams()
  const navigate = useNavigate()
  const [post, setpost] = useState(null)

  const getPost = async () => {
    if (slug) {
      const post = await PostServices.getPost(slug)
      if (post) {
      setpost(data)
      }
    } else {
      navigate("/")
    }
  }

  useEffect(() => {
    getPost()
  }, [slug, navigate])

  return post ? (
    <PostForm post={post}/>
  ) : (
  <NotFound title='Post Not Found'/>
  )
}
