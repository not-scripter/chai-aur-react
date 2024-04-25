import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices, PostServices } from "../../appwrite";
import { Button, CardBox, Confirm } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/AuthSlice";
import toast from "react-hot-toast";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.auth);
  const [open, setopen] = useState(null);

  const handleDelete = async () => {
    const authRes = await AuthServices.deleteAccount();
    if (authRes) {
      const proRes = await PostServices.deleteProfile(profileData.$id);
      if (proRes) {
        const myPosts = await PostServices.getMyPosts(profileData.$id);
        if (myPosts) {
          const posRes = myPosts.documents.map((item) =>
            PostServices.deletePost(item.$id),
          );
          if (posRes) {
            dispatch(logout());
            toast.success("Account Deleted");
            setopen(false);
            navigate("/login");
          }
        }
      }
    }
  };
  return (
    <>
      <CardBox className="flex flex-col gap-2 bg-primary/20 backdrop-blur rounded-xl p-4">
        <h1 className="text-presecondary font-semibold">Delete Your Account</h1>
        <Button
          onClick={() => setopen(true)}
          bg="bg-red-600"
          fg="text-black"
          className="w-full py-2"
        >
          Delete
        </Button>
      </CardBox>
      <Confirm
        open={open}
        setopen={setopen}
        proceedText="Delete Account"
        warningDesc="Are You Sure ? 
        You want to Delete Your Account ?   
        It Deletes all of Your Posts also!!"
        proceedTo={handleDelete}
      />
    </>
  );
}
