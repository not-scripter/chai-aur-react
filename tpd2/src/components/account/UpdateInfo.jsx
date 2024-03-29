import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardBox, ImgBox, Input, Select } from "../index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthServices from "../../appwrite/AuthServices";
import PostServices from "../../appwrite/PostServices";
import { login } from "../../store/AuthSlice";
import { defaultAvatar, defaultBanner, edit } from "../../assets";

export default function UpdateInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, profileData } = useSelector((state) => state.auth);

  function handleIso(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
  }
  
  const defaultValues = {
    fullname: profileData?.fullname,
    username: userData?.name,
    dob: profileData?.dob,
    website: profileData?.website,
    location: profileData?.location,
    visibility: profileData?.visibility,
    joined: handleIso(profileData?.joined),
  }

  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues
  });

  const [btnLoading, setbtnLoading] = useState(false)

  const [editable, seteditable] = useState(false);
  const [localAvatar, setlocalAvatar] = useState(null);
  const [localBanner, setlocalBanner] = useState(null);
  const dbAvatar = profileData.avatar && PostServices.getAvatarPreview(profileData.avatar)
  const dbBanner = profileData.banner && PostServices.getBannerPreview(profileData.banner)

  const submit = async (data) => {
    setbtnLoading(true)
    const avatar = data.avatar[0] && await PostServices.uploadAvatar(data.avatar[0]);
    const banner = data.banner[0] && await PostServices.uploadBanner(data.banner[0]);
    avatar && profileData.avatar && PostServices.deleteAvatar(profileData.avatar);
    banner && profileData.banner && PostServices.deleteBanner(profileData.banner);
    const authRes = data.username && await AuthServices.updateName(data.username)
    const proRes = await PostServices.updateProfile({
      userId: userData?.$id,
      avatar: avatar ? avatar.$id : profileData.avatar,
      banner: banner ? banner.$id : profileData.banner,
      fullname: data.fullname,
      username: data.username,
      dob: data.dob,
      website: data.website,
      location: data.location,
      visibility: data.visibility,
    })
    if (proRes) {
      dispatch(login({ userData: authRes ? authRes : userData, profileData: proRes }));
      reset(defaultValues)
      toast.success("Info Updated");
      setbtnLoading(false)
      seteditable(false);
    }
  };

  return (
    <CardBox>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col items-center gap-2 relative mb-8">
          <ImgBox
            src={localBanner ? localBanner : dbBanner ? dbBanner : defaultBanner}
            className="h-20 w-full relative rounded-xl object-cover shadow-secondary/50 shadow-md"
            boxClass="relative w-full"
          >
            { editable &&
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary/50 backdrop-blur overflow-hidden active:bg-opacity-80 hover:outline hover:outline-secondary/20 hover:outline-4">
                <div className="relative flex items-center justify-center h-full p-1">
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
                  <img src={edit} />
                </div>
              </div>
            }
          </ImgBox>
          <ImgBox
            src={localAvatar ? localAvatar : dbAvatar ? dbAvatar : defaultAvatar}
            className="relative w-16 h-16 rounded-full object-cover shadow-secondary shadow-md bg-primary/80 backdrop-blur absolite bottom-0"
            boxClass="w-fit absolute bottom-[-2rem]"
          >
            { editable &&
              <div className="absolute top-[-.2rem] right-[-.2rem] w-6 h-6 rounded-full bg-primary/50 backdrop-blur overflow-hidden active:bg-opacity-80 hover:outline hover:outline-secondary/20 hover:outline-4">
                <div className="relative flex items-center justify-center h-full p-1">
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
                  <img src={edit} />
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
            type="date"
            label="Born"
            readOnly={!editable}
            placeholder="Enter Your Date-of-Birth"
            className="w-full"
            {...register("dob", { required: false })}
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
          <Select
            label="Visibility"
            disabled={!editable}
            defaultValue={profileData.visibility}
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
              <Button
                loading={btnLoading}
                type="submit"
                className="w-full py-2"
              >
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
