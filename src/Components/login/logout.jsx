import React, { useEffect } from "react";
import auth from "../../services/authServices";

function Logout(props) {
  useEffect(() => {
    auth.logout();
    window.location = "/";
  });

  return null;
}

export default Logout;
