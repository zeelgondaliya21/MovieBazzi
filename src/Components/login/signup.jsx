import React, { useState } from "react";
import Joi from "joi";
import "../css/login.css";
import auth from "../../services/authServices";
import Toast from "../common/Toast";

function SignUp(props) {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRegisterSubmit = async (event) => {
    event.preventDefault();

    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email({ tlds: { allow: false } }),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    });

    const { error } = schema.validate(registerData);

    if (error) {
      Toast.toastMessage("error", error.details[0].message);
    } else {
      const data = {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      };

      try {
        const res = await auth.signout(data);
        console.log("RESPONSE RECEIVED: ", res.data);
        if (res.status === 200) {
          auth.setToken(res.data);
          window.location = props.prevURL ? props.prevURL : "/";
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Toast.toastMessage("error", err.response.data);
        }
        console.log("AXIOS ERROR: ", err.response.data);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="sign-up-htm">
        <form onSubmit={onRegisterSubmit}>
          <div className="group">
            <label for="user" className="label">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="input"
              value={registerData.name}
              onChange={handleRegisterInput}
            />
          </div>
          <div className="group">
            <label for="pass" className="label">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              className="input"
              value={registerData.email}
              onChange={handleRegisterInput}
            />
          </div>
          <div className="group">
            <label for="pass" className="label">
              Password
            </label>
            <input
              name="password"
              value={registerData.password}
              onChange={handleRegisterInput}
              type="password"
              className="input"
              data-type="password"
            />
          </div>
          <div className="group">
            <label for="pass" className="label">
              Repeat Password
            </label>
            <input
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterInput}
              type="password"
              className="input"
              data-type="password"
            />
          </div>
          <div className="group">
            <input type="submit" className="button" value="Sign Up" />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SignUp;
