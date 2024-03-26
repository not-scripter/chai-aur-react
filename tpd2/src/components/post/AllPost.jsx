import React, { useEffect, useState } from "react";
import PostServices from "../../appwrite/PostServices";
import PostCard from "./PostCard";
import NotFound from "../NotFound";
import Loader from "../Loader";

export default function AllPost() {
  const [posts, setposts] = useState(null);
  const [loading, setloading] = useState(true)
  useEffect(() => {
    PostServices.getPosts([]).then(
      (posts) => posts && setposts(posts.documents),
    ).finally(() => setloading(false))
  }, []);

  return !loading ? (
    posts ? (
      posts.map((item) => <PostCard slug={item.$id} {...item} />)
    ) : <NotFound title="Post Not Found" />
  ) : <Loader />
}
