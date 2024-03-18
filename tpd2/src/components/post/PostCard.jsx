import React from "react";
import { Link } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import ImgBox from "../ImgBox";

export default function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <ImgBox src={PostServices.getFilePreview(featuredImage)} alt={title} />
      <div>
        <h1>{title}</h1>
      </div>
    </Link>
  );
}
