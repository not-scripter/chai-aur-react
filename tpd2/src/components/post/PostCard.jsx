import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import ImgBox from "../ImgBox";
import CardBox from "../CardBox";

export default function PostCard({ userId, slug, title, images, $createdAt }) {
  const [profile, setprofile] = useState(null);
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
    PostServices.getProfile(userId).then((res) => setprofile(res));
    handleIso($createdAt);
  }, []);
  return (
    <Link to={`/post/${slug}`} key={slug}>
      <CardBox>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h1 className="w-8 h-8 bg-presecondary rounded-full shadow-sm outline-secondary/20 outline-4 text-preprimary flex items-center justify-center">
              P
            </h1>
            <h1 className="flex flex-col font-semibold">
              {profile?.fullname}
              <span className="font-semibold text-sm text-secondary/50">
                {profile?.username}
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
        {images ? (
          <ImgBox
            src={PostServices.getFilePreview({ fileId: images })}
            alt={title}
          />
        ) : null}
        <div>
          <h1>{title}</h1>
        </div>
      </CardBox>
    </Link>
  );
}
