import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../../appwrite";
import { Button, CardBox, Confirm, ImgBox, Loader, NotFound, Paragraph } from "../../";
import { DocActions, RepliesComp, UserHeader } from "..";
import { useSelector } from "react-redux";

export default function Reply() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const { replyId } = useParams();
  const [user, setuser] = useState(null);
  const [reply, setreply] = useState(null);
  const { profileData } = useSelector(state => state.auth)
  const isAuthor = profileData.$id === user?.$id ? true : false;

  const [open, setopen] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false);

  const getData = async () => {
    if (replyId) {
      const repRes = await PostServices.getReply(replyId);
      if (repRes) {
        const proRes = await PostServices.getProfile(repRes.userId);
        if (proRes && repRes) {
          setuser(proRes);
          setreply(repRes);
          setloading(false);
        }
      }
    } else {
      navigate("/");
    }
  };

  const deleteReply = async () => {}

  useEffect(() => {
    getData();
  }, [replyId, navigate]);

  return !loading ? (
    reply ? (
      <CardBox>
        <UserHeader user={user} reply={reply}/>
        <Paragraph>
          {reply.content}
        </Paragraph>
        { reply.images && <ImgBox src={PostServices.getFilePreview(reply.images)}/> }
        <DocActions userId={user?.$id} replyId={replyId}/>
        <RepliesComp userId={user?.$id} replyId={replyId}/>
        {/* Extras */}
      <Confirm open={open} setopen={setopen} warningDesc="Are You Sure ? You want to Delete this Reply" proceedText="Delete" proceedTo={deleteReply} loading={btnLoading}/>
      </CardBox>
    ) : (
      <NotFound title="Post Not Found" />
    )
  ) : (
    <Loader />
  );
}
        // <ReplyFormComp user={user} reply={reply} />
