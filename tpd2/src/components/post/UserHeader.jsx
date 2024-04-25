import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { EditSvg, defaultAvatar } from "../../assets";
import { useSelector } from "react-redux";
import { Button, Confirm } from "../";
import toast from "react-hot-toast";

export default function UserHeader({user, post, reply, giveActions=false, replyToDoc}) {
  const navigate = useNavigate(); 
  const doc = post ? post : reply ? reply : null;
  const docType = 
    post ? "post" 
      : reply ? "reply" 
        : null;
  const docsType = docType === "post" ? "posts" : "reply" ? "replies" : "save" ? "saves" : null;

  const { profileData } = useSelector((state) => state.auth);
  const isAuthor = profileData.$id === user?.$id ? true : false;
  const [isFollowing, setisFollowing] = useState(profileData.following.find(item => item === user?.$id))

  const [open, setopen] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false);

  const handleFollow = async () => {
    setbtnLoading(true);
    if (!isFollowing) {
      const followRes = await PostServices.updateProfile({
        userId: user.$id,
        followers: [...user.followers, profileData.$id],
      });
      if (followRes) {
        const followingRes = await PostServices.updateProfile({
          userId: profileData.$id,
          following: [...profileData.following, user.$id],
        });
        if (followingRes) {;
          setisFollowing(true);
          setbtnLoading(false);
        }
      }
    }
  };

  const deleteDoc = async () => {
    setbtnLoading(true)
    if (post) {
      post.images && await PostServices.deleteFile(post.images);
      await PostServices.deletePost(post.$id)
      .then(async (res) => await PostServices.updateProfile({
        userId: profileData.$id,
        posts: profileData.posts.filter((item) => item !== res.$id),
      }))
      .then(async () => await PostServices.deleteReplies(post.$id))
      .then(() => {
        toast.success(`Post Deleted`)
        setbtnLoading(false)
        setopen(false);
        navigate("/");
      })
    } else if (reply) {
      reply.images && await PostServices.deleteFile(reply.images);
      const repRes = await PostServices.deleteReply(reply.$id)
      if (reply.replyToType === "post" && repRes)
      await PostServices.updatePost({
        postId: reply.replyToId,
        replies: [...replyToDoc.replies.filter(item => item !== reply.$id)]
      })
      .then(async () => await PostServices.updateProfile({
        userId: profileData.$id,
        replies: profileData.replies.filter((item) => item !== reply.$id),
      }))
      .then(async () => await PostServices.deleteReplies(reply.$id))
      .then(() => {
        toast.success(`Reply Deleted`)
        setbtnLoading(false)
        setopen(false);
        navigate("/");
      })
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Link to={user ? `/${user?.$id}` : `/${profileData.$id}`}>
          <div className="flex gap-2 items-center">
            <img
              className="w-8 h-8 bg-cover rounded-full shadow-md shadow-secondary/50"
              src={
                user
                  ? user.avatar
                    ? PostServices.getAvatarPreview(user.avatar)
                    : defaultAvatar
                  : profileData.avatar 
                    ? PostServices.getAvatarPreview(profileData.avatar)
                    : defaultAvatar
              }
            />
            <h1 className="flex flex-col font-semibold text-sm">
              {user ? user.fullname : profileData.fullname}
              <span className="font-semibold text-xs text-secondary/50">
                @{user ? user.username : profileData.username}
              </span>
            </h1>
          </div>
        </Link>
        <div className="flex flex-col items-end">
          { isAuthor && giveActions && (
            <div className="flex gap-2">
              <Button
                bg="bg-red-500"
                className="p-2"
                rounded="rounded-full"
                onClick={() => setopen(true)}
              >
                <EditSvg />
              </Button>
              <Button
                onClick={() => navigate(`/edit-${docType}/${doc.$id}`)}
                className="p-2"
                rounded="rounded-full"
              >
                <EditSvg className="fill-primary"/>
              </Button>
            </div>
          )}
          {
            !isFollowing && !isAuthor && doc && (
              <Button
                loading={btnLoading}
                onClick={handleFollow}
                className="w-fit py-1 px-4"
                rounded="rounded-full"
              >Follow</Button>
            )
          }
        </div>
      </div>
      {replyToDoc && (
        <h1 className="flex gap-1 text-xs font-semibold">
          Reply to 
          <Link
            to={`/${replyToDoc?.userId}`}
            className="text-blue-500"
          >
            @{replyToDoc?.userId}
          </Link>
        </h1>
      )}
      <Confirm open={open} setopen={setopen} warningDesc="Are You Sure ? You want to Delete this Reply" proceedText="Delete" proceedTo={deleteDoc} loading={btnLoading}/>
    </>
  )
}
