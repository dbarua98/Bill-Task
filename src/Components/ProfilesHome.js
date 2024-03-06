import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Home from "./Home";
import Login from "./Login";
import { useNavigate } from "react-router-dom"; 

const ProfileHome= () => {
  const token = localStorage.getItem('token');
  let navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  // useEffect(() => {
  //   !Boolean(token) && navigate("/");
  // },[]);

  return <>{ token? <Home /> : <Login />}</>;
};

export default ProfileHome;