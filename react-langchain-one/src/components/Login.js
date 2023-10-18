import React, { useEffect, useState } from "react";
import { firebaseApp } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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

  const navigate = useNavigate();

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
    if (email === "" || password === "") {
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        emailInput.current.value = "";
        passwordInput.current.value = "";
        toast.success(`Welcome ${user.email}`);
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Something is not right`);
      });
  };

  return (
    <div className="login-container">
      <div className="login-container-holder">
        <div className="login-logo">
          <NameLogo />
        </div>
        <h2>Welcome back</h2>
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
