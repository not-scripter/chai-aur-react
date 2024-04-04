import React, { useEffect, useState } from 'react'
import { DislikeSvg, LikeSvg, ReplySvg, SavesSvg, ShareSvg, defaultAvatar } from '../../../assets';
import PostServices from '../../../appwrite/PostServices';
import { Loader, ImgBox, CardBox, Button, CheckBox } from "../../";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function ReplyCard({
  userId,
  replyId,
}) {
  const [profile, setprofile] = useState(null);
  const [reply, setreply] = useState(null)
  const [date, setdate] = useState(null);
  const [time, settime] = useState(null);
  const [loading, setloading] = useState(true);
  const {profileData} = useSelector(state => state.auth)
  const navigate = useNavigate()

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

  const [liked, setliked] = useState(false);
  const [disliked, setdisliked] = useState(false);
  const [saved, setsaved] = useState(false);

  const handleLike = async () => {
    if (liked) {
      setliked(false)
      await PostServices.updateReply({
        replyId: replyId,
        likes: reply?.likes.filter(user => user !== profileData.$id),
      })
    } else {
      setliked(true)
      setdisliked(false)
      await PostServices.updateReply({
        replyId: replyId,
        likes: [...reply?.likes, profileData.$id],
        dislikes: reply?.dislikes.filter(user => user !== profileData.$id),
      })
    }
  };
  const handleDislike = async () => {
    if (disliked) {
      setdisliked(false)
      await PostServices.updateReply({
        replyId: replyId,
        dislikes: reply?.dislikes.filter(user => user !== profileData.$id),
      })
    } else {
      setdisliked(true)
      setliked(false)
      await PostServices.updateReply({
        replyId: replyId,
        likes: reply?.likes.filter(user => user !== profileData.$id),
        dislikes: [...reply?.dislikes, profileData.$id],
      })
    }
  };
  const handleReply = async () => {
    navigate(`/${userId}/${reply.replyToId}/new-reply`)
  };
  const handleSave = async () => {
    if (saved) {
      setsaved(false)
      await PostServices.updateReply({
        replyId: replyId,
        saves: reply?.saves.filter(user => user !== profileData.$id),
      })
      await PostServices.updateProfile({
        userId: profileData.$id,
        saves: [...profileData.saves, replyId],
      })
    } else {
      setsaved(true)
      await PostServices.updateReply({
        replyId: replyId,
        saves: [...reply?.likes, profileData.$id],
      })
      await PostServices.updateProfile({
        userId: profileData.$id,
        saves: profileData.saves.filter(item => item !== replyId)
      })
    }
  };
  const handleShare = async () => {
    const exists = profileData.shares.filter(item => item === profileData.$id)
    await PostServices.updateReply({
      replyId: replyId,
      shares: [...reply?.shares, !exists ? profileData.$id : profileData.$id ++]
    })
  };

  const ReplyCardItems = [
    {
      onClick: handleLike,
      name: "Like",
      icon: (
        <CheckBox checked={liked}>
          <LikeSvg className={liked ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: reply?.likes.length,
    },
    {
      onClick: handleDislike,
      name: "Dislike",
      icon: (
        <CheckBox checked={disliked}>
          <DislikeSvg className={disliked ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: reply?.dislikes.length,
    },
    {
      onClick: handleReply,
      name: "Reply",
      icon: <ReplySvg />,
      count: reply?.replies.length,
    },
    {
      onClick: handleSave,
      name: "Saves",
      icon: (
        <CheckBox checked={saved}>
          <SavesSvg className={saved ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: reply?.saves.length,
    },
    {
      onClick: handleShare,
      name: "Share",
      icon: <ShareSvg />,
      count: reply?.shares.length,
    },
  ];

  const getData = async () => {
    const proRes = await PostServices.getProfile(userId);
    const repRes = await PostServices.getReply(replyId)
    if (proRes && repRes) {
      setprofile(proRes);
      setreply(repRes)
      setloading(false);
      const likeRes = reply?.likes.find((user) => user === profileData.$id)
      const dislikeRes = reply?.dislikes.find((user) => user === profileData.$id)
      const saveRes = reply?.saves.find((user) => user === profileData.$id)
      if (likeRes) setliked(true)
      if (dislikeRes) setdisliked(true)
      if (saveRes) setsaved(true)
    }
  };

  useEffect(() => {
    getData();
    handleIso(reply?.$createdAt);
  }, [userId, replyId, handleLike, handleDislike, handleShare, handleSave, handleReply]);

  return !loading ? (
    <CardBox key={replyId}>
      <div className="flex justify-between">
      <Link to={`/${userId}`} >
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
        </Link>
        <h1 className="flex flex-col text-sm left-auto right-0 font-semibold text-secondary/80">
          {date}
          <span className="text-sm align-bottom font-semibold text-secondary/50">
            {time}
          </span>
        </h1>
      </div>
      <Link to={`/${userId}/${replyId}`}>
          <h1>{reply?.content}</h1>
      {reply?.images && (
        <ImgBox src={PostServices.getFilePreview(reply?.images)} />
      )}
      </Link>
      <div className="flex justify-evenly">
        {ReplyCardItems.map((item) => (
          <div className="flex w-fit gap-1" key={item.name}>
            <button type="button" onClick={item.onClick}>
              {item.icon}
            </button>
            <h1 className="font-semibold text-sm text-secondary/50">
              {item.count}
            </h1>
          </div>
        ))}
      </div>
    </CardBox>
  ) : (
    <Loader />
  );
}
