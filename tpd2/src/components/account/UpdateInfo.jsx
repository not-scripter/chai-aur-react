import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardBox, ImgBox, Input, Select } from "../index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../../appwrite/AuthServices";
import PostServices from "../../appwrite/PostServices";
import { login } from "../../store/AuthSlice";

export default function UpdateInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, profileData } = useSelector((state) => state.auth);
  const defaultValues = {
    fullname: profileData?.fullname,
    username: userData?.name,
    joined: profileData.joined,
    website: profileData.website,
    location: profileData.location,
    visibility: profileData.visibility,
  };
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues,
  });

  const [editable, seteditable] = useState(false);
  const [localAvatar, setlocalAvatar] = useState(null);
  const [localBanner, setlocalBanner] = useState(null);
  const dbAvatar = profileData.avatar
    ? PostServices.getAvatarPreview(profileData.avatar)
    : null;
  const dbBanner = profileData.banner
    ? PostServices.getBannerPreview(profileData.banner)
    : null;

  const submit = async (data) => {
    const avatar = data.avatar[0] && await PostServices.uploadAvatar(data.avatar[0]);
    const banner = data.banner[0] && await PostServices.uploadBanner(data.banner[0]);
    avatar && profileData.avatar && PostServices.deleteAvatar(profileData.avatar);
    banner && profileData.banner && PostServices.deleteBanner(profileData.banner);
    AuthServices.updateName(data)
      .then((authRes) => {
        PostServices.updateProfile({
          userId: userData?.$id,
          avatar: avatar ? avatar.$id : profileData.avatar,
          banner: banner ? banner.$id : profileData.banner,
          fullname: data.fullname,
          username: data.username,
          website: data.website,
          location: data.location,
          visibility: data.visibility,
        })
          .then((proRes) => {
            dispatch(login({ userData: authRes, profileData: proRes }));
            toast.success("Info Updated");
            seteditable(false);
            //setValue("fullname", proRes.fullname);
            //setValue("username", authRes.name);
          })
          .catch((err) => {
            toast.error("Fullname Error");console.log(err.message)
          });
      })
      .catch((err) => {toast.error("Error"); console.log(err.message)})
  };

  return (
    <CardBox>
      <form onSubmit={handleSubmit(submit)}>
        <ImgBox src={localBanner ? localBanner : dbBanner} className="h-16 w-full bg-blue-300">
          <input
            label="Image"
            type="file"
            accept="image/*"
            readOnly={!editable}
            className="absolute top-2 right-2 w-8 h-8 rounded-full"
            {...register("banner")}
            onChange={(e) =>
              setlocalBanner(URL.createObjectURL(e.target.files[0]))
            }
          />
        </ImgBox>
        <ImgBox src={localAvatar ? localAvatar : dbAvatar} className="w-12 h-12 rounded-full bg-green-300">
          <input
            label="Image"
            type="file"
            accept="image/*"
            readOnly={!editable}
            className="absolute top-2 right-2 w-8 h-8 rounded-full"
            {...register("avatar")}
            onChange={(e) =>
              setlocalAvatar(URL.createObjectURL(e.target.files[0]))
            }
          />
        </ImgBox>
        <Input
          label="Fullname"
          readOnly={!editable}
          placeholder="Enter Your Fullname"
          {...register("fullname", { required: true })}
        />
        <Input
          label="Username"
          readOnly={!editable}
          placeholder="Enter Your Username"
          {...register("username", { required: true })}
        />
        <Input
          label="Location"
          readOnly={!editable}
          placeholder="Enter Your Location"
          {...register("location", { required: false })}
        />
        <Input
          label="Website"
          type="url"
          readOnly={!editable}
          placeholder="Enter Website URL"
          {...register("website", { required: false })}
        />
        <Input
          label="DOB"
          readOnly={!editable}
          placeholder="Enter Your Date-of-Birth"
          {...register("username", { required: false })}
        />
        <Select
          label="Visibility"
          disabled={!editable}
          options={["public", "private"]}
          {...register("visibility")}
        />
        <Input
          label="Joined"
          readOnly={true}
          {...register("joined")}
        />
        <div className="flex gap-2">
          {editable ? (
            <>
              <Button
                onClick={() => {
                  seteditable(false);
                  reset(defaultValues);
                }}
                className="w-full py-2"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full py-2">
                Save
              </Button>
            </>
          ) : (
              <Button onClick={() => seteditable(true)} className="w-full py-2">
                Edit
              </Button>
            )}
        </div>
      </form>
    </CardBox>
  );
}
