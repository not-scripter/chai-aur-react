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
        : null;
      const newPost = await PostServices.createPost({
        ...data,
        userId: userData.$id,
        image: file ? file.$id : null,
      });
      if (newPost) {
        toast.success("Post Created");
        navigate(`/post/${newPost.$id}`);
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
    <CardBox>
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
      <Input label="Title" {...register("title", { required: true })} />
      <Input label="Content" {...register("content", { required: true })} />
      <Input
        label="Image"
        type="file"
        accept="image/*"
        {...register("image")}
        onChange={(e) => setlocalImage(URL.createObjectURL(e.target.files[0]))}
      />
      <ImgBox src={localImage ? localImage : dbImage} />
      <div className="flex justify-evenly gap-2">
      <Button type="button" className="w-full py-2">Cancel</Button>
      <Button type="submit" className="w-full py-2">Submit</Button>
      </div>
    </form>
    </CardBox>    
  );
}
