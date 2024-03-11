import React from 'react'
import { Link } from 'react-router-dom'
import PostServices from '../../appwrite/PostServices'

export default function PostCard({
  $id,
  title,
  featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
      <img
        src={PostServices.getFilePreview(featuredImage)}
        alt={title}
      />
      <div>
        <h1>{title}</h1>
      </div>
    </Link>
  )
}
