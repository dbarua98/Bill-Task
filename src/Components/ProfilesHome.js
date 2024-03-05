import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Home from "./Home";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const ProfileHome= () => {
  let navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    !Boolean(isLoggedIn) && navigate("/");
  },[]);

  return <>{isLoggedIn ? <Home /> : <Login />}</>;
};

export default ProfileHome;