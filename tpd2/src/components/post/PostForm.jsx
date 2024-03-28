import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostServices from "../../appwrite/PostServices";
import toast from "react-hot-toast";
import Select from "../Select";
import { add } from "../../assets";
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
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const [postEditable, setpostEditable] = useState(post ? false : true);

  const [localImage, setlocalImage] = useState(null);
  const dbImage = post && post.images && PostServices.getFilePreview(post.images)

  const [open, setopen] = useState(false)
  const [updateOpen, setupdateOpen] = useState(false)

  const submit = async (data) => {
    if (post) {
      const file = data.images[0] && await PostServices.uploadFile(data.images[0])
      if (file) await PostServices.deleteFile(post.images);
      const updated = await PostServices.updatePost({
        ...data,
        slug: post.$id,
        images: file ? file.$id : post.images,
      });
      if (updated) {
        setpostEditable(false);
        setupdateOpen(false)
        toast.success("Post Updated");
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
        // ...data,
      });
      if (newPost) {
        toast.success("Post Created");
        navigate(`/post/${newPost.$id}`);
      }
    }
    // reset()
  };

  const deletePost = async () => {
    PostServices.deletePost({slug: post.$id}).then(() => {
      dbImage ? PostServices.deleteFile({fileId: post.images}).then(() => {
        toast.success("Post Deleted");
        setopen(false);
        navigate("/");
      }) :
        toast.success("Post Deleted");
      setopen(false);
      navigate("/");
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
              <Button onClick={() => setupdateOpen(true)} className="w-full py-2">
                Save
              </Button>
            </div>
          ) : (
              <div className="flex gap-2">
                <Button onClick={() => setopen(true)} bg="bg-red-500" className="w-full py-2">
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
            <Button type="submit" className="w-full py-2">
              Create Post
            </Button>
          )
        }
      </CardBox>
      <Confirm open={open} setopen={setopen} warningDesc={postEditable ? "Are You Sure You want to Exit ?" : "Are You Sure ? You want to Delete this Post ?"} proceedText={postEditable ? "Exit" : "Delete"} proceedTo={deletePost}/>
      <Confirm open={updateOpen} setopen={setupdateOpen} warningDesc="Are You Sure ? You want to Update this Post ?" proceedText="Update" proceedTo={handleSubmit(submit)}/>
    </form>
  );
}
