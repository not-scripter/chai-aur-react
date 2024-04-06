import React, { useEffect, useState } from "react";
import { CardBox } from "../components";
import { DocForm } from "../components/post";
import { useParams } from "react-router-dom";
import { PostServices } from "../appwrite";

export default function NewReply() {
  const { postId } = useParams();
  const [doc, setdoc] = useState(null);
  const getDoc = async () => {
    const docRes = await PostServices.getPost(postId);
    if (docRes) {
      setdoc(docRes);
    }
  };
  useEffect(() => {
    getDoc();
  }, []);
  return (
    <>
      <CardBox>
        <DocForm typeReply replyTo={doc?.userId} replyToId={doc?.$id} />
      </CardBox>
    </>
  );
}
