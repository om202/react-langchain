import React, { useEffect, useState } from "react";
import "../css/Login.css";
import NameLogo from "./NameLogo";
import { loginUsingEmailPassword } from "../services/authActions";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInput = React.useRef(null);
  const passwordInput = React.useRef(null);
  const authError = useSelector((state) => state.authentication.authError);

  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === "" || password === "" ) {
      return;
    }

    dispatch(loginUsingEmailPassword(email, password, () => navigator("/app")));
  };

  return (
    <div className="login-container">
      <div className="login-container-holder">
        <div className="login-logo">
          <NameLogo />
        </div>
        <h2 className="gradient-text">Welcome back</h2>
        {authError && "Invalid email or password"}
        <form onSubmit={handleLogin} className="login-form">
          <label>
            <input
              className="login-input"
              ref={emailInput}
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email address"
              autoComplete="on"
            />
          </label>
          <label>
            <input
              className="login-input"
              ref={passwordInput}
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="on"
            />
          </label>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-footer">
          Don't have account?{" "}
          <a href="/signup" style={{ marginLeft: "8px" }}>
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
