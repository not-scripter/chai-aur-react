import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { Button, CardBox, ImgBox } from "../";
import { defaultAvatar, defaultBanner, edit } from "../../assets";
import { useSelector } from "react-redux";

export default function Profile() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [profile, setprofile] = useState(null);
  const { profileData } = useSelector((state) => state.auth);
  const isAuthor = profile?.$id === profileData?.$id ? true : false;
  const [isFollowing, setisFollowing] = useState(null);
  const [btnLoading, setbtnLoading] = useState(false);

  const getProfile = async () => {
    const proRes = await PostServices.getProfile(slug);
    if (proRes) {
      const isRes = proRes.followers.filter((item) => item === profileData.$id);
      isRes.length !== 0 ? setisFollowing(true) : setisFollowing(false);
      setprofile(proRes);
      console.log(isRes);
    }
  };

  const handleFollow = async () => {
    setbtnLoading(true);
    if (!isFollowing) {
      const followRes = await PostServices.updateProfile({
        userId: profile.$id,
        followers: [...profile.followers, profileData.$id],
      });
      if (followRes) {
        const followingRes = await PostServices.updateProfile({
          userId: profileData.$id,
          following: [...profileData.following, profile.$id],
        });
        if (followingRes) {
          setprofile(followRes);
          setisFollowing(true);
          setbtnLoading(false);
        }
      }
    } else if (isFollowing) {
      const unFollowRes = await PostServices.updateProfile({
        userId: profile.$id,
        followers: profile.followers.filter(
          (item) => item !== profileData.$id,
        ),
      });
      if (unFollowRes) {
        const unFollowingRes = await PostServices.updateProfile({
          userId: profileData.$id,
          following: profileData.following.filter(
            (item) => item !== profile.$id,
          ),
        });
        if (unFollowingRes) {
          setprofile(unFollowRes);
          setisFollowing(false);
          setbtnLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, [setprofile]);

  return (
    <CardBox>
      <div className="flex flex-col items-center gap-2 relative mb-8">
        <ImgBox
          src={profile?.banner ? profile.banner : defaultBanner}
          className="h-20 w-full relative rounded-xl object-cover shadow-secondary/50 shadow-md"
          boxClass="relative w-full"
        ></ImgBox>
        <ImgBox
          src={profile?.avatar ? profile.avatar : defaultAvatar}
          className="relative w-16 h-16 rounded-full object-cover shadow-secondary shadow-md bg-primary/80 backdrop-blur absolite bottom-0"
          boxClass="w-fit absolute bottom-[-2rem]"
        ></ImgBox>
      </div>
      <div className="flex justify-between">
        <h1 className="flex flex-col font-semibold">
          {profile?.fullname}
          <span className="text-sm font-semibold text-secondary/50">
            @{profile?.username}
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
          {profile?.location}
        </h1>
        <h1 className="font-semibold text-secondary/50">
          {profile?.website}
        </h1>
        <h1 className="font-semibold text-secondary/50">{profile?.dob}</h1>
        <h1 className="font-semibold text-secondary/50">
          {profile?.joined}
        </h1>
      </div>
      <div className="flex justify-evenly">
        <h1 className="font-semibold text-secondary/50">
          Following:
          <span className="font-semibold text-secondary/50 ml-2">
            {profile?.following?.length}
          </span>
        </h1>
        <h1 className="font-semibold text-secondary/50">
          Followers:
          <span className="font-semibold text-secondary/50 ml-2">
            {profile?.followers?.length}
          </span>
        </h1>
      </div>
    </CardBox>
  );
}
