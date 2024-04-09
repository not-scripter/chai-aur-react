import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { NotFound, Loader, CardBox, Paragraph, ImgBox } from "../";
import { DocActions, RepliesComp, UserHeader } from "../post";

export default function Post() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const { postId } = useParams();
  const [user, setuser] = useState(null);
  const [post, setpost] = useState(null);

  const getData = async () => {
    if (postId) {
      const postRes = await PostServices.getPost(postId);
      if (postRes) {
        const proRes = await PostServices.getProfile(postRes.userId);
        if (proRes && postRes) {
          setuser(proRes);
          setpost(postRes);
          setloading(false);
        }
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getData();
  }, [postId, navigate]);

  return !loading ? (
    post ? (
      <CardBox>
        <UserHeader user={user} post={post} giveActions />
        <Paragraph>{post.content}</Paragraph>
        {post.images && (
          <ImgBox src={PostServices.getFilePreview(post.images)} />
        )}
        <DocActions userId={user?.$id} postId={postId} />
        <RepliesComp userId={user?.$id} postId={postId} />
      </CardBox>
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
