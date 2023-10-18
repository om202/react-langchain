import React, { useEffect, useState } from "react";
import { firebaseApp } from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import "../css/Login.css";
import NameLogo from "./NameLogo";
import toast from "react-hot-toast";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(firebaseApp);
  const emailInput = React.useRef(null);
  const passwordInput = React.useRef(null);

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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        emailInput.current.value = "";
        passwordInput.current.value = "";
        toast.success(`Welcome ${user.email}`);
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
        <h1>SignUp</h1>
        <form onSubmit={handleLogin}>
          <label>
            <input
              ref={emailInput}
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email address"
            />
          </label>
          <label>
            <input
              ref={passwordInput}
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <div className="login-footer">Already have an account? Sign In</div>
      </div>
    </div>
  );
}

export default SignUp;
