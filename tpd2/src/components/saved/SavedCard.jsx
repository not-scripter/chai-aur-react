import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostServices from "../../appwrite/PostServices";
import { Loader, NotFound } from "../";
import { PostCard } from "../post";

export default function SavedCard() {
  const { profileData } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(true);
  const [posts, setposts] = useState([]);
  const getPosts = async () => {
    profileData.saved.map(async (postId) => {
      if (postId) {
        const posRes = await PostServices.getPost(postId);
        if (posRes) {
          setposts((prev) => [...prev, posRes]);
          setloading(false);
        }
      }
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return !loading ? (
    posts.length > 0 ? (
      <div className="flex flex-col gap-2">
        {posts.map((item) => (
          <PostCard slug={item.$id} {...item} />
        ))}
      </div>
    ) : (
      <NotFound title="You Have't Save Anything" />
    )
  ) : (
    <Loader />
  );
}
