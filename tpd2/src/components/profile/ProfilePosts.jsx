import React from "react";
import { useState, useEffect } from "react";
import { PostServices } from "../../appwrite";
import { useSelector } from "react-redux";
import { Loader, NotFound } from "../";
import { PostCard } from "../post";
import { useParams } from "react-router-dom";

export default function ProfilePosts() {
  const { userId } = useParams();
  const [posts, setposts] = useState(null);
  const { profileData } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(true);
  const isAuthor = userId === profileData.username ? true : false;

  const getMyPosts = async () => {
    const postsRes = isAuthor
      ? await PostServices.getMyPosts(profileData.$id)
      : await PostServices.getPublicPosts(userId);
    if (postsRes) {
      setposts(postsRes.documents);
      setloading(false);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, [userId, profileData]);

  return !loading ? (
    posts.length > 0 ? (
      <div className="flex flex-col gap-2">
      {posts.map((item) => <PostCard userId={item.userId} postId={item.$id} />)}
      </div>
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
