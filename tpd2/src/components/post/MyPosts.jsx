import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PostServices from "../../appwrite/PostServices";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import NotFound from "../NotFound";

export default function MyPosts() {
  const [myPosts, setmyPosts] = useState(null);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    PostServices.getMyPosts({ userId: userData.$id }).then((data) =>
      setmyPosts(data.documents),
    );
  }, []);

  return myPosts ? (
    myPosts.map((item) => (
      <PostCard slug={item.$id} title={item.title} images={item.images} />
    ))
  ) : (
    <NotFound title="Post Not Found" />
  );
}
