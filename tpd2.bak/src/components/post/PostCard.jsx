import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import { DislikeSvg, LikeSvg, PeoplesSvg, ReplySvg, SavesSvg, ShareSvg, defaultAvatar } from "../../assets";
import { Loader, ImgBox, CardBox, Button, CheckBox } from "../";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function PostCard({ userId, postId, content, images, $createdAt, likes, dislikes, replies, saves, shares }) {
  const [profile, setprofile] = useState(null);
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

  const getProfile = async () => {
    const res = await PostServices.getProfile(userId);
    if (res) {
      setprofile(res);
      setloading(false);
    }
  };

  const [liked, setliked] = useState(likes.find((user) => user === profileData.$id));
  const [disliked, setdisliked] = useState(dislikes.find((user) => user === profileData.$id));
  const [saved, setsaved] = useState(saves.find((user) => user === profileData.$id));

  const handleLike = async () => {
    if (liked) {
      setliked(false)
      await PostServices.updatePost({
        postId: postId,
        likes: likes.filter(user => user !== profileData.$id),
      })
    } else {
      setliked(true)
      await PostServices.updatePost({
        postId: postId,
        likes: [...likes, profileData.$id],
        dislikes: dislikes.filter(user => user !== profileData.$id),
      })
    }
  };
  const handleDislike = async () => {
    if (disliked) {
      setdisliked(false)
      await PostServices.updatePost({
        postId: postId,
        dislikes: dislikes.filter(user => user !== profileData.$id),
      })
    } else {
      setdisliked(true)
      await PostServices.updatePost({
        postId: postId,
        likes: likes.filter(user => user !== profileData.$id),
        dislikes: [...dislikes, profileData.$id],
      })
    }
  };
  const handleReply = async () => {
    navigate(`/${profile.$id}/${postId}/new-reply`)
  };
  const handleSave = async () => {
    if (saved) {
      setsaved(false)
      await PostServices.updatePost({
        postId: postId,
        saves: saves.filter(user => user !== profileData.$id),
      })
      await PostServices.updateProfile({
        userId: profileData.$id,
        saves: [...profileData.saves, postId],
      })
    } else {
      setsaved(true)
      await PostServices.updatePost({
        postId: postId,
        saves: [...likes, profileData.$id],
      })
      await PostServices.updateProfile({
        userId: profileData.$id,
        saves: profileData.saves.filter(item => item !== postId)
      })
    }
  };
  const handleShare = async () => {
    const exists = profileData.shares.filter(item => item === profileData.$id)
    await PostServices.updatePost({
      postId: postId,
      shares: [...shares, !exists ? profileData.$id : profileData.$id + "1"]
    })
  };

  const PostCardItems = [
    {
      onClick: handleLike,
      name: "Like",
      icon: (
        <CheckBox checked={liked}>
          <LikeSvg className={liked ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: likes.length,
    },
    {
      onClick: handleDislike,
      name: "Dislike",
      icon: (
        <CheckBox checked={disliked}>
          <DislikeSvg className={disliked ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: dislikes.length,
    },
    {
      onClick: handleReply,
      name: "Reply",
      icon: <ReplySvg />,
      count: replies.length,
    },
    {
      onClick: handleSave,
      name: "Saves",
      icon: (
        <CheckBox checked={saved}>
          <SavesSvg className={saved ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: saves.length,
    },
    {
      onClick: handleShare,
      name: "Share",
      icon: <ShareSvg />,
      count: shares.length,
    },
  ];

  useEffect(() => {
    getProfile();
    handleIso($createdAt);
  }, [userId]);

  return !loading ? (
    <CardBox>
      <div className="flex justify-between">
      <Link to={`/${userId}`} key={postId}>
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
      {images && (
        <ImgBox src={PostServices.getFilePreview(images)} alt={title} />
      )}
      <Link to={`/${userId}/${postId}`} key={postId}>
        <div>
          <h1>{content}</h1>
        </div>
      </Link>
      <div className="flex justify-evenly">
        {PostCardItems.map((item) => (
          <div className="flex w-fit gap-1">
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
