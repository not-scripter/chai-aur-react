import React from "react";
import { useState, useEffect } from "react";
import { PostServices } from "../../appwrite";
import { useSelector } from "react-redux";
import { Loader, NotFound } from "../";
import { PostCard } from "../post";

export default function Posts() {
  const [posts, setposts] = useState(null);
  const { profileData } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(true);

  const getMyPosts = async () => {
    const postsRes = await PostServices.getMyPosts(profileData.$id);
    if (postsRes) {
      setposts(postsRes.documents);
      setloading(false);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, [profileData]);

  return !loading ? (
    posts.length > 0 ? (
      <div className="flex flex-col gap-2">
        {posts.map((item) => (
          <PostCard slug={item.$id} {...item} />
        ))}
      </div>
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
