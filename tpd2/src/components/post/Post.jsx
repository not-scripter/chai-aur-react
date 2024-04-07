import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { NotFound, Loader, CardBox, Paragraph, ImgBox, Confirm, Button } from "../";
import { DocActions, RepliesComp, UserHeader } from "../post";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Post() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const { profileData } = useSelector(state => state.auth)
  const { postId } = useParams();
  const [user, setuser] = useState(null)
  const [post, setpost] = useState(null);
  const isAuthor = profileData.$id === user?.$id ? true : false;

  const [open, setopen] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false);

  const getData = async () => {
    if (postId) {
      const postRes = await PostServices.getPost(postId);
      if (postRes) {
      const proRes = await PostServices.getProfile(postRes.userId);
      if (proRes && postRes) {
        setuser(proRes)
        setpost(postRes);
        setloading(false);
      }
      }
    } else {
      navigate("/");
    }
  };

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
        <DocActions userId={user?.$id} postId={postId}/>
        <RepliesComp userId={user?.$id} postId={postId}/>
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
