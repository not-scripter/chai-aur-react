import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { NotFound, Loader, CardBox } from "../";
import { PostForm, Replies } from "../post";
import ReplieCard from "./replies/ReplyCard";

export default function Post() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setpost] = useState(null);
  const [loading, setloading] = useState(true);

  const getPost = async () => {
    if (postId) {
      const res = await PostServices.getPost(postId);
      if (res) {
        setpost(res);
        setloading(false);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getPost();
  }, [postId, navigate]);

  return !loading ? (
    post ? (
      <CardBox>
      <PostForm post={post} />
        <Replies />
      </CardBox>
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
