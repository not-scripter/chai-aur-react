import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import toast from "react-hot-toast";
import { Select } from "../";
import { Button, ImgBox, Confirm ,InputFile, TextArea } from "..";
import { UserHeader } from "./";

export default function DocForm({ user, post, reply, typePost=false, typeReply=false, replyToDoc, replyToId, replyToType }) {
  const navigate = useNavigate(); 
  const doc = post ? post : reply ? reply : null;
  const docType = 
    post ? "post" 
      : typePost ? "post" 
        : reply ? "reply" 
          : typeReply ? "reply" 
            : null;
  const docsType = docType === "post" ? "posts" : "reply" ? "replies" : "save" ? "saves" : null;

  const defaultValues = {
    content: doc?.content || "",
    visibility: doc?.visibility || "public",
  }
  const { register, handleSubmit, setValue, getValues, watch, reset } = useForm({
    defaultValues,
  });
  const { profileData } = useSelector((state) => state.auth);
  const isAuthor = doc?.userId === profileData.$id ? true : false;
  const [editable, seteditable] = useState(doc ? false : true);

  const [localImage, setlocalImage] = useState(null);
  const dbImage = doc?.images && PostServices.getFilePreview(doc.images)

  const [btnLoading, setbtnLoading] = useState(false);

  const submit = async (data) => {
    setbtnLoading(true)
    if (!doc) {
      const file = data.images[0] && await PostServices.uploadFile(data.images[0])
      if (replyToDoc) {
        const newReply = await PostServices.createReply({
          ...data,
          userId: profileData.$id,
          replyTo: replyToDoc.userId,
          replyToId: replyToDoc.$id,
          replyToType: replyToType,
          images: file ? file.$id : null,
          })
        if (newReply) {
          const updated = await PostServices.updatePost({
          postId: replyToDoc.$id,
          replies: [...replyToDoc.replies, newReply.$id]
        })
          const created = await PostServices.updateProfile({
          userId: profileData.$id,
          replies: [...profileData.replies, newReply.$id],
        })
          if (updated && created) {
          toast.success(`Reply Created`);
          setbtnLoading(false)
          navigate(`/reply/${newReply.$id}`);
          }
        }
      } else { 
        const newPost = await PostServices.createDoc({
          ...data,
          userId: profileData.$id,
          images: file ? file.$id : null,
        }).then(async (res) => await PostServices.updateProfile({
          userId: profileData.$id,
          posts: [...profileData.posts, res.$id],
        }))
        if (newPost) {
          toast.success(`Post Created`);
          setbtnLoading(false)
          navigate(`/post/${newPost.$id}`);
        }
      }
    } else {
      const file = data.images[0] && await PostServices.uploadFile(data.images[0])
      if (file && doc.images) await PostServices.deleteFile(doc.images);
      const updated = await PostServices.updateDoc({
        ...data,
        docType,
        docId: doc.$id,
        images: file ? file.$id : doc.images,
      });
      if (updated) {
        seteditable(false);
        toast.success("doc Updated");
        setbtnLoading(false)
        navigate(`/${doc.userId}/${updated.$id}`);
      }
    }
    // reset()
  };

  return (
    <>
      <UserHeader user={user} post={post} reply={reply} replyTo={replyToDoc?.userId}/>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
        <TextArea
          readOnly={!editable}
          label="Content"
          {...register("content", { required: true })}
        />
        {
          !doc || isAuthor ? (
            <Select
              label="Visibility"
              disabled={!editable}
              defaultValue={doc && doc.visibility}
              options={["public", "private"]}
              {...register("visibility")}
            />
          ) : null
        }
            <InputFile 
              label="Image"
              type="file"
              accept="image/*"
              readOnly={!editable}
              {...register("images")}
              onChange={(e) =>
                setlocalImage(URL.createObjectURL(e.target.files[0]))
              }
            />
        {
          localImage || dbImage ? <ImgBox src={localImage ? localImage : dbImage} className="rounded-xl"/> : null
        }
        {doc && isAuthor && (
            <div className="flex gap-2">
              <Button
                onClick={() => navigate(`/${docType}/${doc?.$id}`)}
                className="w-full py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit(submit)}
                className="w-full py-2"
              >
                Save
              </Button>
            </div>
        )}
        {
          !doc && (
            <Button
              loading={btnLoading}
              type="submit"
              className="w-full py-2"
              onClick={() => setbtnLoading(true)}
            >
              Create {docType}
            </Button>
          )
        }
      </form>
    </>
  )
}
