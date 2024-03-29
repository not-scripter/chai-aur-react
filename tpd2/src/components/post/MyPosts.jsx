import React from "react";
import { useState, useEffect } from "react";
import { PostServices } from "../../appwrite";
import { useSelector } from "react-redux";
import { Loader, NotFound } from "../";
import { PostCard } from "../post"

export default function MyPosts() {
  const [myPosts, setmyPosts] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setloading] = useState(true)

  const getMyPosts = async () => {
   const myPosts = await PostServices.getMyPosts(userData.$id)
    if (myPosts) {
      setmyPosts(myPosts.documents)
      setloading(false)
    }
  }

  useEffect(() => {
    getMyPosts()
  }, [userData]);

  return !loading ? myPosts.length > 0 ? (
      myPosts.map((item) => <PostCard slug={item.$id} {...item} />)
  ) : (
    <NotFound title="Post Not Found" />
  ) : <Loader />
}
