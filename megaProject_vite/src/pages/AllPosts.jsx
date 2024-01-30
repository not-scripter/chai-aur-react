import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import { appwriteService } from '../appwrite/config'

export default function AllPosts() {

const [posts, setposts] = useState([])

 useEffect(() => {
  appwriteService.getPosts([]).then(posts => {
   if (posts) {
    setposts(posts.documents)
   }
  })
 }, [])


 return (
  <div 
  className='py-8'>
  <Container>
  <div 
  className='flex flex-wrap'>
  {
   posts.map(post => (
    <div key={post.$id}>
    <PostCard 
    {...post}
    />
    </div>
   ))
  }
  </div>
  </Container>
  </div>
 )
}
