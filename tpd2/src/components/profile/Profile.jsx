import React from "react";
import { useParams } from "react-router-dom";
import { PostServices } from "../../appwrite";

export default function Profile() {
  const { slug } = useParams();

  const getProfile = async () => {
    const proRes = await PostServices.getProfile(slug);
  };
  return <div>Profile</div>;
}
