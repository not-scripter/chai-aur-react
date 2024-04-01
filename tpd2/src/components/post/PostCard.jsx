import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import { PeoplesSvg, defaultAvatar } from "../../assets";
import { Loader, ImgBox, CardBox, Button } from "../";

export default function PostCard({ userId, slug, title, images, $createdAt }) {
  const [profile, setprofile] = useState(null);
  const [date, setdate] = useState(null);
  const [time, settime] = useState(null);
  const [loading, setloading] = useState(true);

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

  const getProfile = async () => {
    const res = await PostServices.getProfile(userId);
    if (res) {
      setprofile(res);
      setloading(false);
    }
  };

  const PostCardItems = [
    {
      onClick: () => handleLike,
      name: "Like",
      icon: <PeoplesSvg />,
    },
    {
      onClick: () => handleDislike,
      name: "Dislike",
      icon: <PeoplesSvg />,
    },
    {
      onClick: () => handleReply,
      name: "Reply",
      icon: <PeoplesSvg />,
    },
    {
      onClick: () => handleSave,
      name: "Save",
      icon: <PeoplesSvg />,
    },
  ];

  const handleLike = async () => {};
  const handleDislike = async () => {};
  const handleReply = async () => {};
  const handleSave = async () => {};

  useEffect(() => {
    getProfile();
    handleIso($createdAt);
  }, [userId, $createdAt]);

  return !loading ? (
    <Link to={`/post/${slug}`} key={slug}>
      <CardBox>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img
              className="w-8 h-8 bg-cover rounded-full shadow-md shadow-secondary/50"
              src={
                profile
                  ? profile.avatar
                    ? PostServices.getAvatarPreview(profile.avatar)
                    : defaultAvatar
                  : defaultAvatar
              }
            />
            <h1 className="flex flex-col font-semibold">
              {profile?.fullname}
              <span className="font-semibold text-sm text-secondary/50">
                @{profile?.username}
              </span>
            </h1>
          </div>
          <h1 className="flex flex-col text-sm left-auto right-0 font-semibold text-secondary/80">
            {date}
            <span className="text-sm align-bottom font-semibold text-secondary/50">
              {time}
            </span>
          </h1>
        </div>
        {images && (
          <ImgBox src={PostServices.getFilePreview(images)} alt={title} />
        )}
        <div>
          <h1>{title}</h1>
        </div>
        <div className="flex w-fit float-right gap-4">
          {PostCardItems.map((item) => (
            <button type="button" onClick={item.onClick}>
              {item.icon}
            </button>
          ))}
        </div>
      </CardBox>
    </Link>
  ) : (
    <Loader />
  );
}
