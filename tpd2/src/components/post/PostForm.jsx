import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import toast from "react-hot-toast";
import Select from "../Select";
import { Button, ImgBox, Confirm ,InputFile, TextArea } from "..";
import { defaultAvatar } from "../../assets";

export default function PostForm({ profile, post }) {
  const navigate = useNavigate(); 
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      // postId: post?.postId || "",
      content: post?.content || "",
      visibility: post?.visibility || "public",
    },
  });
  const { userData, profileData } = useSelector((state) => state.auth);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const [postEditable, setpostEditable] = useState(post ? false : true);

  const [localImage, setlocalImage] = useState(null);
  const dbImage = post && post.images && PostServices.getFilePreview(post.images)

  const [open, setopen] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false);

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

  const submit = async (data) => {
    setbtnLoading(true)
    if (post) {
      const file = data.images[0] && await PostServices.uploadFile(data.images[0])
      if (file && post.images) await PostServices.deleteFile(post.images);
      const updated = await PostServices.updatePost({
        ...data,
        postId: post.$id,
        images: file ? file.$id : post.images,
      });
      if (updated) {
        setpostEditable(false);
        toast.success("Post Updated");
        setbtnLoading(false)
        navigate(`/${post.userId}/${updated.$id}`);
      }
    } else {
      const file = data.images[0]
        ? await PostServices.uploadFile(data.images[0])
        : null;
      const newPost = await PostServices.createPost({
        postId: getValues("postId"),
        userId: userData.$id,
        content: data.content,
        images: file ? file.$id : null,
        visibility: data.visibility,
      });
      if (newPost) {
        const posRes = await PostServices.updateProfile({
          userId: profileData.$id,
          posts: [...profileData.posts, newPost.$id],
        })
        if (posRes) {
        toast.success("Post Created");
        setbtnLoading(false)
        navigate(`/post/${newPost.$id}`);
        }
      }
    }
    // reset()
  };

  const deletePost = async () => {
    setbtnLoading(true)
    const postRes = await PostServices.deletePost(post.$id)
    post.images && await PostServices.deleteFile(post.images);
    if (postRes) {
      const posRes = await PostServices.updateProfile({
        userId: profileData.$id,
        posts: profileData.posts.filter((item) => item !== post.$id),
      })
      if (posRes) {
      toast.success("Post Deleted");
      setbtnLoading(false)
      setopen(false);
      navigate("/");
      }
    }
  };

  // const postIdTransform = useCallback((value) => {
  //   if (value && typeof value === "string") {
  //     return value
  //       .trim()
  //       .toLowerCase()
  //       .replace(/[^a-zA-Z\d\s]+/g, "-")
  //       .replace(/\s/g, "-");
  //   }
  //   return "";
  // }, []);
  //
  // useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === "title") {
  //       setValue("postId", postIdTransform(value.title), { shouldValidate: true });
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, postIdTransform, setValue]);

  useEffect(() => {
    post && handleIso(post.$createdAt);
  }, [post && post])

  return (
    <>
      <div className="flex justify-between">
        <Link to={profile ? `/${profile?.$id}` : `/${profileData.$id}`}>
          <div className="flex gap-2 items-center">
            <img
              className="w-8 h-8 bg-cover rounded-full shadow-md shadow-secondary/50"
              src={
                profile
                  ? profile.avatar
                    ? PostServices.getAvatarPreview(profile.avatar)
                    : defaultAvatar
                  : profileData.avatar 
                    ? PostServices.getAvatarPreview(profileData.avatar)
                    : defaultAvatar
              }
            />
            <h1 className="flex flex-col font-semibold">
              {profile ? profile.fullname : profileData.fullname}
              <span className="font-semibold text-sm text-secondary/50">
                @{profile ? profile.username : profileData.username}
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
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
        <TextArea
          readOnly={!postEditable}
          label="Content"
          {...register("content", { required: true })}
        />
        {
          !post || isAuthor ? (
            <Select
              label="Visibility"
              disabled={!postEditable}
              defaultValue={post && post.visibility}
              options={["public", "private"]}
              {...register("visibility")}
            />
          ) : null
        }
        {
          postEditable && (
            <InputFile 
              label="Image"
              type="file"
              accept="image/*"
              readOnly={!postEditable}
              {...register("images")}
              onChange={(e) =>
                setlocalImage(URL.createObjectURL(e.target.files[0]))
              }
            />
          )
        }
        {
          localImage || dbImage && <ImgBox src={localImage ? localImage : dbImage} className="rounded-xl"/>
        }
        {post && isAuthor && (
          postEditable ? (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setpostEditable(false);
                  reset();
                }}
                className="w-full py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full py-2"
              >
                Save
              </Button>
            </div>
          ) : (
              <div className="flex gap-2">
                <Button
                  bg="bg-red-500"
                  className="w-full py-2"
                  onClick={() => setopen(true)}
                >
                  Delete
                </Button>
                <Button onClick={() => setpostEditable(true)} className="w-full py-2">
                  Edit
                </Button>
              </div>
            )
        )}
        {
          !post && (
            <Button
              loading={btnLoading}
              type="submit"
              className="w-full py-2"
              onClick={() => setbtnLoading(true)}
            >
              Create Post
            </Button>
          )
        }
      </form>
      <Confirm open={open} setopen={setopen} warningDesc={postEditable ? "Are You Sure You want to Exit ?" : "Are You Sure ? You want to Delete this Post ?"} proceedText={postEditable ? "Exit" : "Delete"} proceedTo={deletePost} loading={btnLoading}/>
    </>
  );
}
