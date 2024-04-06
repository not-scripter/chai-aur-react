import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../../appwrite";
import { DocForm } from "../";
import NotFound from "../../NotFound";

export default function EditReply() {
  const { replyId } = useParams();
  const navigate = useNavigate();
  const [user, setuser] = useState(null);
  const [reply, setreply] = useState(null);

  const getPost = async () => {
    if (replyId) {
      const repRes = await PostServices.getReply(replyId);
      if (repRes) {
        const userRes = await PostServices.getProfile(repRes.userId);
        if (repRes && userRes) {
          setuser(userRes);
          setreply(repRes);
        }
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getPost();
  }, [navigate]);

  return reply ? (
    <DocForm user={user} reply={reply} />
  ) : (
    <NotFound title="Post Not Found" />
  );
}
