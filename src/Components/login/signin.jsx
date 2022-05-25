import React, { useState } from "react";
import Joi from "joi";
import "../css/login.css";
import auth from "../../services/authServices";
import Toast from "../common/Toast";

function SignIn(props) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();

    const schema = Joi.object().keys({
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(loginData);

    if (error) {
      Toast.toastMessage("error", error.details[0].message);
    } else {
      try {
        Toast.toastLoading();
        const res = await auth.signin(loginData);
        console.log("RESPONSE RECEIVED: ", res.data);
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          window.location = props.prevURL ? props.prevURL : "/";
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Toast.toastMessage("error", err.response.data);
        }
        console.log("AXIOS ERROR: ", err.response && err.response.data);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="sign-in-htm">
        <form onSubmit={onLoginSubmit}>
          <div className="group">
            <label for="user" className="label">
              Email
            </label>
            <input
              value={loginData.email}
              type="text"
              className="input"
              name="email"
              onChange={handleLoginInput}
            />
          </div>
          <div className="group">
            <label for="pass" className="label">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleLoginInput}
              value={loginData.password}
              className="input"
              data-type="password"
            />
          </div>
          <div className="group">
            <input type="submit" className="button" value="Sign In" />
          </div>
        </form>
        {/* <div className="hr"></div>
              <div className="foot-lnk">
                <a href="#forgot">Log in with Google</a>
              </div> */}
      </div>
    </React.Fragment>
  );
}

export default SignIn;
