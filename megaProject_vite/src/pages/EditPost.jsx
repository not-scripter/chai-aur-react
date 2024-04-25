import React, { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import { appwriteService } from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPost() {

const navigate = useNavigate();

const [post, setpost] = useState(null);

const {slug} = useParams();

 useEffect(() => {
  if (slug) {
   appwriteService.getPost(slug)
    .then(post => {
     if (post) setpost(post)
     })
  } else navigate("/")
 }, [slug, navigate]);

return post ? (
<div className='py-8'>
<Container>
<PostForm post={post}/>
</Container>
</div>
) : (
 <div>
  <h2>Post Not Found</h2>
 </div>
)

}
