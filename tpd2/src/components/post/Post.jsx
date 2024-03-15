import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import NotFound from "../NotFound";
import Input from "../Input";
import TextArea from "../TextArea";
import ImgBox from "../ImgBox";
import Button from "../Button";

export default function Post() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setpost] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === ussrData.$id : false;

  const deletePost = () => {
    PostServices.deletePost(slug).then((status) => {
      if (status) {
        PostServices.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (post) {
      PostServices.getPost(slug).then((post) =>
        post ? setpost(post) : navigate("/"),
      );
    } else {
      navigate("/");
    }
  }, [post, navigate]);

  return post ? (
    <div>
      <Input label="Title" value={post.title} readOnly />
      <TextArea label="Content">{post.content}</TextArea>
      {post.featuredImage && (
        <ImgBox src={PostServices.getFilePreview(post.featuredImage)} />
      )}
      {
        isAuthor && (
          <>
        <Button onClick={navigate(`/edit-post/${slug}`)}>Edit</Button>
        <Button onClick={deletePost}>Delete</Button>
        </>
        )
      }
    </div>
  ) : (
    <NotFound title="Post Not Found" />
  );
}
