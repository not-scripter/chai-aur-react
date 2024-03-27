import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardBox, ImgBox, Input, Select } from "../index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../../appwrite/AuthServices";
import PostServices from "../../appwrite/PostServices";
import { login } from "../../store/AuthSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UpdateInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, profileData } = useSelector((state) => state.auth);
  const defaultValues = {
    fullname: profileData?.fullname,
    username: userData?.name,
    website: profileData.website,
    location: profileData.location,
    visibility: profileData.visibility,
    joined: profileData.joined,
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
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
        <div className="flex flex-col items-center gap-2">
          <ImgBox src={localBanner ? localBanner : dbBanner} className="h-16 w-full relative rounded-xl aspect-[21/9] object-cover" boxClass="relative w-full">
            { !editable &&
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary/50 backdrop-blur overflow-hidden active:bg-opacity-80 hover:outline hover:outline-secondary/20 hover:outline-4">
                <div className="relative flex items-center justify-center h-full">
                  <input
                    label="Image"
                    type="file"
                    accept="image/*"
                    readOnly={!editable}
                    className="absolute w-full h-full opacity-0"
                    {...register("banner")}
                    onChange={(e) =>
                      setlocalBanner(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                  <FontAwesomeIcon icon="fa-solid fa-pen-fancy"/>
                </div>
              </div>
            }
          </ImgBox>
          <ImgBox src={localAvatar ? localAvatar : dbAvatar} className="relative w-12 h-12 rounded-full aspect-square object-cover" boxClass="w-fit relative outline-4 outline-secondary/20">
            { !editable &&
              <div className="absolute top-[-.2rem] right-[-.2rem] w-6 h-6 rounded-full bg-primary/50 backdrop-blur overflow-hidden active:bg-opacity-80 hover:outline hover:outline-secondary/20 hover:outline-4">
                <div className="relative flex items-center justify-center h-full">
                  <input
                    label="Image"
                    type="file"
                    accept="image/*"
                    readOnly={!editable}
                    className="absolute w-full h-full opacity-0"
                    {...register("avatar")}
                    onChange={(e) =>
                      setlocalAvatar(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                  <FontAwesomeIcon icon="fa-solid fa-pen-fancy" className="w-3 h-3"/>
                </div>
              </div>
            }
          </ImgBox>
        </div>
        <div>
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
        </div>
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
