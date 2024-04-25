"use client"

import { useParams } from "react-router-dom"

const User = () => {

 const {userid} = useParams()

  return (
    <div className="bg-red-200 flex justify-center text-3xl p-4">User: {userid}</div>
  )
}

export default User
