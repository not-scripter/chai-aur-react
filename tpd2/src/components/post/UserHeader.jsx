import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { defaultAvatar } from "../../assets";

export default function UserHeader({user, doc}) {
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

  useEffect(() => {
    handleIso(doc?.$createdAt);
  }, [user, doc]);

  return (
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
        <h1 className="flex flex-col text-sm left-auto right-0 font-semibold text-secondary/80">
          {date}
          <span className="text-sm align-bottom font-semibold text-secondary/50">
            {time}
          </span>
        </h1>
      </div>
  )
}
