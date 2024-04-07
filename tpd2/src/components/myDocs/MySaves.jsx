import React from "react";
import { useState, useEffect } from "react";
import { PostServices } from "../../appwrite";
import { useSelector } from "react-redux";
import { Loader, NotFound } from "../";
import { ReplyCardComp } from "../post";

export default function MySaves() {
  const [saves, setsaves] = useState(null);
  const { profileData } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(true);

  const getData = async () => {
    const savRes = await PostServices.getProfile(profileData.$id);
    if (savRes) {
      setsaves(savRes.saves);
      setloading(false);
    }
  };
  console.log(saves)

  useEffect(() => {
    getData();
  }, [profileData]);

  // return !loading ? (
  //   saves.length > 0 ? (
  //     <div className="flex flex-col gap-2">
  //       {saves.map((item) => (
  //         <ReplyCardComp userId={item.userId} replyId={item.$id} />
  //       ))}
  //     </div>
  //   ) : (
  //     <NotFound title="Post Not Found" />
  //   )
  // ) : (
  //   <Loader />
  // );
}
