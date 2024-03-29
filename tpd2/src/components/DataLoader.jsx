import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthServices, PostServices } from "../appwrite";
import { login, logout } from "../store/AuthSlice";
import { Loader } from "./";

export default function DataLoader() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  
  useEffect(() => {
    AuthServices.getCurrentUser()
      .then((userData) => {
        if (userData) {
          PostServices.getProfile(userData.$id).then((profileData) => {
            dispatch(login({ userData, profileData }));
          });
        } else dispatch(logout());
      })
      .finally(setloading(false));
  }, []);
  // return loading && <Loader />;
}
