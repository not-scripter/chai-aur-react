import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../../appwrite";
import { CardBox, ImgBox, Loader, NotFound, Paragraph } from "../../";
import { DocActions, RepliesComp, UserHeader } from "..";

export default function Reply() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const { replyId } = useParams();
  const [user, setuser] = useState(null);
  const [reply, setreply] = useState(null);
  const [replyToDoc, setreplyToDoc] = useState(null);

  const getData = async () => {
    if (replyId) {
      const repRes = await PostServices.getReply(replyId);
      if (repRes) {
        const proRes = await PostServices.getProfile(repRes.userId);
        const toRes =
          repRes.replyToType === "post"
            ? await PostServices.getPost(repRes.replyToId)
            : repRes.replyToType === "reply"
              ? await PostServices.getReply(repRes.replyToId)
              : null;
        if (proRes && repRes && toRes) {
          setuser(proRes);
          setreply(repRes);
          setreplyToDoc(toRes);
          setloading(false);
        }
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getData();
  }, [replyId, navigate]);

  return !loading ? (
    reply ? (
      <CardBox>
        <UserHeader user={user} reply={reply} giveActions replyToDoc={replyToDoc} />
        <Paragraph>{reply.content}</Paragraph>
        {reply.images && (
          <ImgBox src={PostServices.getFilePreview(reply.images)} />
        )}
        <DocActions userId={user?.$id} replyId={replyId} />
        <RepliesComp userId={user?.$id} replyId={replyId} />
      </CardBox>
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
// <ReplyFormComp user={user} reply={reply} />
