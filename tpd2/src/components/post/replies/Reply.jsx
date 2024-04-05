import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../../appwrite";
import { CardBox } from "../../";
import { RepliesComp, ReplyFormComp } from "..";

export default function Reply() {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const { userId, replyId } = useParams();
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
  }, [userId, replyId, navigate]);

  return !loading ? (
    post ? (
      <CardBox>
        <ReplyFormComp user={user} reply={reply} />
        <RepliesComp userId={userId} replyId={replyId} />
      </CardBox>
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
