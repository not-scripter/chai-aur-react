import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function User() {
 const {username} = useParams()
 const [userDetected, setuserDetected] = useState(false)
 const users = [
  {
   userName: "user1",
   userId: "1"
  },
  {
   userName: "user2",
   userId: "2"
  },
  {
   userName: "user3",
   userId: "3"
  },
 ]
 const userNotFound = {
  title: "User Not Found"
 }

 const userFinder = users.filter((items) => (items.userName == username))

  const userChecker = useEffect(() => {
  if (userFinder.length > 0) {
   setuserDetected(true)
  } else {
   setuserDetected(false)
  }
 }, [username])

 const userFounded = userDetected ? userFinder[0].userName : userNotFound.title ;

  return (
    <div className='flex items-center justify-center bg-fuchsia-50 p-20'>User: {userFounded}</div>
  )
}
