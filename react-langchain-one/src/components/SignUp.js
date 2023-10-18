import React, { useEffect, useState } from "react";
import { firebaseApp } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../css/Login.css";
import NameLogo from "./NameLogo";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(firebaseApp);
  const emailInput = React.useRef(null);
  const passwordInput = React.useRef(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);

  const navigate = useNavigate();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^.{8,}$/;

  useEffect(() => {
    emailInput.current.focus();
    emailInput.current.value = "";
    passwordInput.current.value = "";
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (!emailRegex.test(event.target.value)) {
      setIsEmailValid(false);
      emailInput.current.style.outline = "1px solid var(--danger-color)";
    } else {
      setIsEmailValid(true);
      emailInput.current.style.outline = "1px solid var(--success-color)";
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    if (passwordRegex.test(event.target.value)) {
      setIsPasswordValid(true);
      passwordInput.current.style.outline = "1px solid var(--success-color)";
    } else {
      setIsPasswordValid(false);
      passwordInput.current.style.outline = "1px solid var(--danger-color)";
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setSubmitButtonClicked(true);

    if (!isEmailValid || !isPasswordValid || email === "" || password === "") {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        emailInput.current.value = "";
        passwordInput.current.value = "";
        toast.success(`Sucess! Welcome ${user.email}`);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${errorCode}: ${errorMessage}`);
      });
  };

  return (
    <div className="login-container">
      <div className="login-container-holder">
        <div className="login-logo">
          <NameLogo />
        </div>
        <h2>Create Account</h2>

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
              Password must be  at least 8 characters long.
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
