import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { TextArea, ImgBox, Confirm, Button, InputFile, CardBox } from '../../'
import { PostServices } from '../../../appwrite'
import { UserHeader } from '../'

export default function ReplyForm({ user, reply }) {
  const [btnLoading, setbtnLoading] = useState(false)
  const [editable, seteditable] = useState(!reply ? true : false)
  const { profileData } = useSelector(state => state.auth)
  const isAuthor = profileData.$id === reply?.userId ? true : false;
  const navigate = useNavigate()
  const [open, setopen] = useState(false)

  const defaultValues = {
    content: reply?.contemt || "",
  }
  const { handleSubmit, reset, register, setValue, watch } = useForm({
    defaultValues
  })

  const [localImage, setlocalImage] = useState(null)
  const dbImage = reply && PostServices.getFilePreview(reply.images);

  const submit = async (data) => {
    // if (reply) {
    //   const file = localImage ? await PostServices.uploadFile(localImage) : null;
    //   if (file && reply.images) await PostServices.deleteFile(reply.images);
    //   const updated = await PostServices.updateReply({
    //     ...data,
    //     replyId: reply.$id,
    //     images: file ? file.$id : reply.images,
    //   })
    //   if (updated) {
    //     setbtnLoading(false)
    //     seteditable(false)
    //     toast.success("Reply Added")
    //     navigate(`/${user.$id}/${reply.$id}`)
    //   }
    // } else {
    //   const file = localImage ? await PostServices.uploadFile(localImage) : null;
    //   const newReply = await PostServices.createReply({
    //     ...data,
    //     userId: profileData.$id,
    //     replyTo: reply.userId,
    //     replyToId: reply.$id,
    //     images: file ? file.$id : null,
    //   })
    //   if (newReply) {
    //     const updated = await PostServices.updateProfile({
    //     userId: profileData.$id,
    //     replies: [...profileData.replies, newReply.$id]
    //     })
    //     if (updated) {
    //       toast.success("Reply Added")
    //       navigate(`/${user.$id}/${updated.$id}`)
    //     }
    //   }
    // }
  }

      // <Confirm open={open} setopen={setopen} warningDesc={editable ? "Are You Sure You want to Exit ?" : "Are You Sure ? You want to Delete this Reply ?"} proceedText={editable ? "Exit" : "Delete"} proceedTo={deleteReply} loading={btnLoading}/>
  //   setbtnLoading(true)
  //   const repRes = await PostServices.deleteReply(reply.$id)
  //   reply.images && await PostServices.deleteFile(reply.images);
  //   if (repRes) {
  //     const posRes = await PostServices.updateProfile({
  //       userId: profileData.$id,
  //       replies: profileData.replies.filter((item) => item !== reply.$id),
  //     })
  //     if (posRes) {
  //     toast.success("Reply Deleted");
  //     setbtnLoading(false)
  //     setopen(false);
  //     navigate("/");
  //     }
  //   }
  // }

  // useEffect(() => {
  // getData()
  // }, [user.$id, reply?.$id])

  return (
    <>
      <UserHeader user={user} doc={reply}/>
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
            localImage || dbImage ? <ImgBox src={localImage ? localImage : dbImage} className='rounded-xl'/> : null
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
      </form>
    </>
  );
}
// <Confirm open={open} setopen={setopen} warningDesc={editable ? "Are You Sure You want to Exit ?" : "Are You Sure ? You want to Delete this Reply ?"} proceedText={editable ? "Exit" : "Delete"} proceedTo={deleteReply} loading={btnLoading}/>
