import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import TextArea from '../../TextArea'
import PostServices from '../../../appwrite/PostServices'

export default function ReplieForm({reply}) {
  const {userId, postId} = useParams
  const [loading, setloading] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false)
  const [editable, seteditable] = useState(false)
  const { profileData } = useSelector(state => state.auth)
  const isAuthor = profileData.$id === reply.userId ? true : false;
  const navigate = useNavigate()
  const [post, setpost] = useState(null)

  const defaultValues = {
    content: reply?.contemt || "",
    images: reply?.images || "",
  }
  const { handleSubmit, reset, register, setValue, watch } = useForm({
    defaultValues
  })

  const [localImage, setlocalImage] = useState(null)
  const dbImage = reply ? PostServices.getFilePreview(reply.images) : null;

  const getPost = async () => {
    await PostServices.getPost(postId).then(res => setpost(res))
  }

  const submit = async (data) => {
    if (reply) {
      const file = localImage ? await PostServices.uploadFile(localImage) : null;
      if (file && post.images) await PostServices.deleteFile(post.images);
      const updated = await PostServices.updateReply({
        replyId: reply.$id,
        images: file ? file.$id : reply.images,
        ...data
      })
      if (updated) {
        setbtnLoading(false)
        seteditable(false)
        toast.success("Reply Added")
        navigate(`/${userId}/${postId}`)
      }
    } else {
      const file = localImage ? await PostServices.uploadFile(localImage) : null;
      const newReply = await PostServices.createReply({
        userId: profileData.$id,
        replyTo: post.userId,
        replyToId: post.$id,
        images: localImage ? file.$id : null,
        ...data
      })
      if (newReply) {
        const updated = await PostServices.updateProfile({
        userId: profileData.$id,
        replies: [...profileData.replies, newReply.$id]
        })
        if (updated) {
          toast.success("Reply Added")
          navigate(`/${userId}/${newReply.replyToId}`)
        }
      }
    }
  }

  // const slugTransform = useCallback((value) => {
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
  //       setValue("slug", slugTransform(value.title), { shouldValidate: true });
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch, slugTransform, setValue]);

  useEffect(() => {
  getPost()
  }, [])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
      <CardBox>
        <TextArea
          readOnly={!editable}
          label="Content"
          {...register("content", { required: true })}
        />
        {
          editable && (
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
          )
        }
        {
          localImage || dbImage ? <ImgBox src={localImage ? localImage : dbImage} /> : null
        }
        {reply && isAuthor && (
          editable ? (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  seteditable(false);
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
                <Button onClick={() => seteditable(true)} className="w-full py-2">
                  Edit
                </Button>
              </div>
            )
        )}
        {
          !reply && (
            <Button
              loading={btnLoading}
              type="submit"
              className="w-full py-2"
              onClick={() => setbtnLoading(true)}
            >
              Create Reply
            </Button>
          )
        }
      </CardBox>
      <Confirm open={open} setopen={setopen} warningDesc={editable ? "Are You Sure You want to Exit ?" : "Are You Sure ? You want to Delete this Post ?"} proceedText={editable ? "Exit" : "Delete"} proceedTo={deletePost} loading={btnLoading}/>
    </form>
  );
}
