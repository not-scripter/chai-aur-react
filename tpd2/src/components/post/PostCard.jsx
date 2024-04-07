import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import { Loader, ImgBox, CardBox, Paragraph } from "../";
import { DocActions, UserHeader } from "./";

export default function PostCard({ userId, postId }) {
  const [user, setuser] = useState(null);
  const [post, setpost] = useState(null);
  const [loading, setloading] = useState(true);

  const getData = async () => {
    const proRes = await PostServices.getProfile(userId);
    const posRes = await PostServices.getPost(postId);
    if (proRes && posRes) {
      setuser(proRes);
      setpost(posRes);
      setloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return !loading ? (
    <CardBox key={postId}>
      <UserHeader user={user} post={post} />
      <Link to={`/post/${postId}`}>
        <Paragraph>{post.content}</Paragraph>
        {post.images && (
          <ImgBox src={PostServices.getFilePreview(post.images)} />
        )}
      </Link>
      <DocActions userId={userId} postId={postId} />
    </CardBox>
  ) : (
    <Loader />
  );
}
