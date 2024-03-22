import React, { useEffect, useState } from "react";
import PostServices from "../../appwrite/PostServices";
import PostCard from "./PostCard";
import NotFound from "../NotFound";

export default function AllPost() {
  const [posts, setposts] = useState(null);

  useEffect(() => {
    PostServices.getPosts([]).then(
      (posts) => posts && setposts(posts.documents),
    );
  }, []);

  return posts 
    ? posts.map(item => <PostCard slug={item.$id} title={item.title} images={item.images}/>) 
    : <NotFound title="Post Not Found" />;
}
