import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { EditSvg, defaultAvatar } from "../../assets";
import { useSelector } from "react-redux";
import { Button, Confirm } from "../";

export default function UserHeader({user, post, reply, giveActions=false, replyTo}) {
  const navigate = useNavigate(); 
  const doc = post ? post : reply ? reply : null;
  const docType = 
    post ? "post" 
      : reply ? "reply" 
        : null;
  console.log("doctype", docType,"doc", doc)

  const { profileData } = useSelector((state) => state.auth);
  const isAuthor = profileData.$id === user?.$id ? true : false;
  const [isFollowing, setisFollowing] = useState(profileData.following.find(item => item === user?.$id))

  const [open, setopen] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false);

  const deleteDoc = async () => {
    setbtnLoading(true)
    const docRes = await PostServices.deleteDoc({docType, docId: doc?.$Id})
    doc?.images && await PostServices.deleteFile(doc?.images);
    if (docRes) {
      const docsType = docType === "post" ? "posts" : "reply" ? "replies" : "save" ? "saves" : null;
      const proRes = await PostServices.updateProfileDocs({
        docType,
        userId: profileData.$id,
        docs: profileData?.[docsType].filter((item) => item !== doc?.$id),
      })
      if (proRes) {
      toast.success("doc Deleted");
      setbtnLoading(false)
      setopen(false);
      navigate("/");
      }
    }
  };

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
            !isFollowing && !isAuthor && (
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
      {replyTo && (
        <h1 className="flex gap-1 text-xs font-semibold">
          Reply to 
          <Link
            to={`/${replyTo}`}
            className="text-blue-500"
          >
            @{replyTo}
          </Link>
        </h1>
      )}
      <Confirm open={open} setopen={setopen} warningDesc="Are You Sure ? You want to Delete this Reply" proceedText="Delete" proceedTo={deleteDoc} loading={btnLoading}/>
    </>
  )
}
