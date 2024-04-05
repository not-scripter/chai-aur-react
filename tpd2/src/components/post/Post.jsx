import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { NotFound, Loader, CardBox, Paragraph, ImgBox, CheckBox, Confirm } from "../";
import { Actions, PostForm, RepliesComp, UserHeader } from "../post";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { DislikeSvg, LikeSvg, ReplySvg, SavesSvg, ShareSvg, defaultAvatar } from "../../assets";

export default function Post() {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const { profileData } = useSelector(state => state.auth)
  const { userId, postId } = useParams();
  const isAuthor = userId === profileData.$id ? true : false;
  const [user, setuser] = useState(null)

  const [open, setopen] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false);

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

 const [post, setpost] = useState(null);

  const getData = async () => {
    if (userId && postId) {
      const proRes = await PostServices.getProfile(userId);
      const postRes = await PostServices.getPost(postId);
      if (proRes && postRes) {
        setuser(proRes)
        setpost(postRes);
        setloading(false);
        const likeRes = post?.likes.find((user) => user === profileData.$id)
        const dislikeRes = post?.dislikes.find((user) => user === profileData.$id)
        const saveRes = post?.saves.find((user) => user === profileData.$id)
        if (likeRes) setliked(true)
        if (dislikeRes) setdisliked(true)
        if (saveRes) setsaved(true)
      }
    } else {
      navigate("/");
    }
  };

  const [liked, setliked] = useState(false);
  const [disliked, setdisliked] = useState(false);
  const [saved, setsaved] = useState(false);

  const handleLike = async () => {
    if (liked) {
      setliked(false)
      await PostServices.updatePost({
        postId: postId,
        likes: post?.likes.filter(user => user !== profileData.$id),
      })
    } else {
      setliked(true)
      setdisliked(false)
      await PostServices.updatePost({
        postId: postId,
        likes: [...post?.likes, profileData.$id],
        dislikes: post?.dislikes.filter(user => user !== profileData.$id),
      })
    }
  };
  const handleDislike = async () => {
    if (disliked) {
      setdisliked(false)
      await PostServices.updatePost({
        postId: postId,
        dislikes: post?.dislikes.filter(user => user !== profileData.$id),
      })
    } else {
      setdisliked(true)
      setliked(false)
      await PostServices.updatePost({
        postId: postId,
        likes: post?.likes.filter(user => user !== profileData.$id),
        dislikes: [...post?.dislikes, profileData.$id],
      })
    }
  };
  const handleReply = async () => {
    navigate(`/${userId}/${postId}/new-reply`)
  };
  const handleSave = async () => {
    if (saved) {
      setsaved(false)
      await PostServices.updatePost({
        postId: postId,
        saves: post?.saves.filter(user => user !== profileData.$id),
      })
      await PostServices.updateProfile({
        userId: profileData.$id,
        saves: [...profileData.saves, postId],
      })
    } else {
      setsaved(true)
      await PostServices.updatePost({
        postId: postId,
        saves: [...post?.likes, profileData.$id],
      })
      await PostServices.updateProfile({
        userId: profileData.$id,
        saves: profileData.saves.filter(item => item !== postId)
      })
    }
  };
  const handleShare = async () => {
    const exists = profileData.shares.filter(item => item === profileData.$id)
    await PostServices.updatePost({
      postId: postId,
      shares: [...post?.shares, !exists ? profileData.$id : profileData.$id ++]
    })
  };

  const PostCardItems = [
    {
      onClick: handleLike,
      name: "Like",
      icon: (
        <CheckBox checked={liked}>
          <LikeSvg className={liked ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: post?.likes.length,
    },
    {
      onClick: handleDislike,
      name: "Dislike",
      icon: (
        <CheckBox checked={disliked}>
          <DislikeSvg className={disliked ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: post?.dislikes.length,
    },
    {
      onClick: handleReply,
      name: "Reply",
      icon: <ReplySvg />,
      count: post?.replies.length,
    },
    {
      onClick: handleSave,
      name: "Saves",
      icon: (
        <CheckBox checked={saved}>
          <SavesSvg className={saved ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: post?.saves.length,
    },
    {
      onClick: handleShare,
      name: "Share",
      icon: <ShareSvg />,
      count: post?.shares.length,
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return !loading ? (
    post ? (
      <CardBox>
        <UserHeader user={user} doc={post}/>
        <Paragraph>
          {post.content}
        </Paragraph>
        { post.images && <ImgBox src={PostServices.getFilePreview(post.images)}/> }
        <Actions userId={userId} postId={postId}/>
        {/* <PostForm user={user} post={post}/> */}
        <RepliesComp userId={userId} postId={postId}/>
        {/* Extras */}
      <Confirm open={open} setopen={setopen} warningDesc="Are You Sure ? You want to Delete this Post" proceedText="Delete" proceedTo={deletePost} loading={btnLoading}/>
      </CardBox>
    ) : (
        <NotFound title="Post Not Found" />
      )
  ) : (
      <Loader />
    );
}
