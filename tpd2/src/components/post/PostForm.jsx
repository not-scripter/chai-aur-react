import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import { toast } from "react-toastify";
import Input from "../Input";
import Button from "../Button";
import ImgBox from "../ImgBox";
import CardBox from "../CardBox";
import Confirm from "../Confirm";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      slug: post?.slug || "",
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "",
    },
  });
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const [postEditable, setpostEditable] = useState(post ? false : true);

  const [localImage, setlocalImage] = useState(null);
  const dbImage = post && post.images ? PostServices.getFilePreview({ fileId: post.images }) : null

  const [open, setopen] = useState(false)

  const submit = async (data) => {
    if (post) {
      const file =
        data.images[0] && (await PostServices.uploadFile(data.images[0]));
      if (file) PostServices.deleteFile(post.images);
      const updated = await PostServices.updatePost({
        ...data,
        slug: post.$id,
        images: file ? file.$id : dbImage,
      });
      if (updated) {
        // setpostEditable(false);
        toast.success("Post Updated Successfully");
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
        status: "public",
        // ...data,
      });
      if (newPost) {
        toast.success("Post Created");
        navigate(`/post/${newPost.$id}`);
      }
    }
    // reset()
  };

  const deletePost = () => {
    PostServices.deletePost({slug: post.$id}).then((status) => {
      if (status) {
        PostServices.deleteFile(post.images);
        toast.success("Post Deleted");
        navigate("/");
      }
    });
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
    <>
    <CardBox>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
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
            postEditable && (
        <Input
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
        {post && isAuthor ? (
          <div className="flex gap-2">
            <Button
              className="w-full py-2"
              bg="bg-red-500"
              onClick={() => setopen(true)}
            >
              {postEditable ? "Cancel" : "Delete"}
            </Button>
            <Button
              className="w-full py-2"
              type={!postEditable ? "submit" : "button"}
              onClick={() => setpostEditable(prev => !prev)}
            >
              {!postEditable ? "Edit" : "Save"}
            </Button>
          </div>
        ) : (
          <Button className="w-full py-2" type="submit">
            Submit
          </Button>
        )}
      </form>
      </CardBox>
      <Confirm open={open} setopen={setopen} warningDesc={postEditable ? "Exit" : "Delete"} proceedText={postEditable ? "Exit" : "Delete"} proceedTo={postEditable ? (() => {
        setpostEditable(false);
        setopen(false)
      }) : deletePost}/>
      </>
  );
}
