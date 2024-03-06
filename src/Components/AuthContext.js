import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem('token');
  const handleLogin = () => {

    setIsLoggedIn(true);
   
  };

  useEffect(()=>{
    if(token){
      setIsLoggedIn(true);

    }
    else{
      setIsLoggedIn(false);
    }
  },[token])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, handleLogin, handleLogout, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
