import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { NotFound, Loader } from "../";
import { PostForm } from "../post";

export default function Post() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setpost] = useState(null);
  const [loading, setloading] = useState(true);

  const getPost = async () => {
    if (slug) {
      const res = await PostServices.getPost(slug);
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
  }, [slug, navigate]);

  return !loading ? (
    post ? (
      <PostForm post={post} />
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
