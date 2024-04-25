import React, { useEffect, useState } from "react";
import { CardBox } from "../components";
import { DocForm } from "../components/post";
import { useParams } from "react-router-dom";
import { PostServices } from "../appwrite";

export default function NewReply() {
  const { postId, replyId } = useParams();
  const [doc, setdoc] = useState(null);
  const docId = postId ? postId : replyId ? replyId : null;
  const docType = postId ? "post" : replyId ? "reply" : null;
  const typePost = postId ? true : false;
  const typeReply = replyId ? true : false;

  const getDoc = async () => {
    const docRes = await PostServices.getDoc({
      docType,
      docId,
    });
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
        <DocForm
          typeReply={typeReply}
          typePost={typePost}
          replyToDoc={doc}
          replyToId={docId}
          replyToType={docType}
        />
      </CardBox>
    </>
  );
}
