import React from "react";
import { message } from "antd";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies()

const Protected = ({ children, loggedIn }) => {

  let authTokenCookie = cookies.get('authJwtToken')
  let userCookie = cookies.get('username')

  if ((authTokenCookie) && (userCookie) && !loggedIn){
    return <Navigate to="/login" replace />;
  }
  if (!loggedIn) {
    message.warning("請先登入!", 1.3)
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;
