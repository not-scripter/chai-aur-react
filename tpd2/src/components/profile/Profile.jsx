import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { Button, CardBox, ImgBox } from "../";
import { defaultAvatar, defaultBanner, edit } from "../../assets";
import { useSelector } from "react-redux";

export default function Profile() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [profileData, setprofileData] = useState(null);
  const { userData } = useSelector((state) => state.auth);
  const isAuthor = profileData?.$id === userData?.$id ? true : false;
  const [isFollowing, setisFollowing] = useState(null);
  const [btnLoading, setbtnLoading] = useState(false);

  const getProfile = async () => {
    const proRes = await PostServices.getProfile(slug);
    if (proRes) {
      const isRes = proRes.followers.filter((item) => item === userData.$id);
      isRes.length !== 0 ? setisFollowing(true) : setisFollowing(false);
      setprofileData(proRes);
      console.log(isRes);
    }
  };

  const handleFollow = async () => {
    setbtnLoading(true);
    if (!isFollowing) {
      const followRes = await PostServices.updateProfile({
        userId: profileData.$id,
        followers: [...profileData.followers, userData.$id],
      });
      if (followRes) {
        setprofileData(followRes);
        setisFollowing(true);
        setbtnLoading(false);
      }
    } else if (isFollowing) {
      const unFollowRes = await PostServices.updateProfile({
        userId: profileData.$id,
        followers: profileData.followers.filter(
          (item) => item !== userData.$id,
        ),
      });
      if (unFollowRes) {
        setprofileData(unFollowRes);
        setisFollowing(false);
        setbtnLoading(false);
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, [setprofileData]);

  return (
    <CardBox>
      <div className="flex flex-col items-center gap-2 relative mb-8">
        <ImgBox
          src={profileData?.banner ? profileData.banner : defaultBanner}
          className="h-20 w-full relative rounded-xl object-cover shadow-secondary/50 shadow-md"
          boxClass="relative w-full"
        ></ImgBox>
        <ImgBox
          src={profileData?.avatar ? profileData.avatar : defaultAvatar}
          className="relative w-16 h-16 rounded-full object-cover shadow-secondary shadow-md bg-primary/80 backdrop-blur absolite bottom-0"
          boxClass="w-fit absolute bottom-[-2rem]"
        ></ImgBox>
      </div>
      <div className="flex justify-between">
        <h1 className="flex flex-col font-semibold">
          {profileData?.fullname}
          <span className="text-sm font-semibold text-secondary/50">
            @{profileData?.username}
          </span>
        </h1>
        <Button
          loading={btnLoading}
          className="h-fit px-6 py-1"
          rounded="rounded-full"
          onClick={isAuthor ? () => navigate("/account") : handleFollow}
        >
          {isAuthor ? "Edit" : isFollowing ? "Following" : "Follow"}
        </Button>
      </div>
      <div className="flex flex-col">
        <h1 className="font-semibold text-secondary/50">
          {profileData?.location}
        </h1>
        <h1 className="font-semibold text-secondary/50">
          {profileData?.website}
        </h1>
        <h1 className="font-semibold text-secondary/50">{profileData?.dob}</h1>
        <h1 className="font-semibold text-secondary/50">
          {profileData?.joined}
        </h1>
      </div>
      <div className="flex justify-evenly">
        <h1 className="font-semibold text-secondary/50">
          Following:
          <span className="font-semibold text-secondary/50 ml-2">
            {profileData?.following?.length}
          </span>
        </h1>
        <h1 className="font-semibold text-secondary/50">
          Followers:
          <span className="font-semibold text-secondary/50 ml-2">
            {profileData?.followers?.length}
          </span>
        </h1>
      </div>
    </CardBox>
  );
}
