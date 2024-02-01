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


 return posts.length > 0 ? (
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
 ) : (
   <div className="w-full py-8 mt-4 text-center">
   <Container>
   <div className="flex flex-wrap">
   <div className="p-2 w-full">
   <h1 className="text-2xl font-bold hover:text-gray-500">
   No Post Found 
   </h1>
   </div>
   </div>
   </Container>
   </div>
 )
}
