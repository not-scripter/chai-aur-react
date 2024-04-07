import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { defaultAvatar } from "../../assets";
import { useSelector } from "react-redux";
import { Button, Confirm } from "../";

export default function UserHeader({user, post, reply}) {
  const navigate = useNavigate(); 
  const doc = post ? post : reply ? reply : null;
  const docType = 
    post ? "post" 
      : reply ? "reply" 
        : null;

  const { profileData } = useSelector((state) => state.auth);
  const isAuthor = profileData.$id === user?.$id ? true : false;

  const [open, setopen] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false);

  const [date, setdate] = useState(null);
  const [time, settime] = useState(null);
  function handleIso(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const dated = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
    const time = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    setdate(dated);
    settime(time);
  }

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

  useEffect(() => {
    doc && handleIso(doc?.$createdAt);
  }, [user?.$id, doc?.$createdAt]);

  return (
    <>
      <div className="flex justify-between">
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
            <h1 className="flex flex-col font-semibold">
              {user ? user.fullname : profileData.fullname}
              <span className="font-semibold text-sm text-secondary/50">
                @{user ? user.username : profileData.username}
              </span>
            </h1>
          </div>
        </Link>
        <div className="flex flex-col">
          {date && time && (
            <div className="flex gap-2">
              <h1 className="text-xs align-bottom font-semibold text-secondary/50">
                {time}
              </h1>
              <h1 className="flex text-xs left-auto right-0 font-semibold text-secondary/80">
                {date}
              </h1>
            </div>
          )}
          { isAuthor && (
            <div className="flex gap-2">
              <Button
                bg="bg-red-500"
                className="px-2 py-0"
                onClick={() => setopen(true)}
              >
                Delete
              </Button>
              <Button
                onClick={() => navigate(`/edit-${docType}/${doc?.$íd}`)}
                className="px-2 py-0"
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </div>
      <Confirm open={open} setopen={setopen} warningDesc="Are You Sure ? You want to Delete this Reply" proceedText="Delete" proceedTo={deleteDoc} loading={btnLoading}/>
    </>
  )
}
