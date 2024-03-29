import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

export default function AuthLayout({ children, auth = true }) {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const { authStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth && authStatus !== auth) {
      setloading(false);
      navigate("/");
    } else if (auth && authStatus !== auth) {
      setloading(false);
      navigate("/login");
    }
  }, [authStatus, navigate, auth]);

  return !loading ? <>{children}</> : <Loader />;
}
