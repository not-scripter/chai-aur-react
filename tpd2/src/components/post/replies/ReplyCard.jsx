import React, { useEffect, useState } from 'react'
import { DislikeSvg, LikeSvg, ReplySvg, SavesSvg, ShareSvg, defaultAvatar } from '../../../assets';
import PostServices from '../../../appwrite/PostServices';
import { Loader, ImgBox, CardBox, Button } from "../../";

export default function ReplieCard({
  userId,
  content,
  images,
  $createdAt,
  likes,
  dislikes,
  replies,
  saves,
  shares,
}) {
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

  const ReplyCardItems = [
    {
      onClick: () => handleLike,
      name: "Like",
      icon: <LikeSvg />,
      count: likes,
    },
    {
      onClick: () => handleDislike,
      name: "Dislike",
      icon: <DislikeSvg />,
      count: dislikes,
    },
    {
      onClick: () => handleReply,
      name: "Reply",
      icon: <ReplySvg />,
      count: replies,
    },
    {
      onClick: () => handleSave,
      name: "Saves",
      icon: <SavesSvg />,
      count: saves,
    },
    {
      onClick: () => handleShare,
      name: "Share",
      icon: <ShareSvg />,
      count: shares,
    },
  ];

  const handleLike = async () => {};
  const handleDislike = async () => {};
  const handleReply = async () => {};
  const handleSave = async () => {};
  const handleShare = async () => {};

  useEffect(() => {
    getProfile();
    handleIso($createdAt);
  }, [userId, $createdAt]);

  return !loading ? (
      <CardBox className='w-4/5'>
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
        <div>
          <h1>{content}</h1>
        </div>
        {images && (
          <ImgBox src={PostServices.getFilePreview(images)} alt={title} />
        )}
        <div className="flex w-fit float-right gap-4">
          {ReplyCardItems.map((item) => (
          <>
            <button type="button" onClick={item.onClick}>
              {item.icon}
            </button>
            <h1 className="font-semibold text-sm text-secondary/50">
              {item.count}
            </h1>
            </>
          ))}
        </div>
      </CardBox>
  ) : (
    <Loader />
  );
}
