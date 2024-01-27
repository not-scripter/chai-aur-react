import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import { appwriteService } from '../appwrite/config'

export default function Home() {

const [posts, setposts] = useState([])

 useEffect(() => {
  appwriteService.getPosts()
   .then(posts => {
    if (posts) {
     setposts(posts.documents)
    }
   })
 }, [])

 if (posts.length === 0) {
  return (
   <div className="w-full py-8 mt-4 text-center">
   <Container>
   <div className="flex flex-wrap">
   <div className="p-2 w-full">
   <h1 className="text-2xl font-bold hover:text-gray-500">
   Login to read posts
   </h1>
   </div>
   </div>
   </Container>
   </div>
  )
 }

return (
 <div className='py-8'>
 <Container>
 <div className='flex flex-wrap'>
 {
  posts.map(post => (
   <div key={post.$id}>
   <PostCard {...post} />
   </div>
  ))
 }
 </div>
 </Container>
 </div>
)

}
