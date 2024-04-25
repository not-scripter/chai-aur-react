import React, { useState, useEffect } from 'react'
import { Container, Loading, PostCard } from '../components/index'
import { appwriteService } from '../appwrite/config'
import { useSelector } from 'react-redux'

export default function Home() {

 const [loading, setloading] = useState(true);
 const authStatus = useSelector(state => state.auth.status)
 const [posts, setposts] = useState([])

 useEffect(() => {
  appwriteService.getPosts()
   .then(posts => {
    if (posts) {
     setposts(posts.documents)
     setloading(false)
    } else setloading(false)
   })
 }, [])

return !loading ? (
 <div className='py-8'>
 <Container>
 <div className='flex flex-wrap'>
 {
  authStatus ? ( posts.length !== 0 ?
  posts.map(post => (
   <div key={post.$id}>
   <PostCard {...post} />
   </div>
  )) : 
   <h1 className="text-2xl font-bold hover:text-gray-500">
   SignIn to View Posts
   </h1>
  ) : (
   <h1 className="text-2xl font-bold hover:text-gray-500">
   SignIn to View Posts
   </h1>
  )
 }
 </div>
 </Container>
 </div>
) : (
 <Loading />
)

}
