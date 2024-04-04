import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../../appwrite";
import { CardBox } from "../../";
import ReplyForm from "./ReplyForm";

export default function Reply() {
  const navigate = useNavigate();
  const { userId, replyId } = useParams();
  const [profile, setprofile] = useState(null);
  const [reply, setreply] = useState(null);
  const [loading, setloading] = useState(true);

  const getPost = async () => {
    if (userId && replyId) {
      const proRes = await PostServices.getProfile(userId);
      const repRes = await PostServices.getReply(replyId);
      if (proRes && repRes) {
        setprofile(proRes);
        setreply(repRes);
        setloading(false);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getPost();
  }, [userId, replyId, navigate]);

  return !loading ? (
    post ? (
      <CardBox>
        <ReplyForm profile={profile} reply={reply} />
        {/*<Replies />*/}
      </CardBox>
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
