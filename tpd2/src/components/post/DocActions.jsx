import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostServices } from "../../appwrite";
import { CheckBox } from "..";
import { DislikeSvg, LikeSvg, ReplySvg, SavesSvg, ShareSvg } from "../../assets";
import { useSelector } from "react-redux";

export default function DocActions({userId, postId, replyId}) {
  const navigate = useNavigate();
  const { profileData } = useSelector(state => state.auth)
  const [doc, setdoc] = useState(null);
  const docId = postId ? postId : replyId ? replyId : null;
  const docType = postId ? "post" : replyId ? "reply" : null;

  const [liked, setliked] = useState(false);
  const [disliked, setdisliked] = useState(false);
  const [saved, setsaved] = useState(false);

  const getData = async () => {
    if (userId && docId) {
      // const docRes = postId ? await PostServices.getPost(postId) : await PostServices.getReply(replyId)
      const docRes = await PostServices.getDoc({type: docType, docId})
      if (docRes) {
        setdoc(docRes);

        const likeRes = doc?.likes.find((user) => user === profileData.$id)
        const dislikeRes = doc?.dislikes.find((user) => user === profileData.$id)
        const saveRes = doc?.saves.find((user) => user === profileData.$id)
        if (likeRes) setliked(true)
        if (dislikeRes) setdisliked(true)
        if (saveRes) setsaved(true)
      }
    } else {
      navigate("/");
    }
  };

  const handleLike = async () => {
    if (liked) {
      setliked(false)
      await PostServices.updateDoc({
        type: docType,
        docId,
        likes: doc?.likes.filter(user => user !== profileData.$id),
      }).then((res) => setdoc(res))
    } else {
      setliked(true)
      setdisliked(false)
      await PostServices.updateDoc({
        type: docType,
        docId,
        likes: [...doc?.likes, profileData.$id],
        dislikes: doc?.dislikes.filter(user => user !== profileData.$id),
      }).then((res) => setdoc(res))
    }
  };
  const handleDislike = async () => {
    if (disliked) {
      setdisliked(false)
      await PostServices.updateDoc({
        type: docType,
        docId,
        dislikes: doc?.dislikes.filter(user => user !== profileData.$id),
      }).then((res) => setdoc(res))
    } else {
      setdisliked(true)
      setliked(false)
      await PostServices.updateDoc({
        type: docType,
        docId,
        likes: doc?.likes.filter(user => user !== profileData.$id),
        dislikes: [...doc?.dislikes, profileData.$id],
      }).then((res) => setdoc(res))
    }
  };
  const handleReply = async () => {
    navigate(`/${docType}/${docId}/new-reply`)
  };
  const handleSave = async () => {
    if (saved) {
      setsaved(false)
      await PostServices.updateDoc({
        type: docType,
        docId,
        saves: doc?.saves.filter(user => user !== profileData.$id),
      }).then((res) => setdoc(res))
      await PostServices.updateProfile({
        userId: profileData.$id,
        saves: [...profileData.saves, docId],
      })
    } else {
      setsaved(true)
      await PostServices.updateDoc({
        type: docType,
        docId,
        saves: [...doc?.likes, profileData.$id],
      }).then((res) => setdoc(res))
      await PostServices.updateProfile({
        userId: profileData.$id,
        saves: profileData.saves.filter(item => item !== docId)
      })
    }
  };
  const newId = useId()
  const handleShare = async () => {
    await navigator.share({
      title: userId,
      text: doc.content,
      url: `${window.location.origin}/${userId}/${docId}`
    }).then(() => {
      const exists = doc.shares.filter(item => item === profileData.$id)
      PostServices.updateDoc({
        type: docType,
        docId,
        shares: [...doc?.shares, !exists ? profileData.$id : profileData.$id + newId]
      }).then((res) => setdoc(res))
    })
  };

  const actionItems = [
    {
      onClick: handleLike,
      name: "Like",
      icon: (
        <CheckBox checked={liked}>
          <LikeSvg className={liked ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: doc?.likes.length,
    },
    {
      onClick: handleDislike,
      name: "Dislike",
      icon: (
        <CheckBox checked={disliked}>
          <DislikeSvg className={disliked ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: doc?.dislikes.length,
    },
    {
      onClick: handleReply,
      name: "Reply",
      icon: <ReplySvg />,
      count: doc?.replies.length,
    },
    {
      onClick: handleSave,
      name: "Saves",
      icon: (
        <CheckBox checked={saved}>
          <SavesSvg className={saved ? "fill-fuchsia-400 stroke-fuchsia-400" : "fill-secondary stroke-secondary"}/>
        </CheckBox>
      ),
      count: doc?.saves.length,
    },
    {
      onClick: handleShare,
      name: "Share",
      icon: <ShareSvg />,
      count: doc?.shares.length,
    },
  ];

  useEffect(() => {
    getData();
  }, [doc?.$id]);

  return (
      <div className="flex justify-evenly">
        {actionItems.map((item) => (
          <div className="flex w-fit gap-1" key={item.name}>
            <button type="button" onClick={item.onClick}>
              {item.icon}
            </button>
            <h1 className="font-semibold text-sm text-secondary/50">
              {item.count}
            </h1>
          </div>
        ))}
      </div>
  )
}