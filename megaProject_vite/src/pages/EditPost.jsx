import React, { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import { appwriteService } from '../appwrite/config'
import { Navigate, useParams } from 'react-router-dom'

export default function EditPost() {

const navigate = Navigate()

const [post, setpost] = useState(null)

const {slug} = useParams()

 useEffect(() => {
  if (slug) {
   appwriteService.getPost(slug)
    .then(post => {
     if (post) {
      setpost(post)
     }  })
  } else navigate("/")
 }, [slug, navigate])

return post ? (
<div className='py-8'>
<Container>
<PostForm post={post}/>
</Container>
</div>
) : null
}
