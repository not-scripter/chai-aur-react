import React, { useEffect, useState } from "react";
import PostServices from "../../../appwrite/PostServices";
import { Loader, ImgBox, CardBox, Paragraph } from "../../";
import { Link, useNavigate } from "react-router-dom";
import { DocActions, UserHeader } from "../";

export default function ReplyCard({ userId, replyId }) {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [reply, setreply] = useState(null);

  const getData = async () => {
    if (userId && replyId) {
      const proRes = await PostServices.getProfile(userId);
      const repRes = await PostServices.getReply(replyId);
      if (proRes && repRes) {
        setuser(proRes);
        setreply(repRes);
        setloading(false);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return !loading ? (
    <CardBox key={replyId}>
      <UserHeader user={user} doc={reply} />
      <Link to={`/reply/${replyId}`}>
        <Paragraph>{reply.content}</Paragraph>
        {reply.images && (
          <ImgBox src={PostServices.getFilePreview(reply.images)} />
        )}
      </Link>
      <DocActions userId={userId} replyId={replyId} />
    </CardBox>
  ) : (
    <Loader />
  );
}
