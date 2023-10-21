import React, { useEffect, useState } from "react";
import "../css/Login.css";
import NameLogo from "./NameLogo";
import { useNavigate } from "react-router";
import { signUpUsingEmailPassword } from "../services/authActions";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordDonotMatch, setPasswordDonotMatch] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const emailInput = React.useRef(null);
  const passwordInput = React.useRef(null);
  const confirmPasswordInput = React.useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^.{8,}$/;

  useEffect(() => {
    emailInput.current.focus();
    emailInput.current.value = "";
    passwordInput.current.value = "";
    confirmPasswordInput.current.value = "";
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (!emailRegex.test(event.target.value)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    if (passwordRegex.test(event.target.value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);

    if (password === event.target.value) {
      setPasswordDonotMatch(false);
    } else {
      setPasswordDonotMatch(true);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setSubmitButtonClicked(true);

    if (!isEmailValid || !isPasswordValid || passwordDonotMatch || email === "" || password === "") {
      return;
    }
    dispatch(signUpUsingEmailPassword(email, password, () => navigate("/app")));
  };

  return (
    <div className="login-container">
      <div className="login-container-holder">
        <div className="login-logo">
          <NameLogo />
        </div>
        <h2 className="gradient-text">Create Account</h2>

        <form onSubmit={handleLogin} className="login-form">
          {!isEmailValid && submitButtonClicked && (
            <span className="not-valid-text">Email is not valid</span>
          )}
          <input
            className="login-input"
            ref={emailInput}
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email address"
          />

          {!isPasswordValid && submitButtonClicked && (
            <span className="not-valid-text">
              Password must be at least 8 characters long.
            </span>
          )}
          <input
            className="login-input"
            ref={passwordInput}
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordDonotMatch && confirmPassword && (
            <span className="not-valid-text">Passwords do not match.</span>
          )}
          <input
            className="login-input"
            ref={confirmPasswordInput}
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>
        <div className="login-footer">
          Already have an account?{" "}
          <a href="/login" style={{ marginLeft: "8px" }}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
