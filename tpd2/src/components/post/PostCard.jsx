import React from "react";
import { Link } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import ImgBox from "../ImgBox";
import CardBox from "../CardBox";

export default function PostCard({ slug, title, images }) {
  return (
    <Link to={`/post/${slug}`} key={slug}>
      <CardBox>
        <ImgBox src={PostServices.getFilePreview({ fileId: images })} alt={title} />
        <div>
          <h1>{title}</h1>
        </div>
      </CardBox>
    </Link>
  );
}
