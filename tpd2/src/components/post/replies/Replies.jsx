import React, { useEffect, useState } from "react";
import { PostServices } from "../../../appwrite";
import { Loader, NotFound } from "../../";
import { ReplyCardComp } from "..";

export default function Replies({ userId, postId, replyId }) {
  const [replies, setreplies] = useState([]);
  const [loading, setloading] = useState(true);

  const getReplies = async () => {
    const repRes = await PostServices.getReplies(postId || replyId);
    if (repRes) {
      setreplies(repRes.documents);
      setloading(false);
    }
  };

  useEffect(() => {
    getReplies();
  }, [userId, postId]);

  return !loading ? (
    replies.length > 0 ? (
      <div className="flex flex-col gap-2">
        {replies.map((item) => (
          <ReplyCardComp userId={item.userId} replyId={item.$id} />
        ))}
      </div>
    ) : (
      <NotFound title="No Reply Found" />
    )
  ) : (
    <Loader />
  );
}
