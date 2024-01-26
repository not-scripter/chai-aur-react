import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import { appwriteService } from '../appwrite/config'

export default function Home() {

const [posts, setposts] = useState([])

 useEffect(() => {
  if (slug) {
   appwriteService.getPosts()
    .then(posts => {
     if (posts) {
      setposts(posts.document)
     }  })
  }
 }, [])

if (posts.length === 0) {
  <h1>post not found</h1>
}

return (
 <div className='py-8'>
 <Container>
 <div className='flex flex-wrap'>
 {
  posts.map(post => (
   <div key={post.$id}>
   <PostCard {...post} className="p-2 w-1/4" />
   </div>
  ))
 }
 </div>
 </Container>
 </div>
)

}
