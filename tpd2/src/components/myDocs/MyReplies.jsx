import React from "react";
import { useState, useEffect } from "react";
import { PostServices } from "../../appwrite";
import { useSelector } from "react-redux";
import { Loader, NotFound } from "../";
import { ReplyCardComp } from "../post";

export default function MyReplies() {
  const [replies, setreplies] = useState(null);
  const { profileData } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(true);

  const getData = async () => {
    const repRes = await PostServices.getMyReplies(profileData.$id);
    if (repRes) {
      setreplies(repRes.documents);
      setloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [profileData]);

  return !loading ? (
    replies.length > 0 ? (
      <div className="flex flex-col gap-2">
        {replies.map((item) => (
          <ReplyCardComp userId={item.userId} replyId={item.$id} />
        ))}
      </div>
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
