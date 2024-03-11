import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import { toast } from "react-toastify";
import Input from "../Input";
import Button from "../Button";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      slug: post?.slug || "",
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });
  const userData = useSelector((state) => state.auth.userData);

  const [localImage, setlocalImage] = useState(null);
  const dbImage = post
    ? PostServices.getFilePrzeview(post.featuredImage)
    : null;

  const submit = async (data) => {
    if (post) {
      const file =
        data.image[0] && (await PostServices.uploadFile(data.image[0]));
      if (file) PostServices.deleteFile(post.featuredImage);
      const updated = await PostServices.updatePost({
        ...data,
        slug: post.$id,
        image: file ? file.$id : dbImage,
      });
      if (updated) {
        toast.success("Post Updated Successfully");
        navigate(`/post/${updated.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await PostServices.uploadFile(data.image[0])
        : "";
      if (file) {
        const newPost = await PostServices.createPost({
          ...data,
          userId: userData.$id,
          image: file.$id,
        });
        if (newPost) {
          toast.success("Post Created")
          navigate(`/post/${newPost.$id}`)
        }
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
  }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input label="Title" {...register("title", { required: true })} />
      <Input label="Content" {...register("content", { required: true })} />
      <Input label="Image" type="file" accept="image/*" {...register("image")} onChange={e => setlocalImage(URL.createObjectURL(e.target.files[0]))} />
      <img src={localImage ? localImage : dbImage}/>
      <Button type="submit">Submit</Button>
    </form>
  );
}
