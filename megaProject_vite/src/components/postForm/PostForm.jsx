import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import { appwriteService } from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { nanoid } from "@reduxjs/toolkit";

export default function PostForm({post}) {
 const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
  defaultValues: {
   title: post?.Title || "",
   slug: post?.$id || "",
   content: post?.Content || "",
   status: post?.Status || "active"
  }
 })
 const navigate = useNavigate()
 const userData = useSelector(state => state.auth.userData)


 const [localImageUrl, setlocalImageUrl] = useState(null)
 const dbImage = post ? appwriteService.getFilePreview(post.featuredImage) : null ;

 const submit = async (data) => {
  if (post) {
   const fileId = nanoid();
   const file = data.image[0] ? await appwriteService.uploadFile({fileId:fileId, file:data.image[0] }) : null;
   if (file) {
    appwriteService.deleteFile(post.featuredImage)
   }
   const dbPost = await appwriteService.updatePost({
    ...data,
    slug: post.$id,
    userId: userData.$id,
    featuredImage: file ? fileId : post.featuredImage,
   })
   if (dbPost) {
    navigate(`/post/${dbPost.$id}`)
   }
  } else {
   const fileId = nanoid();
   const file = await appwriteService.uploadFile({fileId:fileId, file:data.image[0] });
   if (file) {
    const dbPost = await appwriteService.createPost({ 
     ...data, 
     userId: userData.$id, 
     featuredImage: fileId 
    });
    if (dbPost) {
     navigate(`/post/${dbPost.$id}`);
    }

   }
  }
 }
  
 const slugTransform = useCallback((value) => {
  if (value && typeof value === 'string') 
   return value
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z\d\s]+/g, '-') //RegEx
    .replace(/\s/g, '-');
  return '';
 }, [])

 useEffect(() => {
  const subscription = watch((value, {name}) => {
   if (name === 'title') {
    setValue('slug', slugTransform(value.title), {shouldValidate: true});
   }
  })

  return () => subscription.unsubscribe();

 }, [watch, slugTransform, setValue, localImageUrl]);

 return (
  <form 
  onSubmit={handleSubmit(submit)} 
  className="flex flex-wrap">
  <div className="w-2/3 px-2">
  <Input
  label="Title :"
  placeholder="Title"
  className="mb-4"
  {...register("title", { required: true })}
  />
  <Input
  label="Slug :"
  placeholder="Slug"
  className="mb-4"
  {...register("slug", { required: true })}
  onInput={(e) => {
   setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
  }}
  />

   <RTE 
  label="Content :" 
  name="content" 
  control={control} 
  defaultValue={getValues("content")} 
  />

  {
  //  <Input
  // label="Content :"
  // placeholder="Content"
  // className="mb-4"
  // {...register("content")}
  // />
  }

  </div>
  <div className="w-1/3 px-2">

  <Input
  label="Local Image :"
  type="file"
  className="mb-4"
  accept="image/*"
   {...register("image")}
  onChange={e => setlocalImageUrl(URL.createObjectURL(e.target.files[0])) }
  />

  <div className="w-full mb-4">
  <img
  src={localImageUrl ? localImageUrl : dbImage }
  alt=""
  className="rounded-lg"
  />
  </div>

  <Select
  options={["active", "inactive"]}
  label="Status"
  className="mb-4"
  {...register("status")}
  />
  <Button type="submit" bgColor={post ? "bg-green-500" : "bg-orange-600"} className="w-full">
  {post ? "Update" : "Submit"}
  </Button>
  </div>
  </form>
 )
}
