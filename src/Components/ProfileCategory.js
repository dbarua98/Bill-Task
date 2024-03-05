import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import Category from "./Category";

const ProfileCategory = () => {
  let navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    !Boolean(isLoggedIn) && navigate("/");
  }, []);

  return <>{isLoggedIn ? <Category /> : <Login />}</>;
};

export default ProfileCategory;