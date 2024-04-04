import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { NotFound, Loader, CardBox } from "../";
import { PostForm, RepliesComp } from "../post";

export default function Post() {
  const navigate = useNavigate();
  const { userId, postId } = useParams();
  const [profile, setprofile] = useState(null)
  const [post, setpost] = useState(null);
  const [loading, setloading] = useState(true);

  const getPost = async () => {
    if (userId && postId) {
      const proRes = await PostServices.getProfile(userId);
      const postRes = await PostServices.getPost(postId);
      if (proRes && postRes) {
        setprofile(proRes)
        setpost(postRes);
        setloading(false);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getPost();
  }, [userId, postId, navigate]);

  return !loading ? (
    post ? (
      <CardBox>
        <PostForm profile={profile} post={post}/>
        <RepliesComp />
      </CardBox>
    ) : (
        <NotFound title="Post Not Found" />
      )
  ) : (
      <Loader />
    );
}
