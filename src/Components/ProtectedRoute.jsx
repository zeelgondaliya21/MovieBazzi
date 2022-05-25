import React from "react";
import { useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/authServices";
import Login from "./login/login";

function ProtectedRoute(props) {
  const location = useLocation();
  console.log(location);

  const { component: Component } = props;

  const user = getCurrentUser();
  // return user !== null ? <Component /> : <Navigate to="/login" />;
  return user !== null ? <Component /> : <Login prevURL={location.pathname} />;
}

export default ProtectedRoute;
