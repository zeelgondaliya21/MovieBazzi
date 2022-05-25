import React from "react";
import "../css/login.css";
import SignIn from "./signin";
import SignUp from "./signup";
import { useLocation } from "react-router-dom";

function Login(props) {
  const location = useLocation();

  return (
    <div className="login-page">
      <div className="login-wrap">
        <div className="login-html">
          <input id="tab-1" type="radio" name="tab" className="sign-in" />
          <label for="tab-1" className="tab">
            Sign In
          </label>
          <input id="tab-2" type="radio" name="tab" className="sign-up" />
          <label for="tab-2" className="tab">
            Sign Up
          </label>
          <div className="login-form">
            <SignIn
              prevURL={location.state === null ? "/" : location.state.from}
            />
            <SignUp
              prevURL={location.state === null ? "/" : location.state.from}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
