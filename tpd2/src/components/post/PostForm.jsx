import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import toast from "react-hot-toast";
import Select from "../Select";
import { AddSvg } from "../../assets";
import { Input, Button, ImgBox, CardBox, Confirm ,InputFile } from "..";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      slug: post?.slug || "",
      title: post?.title || "",
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
  const [updateOpen, setupdateOpen] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false);

  const submit = async (data) => {
    setbtnLoading(true)
    if (post) {
      const file = data.images[0] && await PostServices.uploadFile(data.images[0])
      if (file && post.images) await PostServices.deleteFile(post.images);
      const updated = await PostServices.updatePost({
        ...data,
        slug: post.$id,
        images: file ? file.$id : post.images,
      });
      if (updated) {
        setpostEditable(false);
        setupdateOpen(false)
        toast.success("Post Updated");
        setbtnLoading(false)
        navigate(`/post/${updated.$id}`);
      }
    } else {
      const file = data.images[0]
        ? await PostServices.uploadFile(data.images[0])
        : null;
      const newPost = await PostServices.createPost({
        slug: getValues("slug"),
        userId: userData.$id,
        title: data.title,
        content: data.content,
        images: file ? file.$id : null,
        visibility: data.visibility,
      });
      if (newPost) {
        const posRes = await PostServices.updateProfile({
          userId: profileData.$id,
          posts: [...profileData.posts, newPost.$id],
          ...profileData
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
        ...profileData
      })
      if (posRes) {
      toast.success("Post Deleted");
      setbtnLoading(false)
      setopen(false);
      navigate("/");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
      <CardBox>
        <Input
          readOnly={!postEditable}
          label="Title"
          {...register("title", { required: true })}
        />
        <Input
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
          localImage || dbImage ? <ImgBox src={localImage ? localImage : dbImage} /> : null
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
                className="w-full py-2"
                onClick={() => setupdateOpen(true)}
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
      </CardBox>
      <Confirm open={open} setopen={setopen} warningDesc={postEditable ? "Are You Sure You want to Exit ?" : "Are You Sure ? You want to Delete this Post ?"} proceedText={postEditable ? "Exit" : "Delete"} proceedTo={deletePost} loading={btnLoading}/>
      <Confirm open={updateOpen} setopen={setupdateOpen} warningDesc="Are You Sure ? You want to Update this Post ?" proceedText="Update" proceedTo={handleSubmit(submit)} loading={btnLoading}/>
    </form>
  );
}
