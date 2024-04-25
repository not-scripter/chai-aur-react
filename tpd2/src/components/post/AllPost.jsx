import React, { useEffect, useState } from "react";
import { PostServices } from "../../appwrite";
import { NotFound, Loader } from "../";
import { PostCard } from "../post";

export default function AllPost() {
  const [posts, setposts] = useState(null);
  const [loading, setloading] = useState(true);

  const getPosts = async () => {
    const allPosts = await PostServices.getPosts();
    if (allPosts) {
      setposts(allPosts.documents);
      setloading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return !loading ? (
    posts.length > 0 ? (
      posts.map((item) => <PostCard userId={item.userId} postId={item.$id} />)
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
