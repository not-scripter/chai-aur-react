import React from "react";
import { useState, useEffect } from "react";
import { PostServices } from "../../appwrite";
import { useSelector } from "react-redux";
import { Loader, NotFound } from "../";
import { useParams } from "react-router-dom";
import { ReplyCardComp } from "../post";

export default function ProfileReplies() {
  const { userId } = useParams();
  const [replies, setreplies] = useState(null);
  const { profileData } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(true);
  const isAuthor = userId === profileData.username ? true : false;

  const getData = async () => {
    const docsRes = isAuthor
      ? await PostServices.getMyReplies(profileData.$id)
      : await PostServices.getUsersReplies(userId);
    if (docsRes) {
      setreplies(docsRes.documents);
      setloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [userId, profileData]);

  return !loading ? (
    replies.length > 0 ? (
      <div className="flex flex-col gap-2">
      {replies.map((item) => <ReplyCardComp userId={item.userId} replyId={item.$id} />)}
      </div>
    ) : (
      <NotFound title="Reply Not Found" />
    )
  ) : (
    <Loader />
  );
}
