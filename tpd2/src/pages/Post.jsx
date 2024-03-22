import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostServices from "../appwrite/PostServices";
import { Container, NotFound, PostForm } from "../components";

export default function Post() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setpost] = useState(null);

  useEffect(() => {
    if (slug) {
      PostServices.getPost(slug).then((res) => res && setpost(res));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return (
    <Container>
      {post ? <PostForm post={post} /> : <NotFound title="Post Not Found" />}
    </Container>
  );
}
