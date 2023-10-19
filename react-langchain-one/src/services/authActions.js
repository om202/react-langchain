import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "../firebase";

import { loginSuccess, loginError, setAuthStatus } from "../services/authReducer";

const firebaseAuth = getAuth(firebaseApp);

export const loginUsingEmailPassword = (email, password, navigate) => {
  return (dispatch) => {
    dispatch(setAuthStatus('loading'));
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        dispatch(loginSuccess(userCredential.user.email));
        if(navigate) {
          navigate();
        }
      })
      .catch((error) => {
        dispatch(loginError(error));
      });
  };
}

export const signUpUsingEmailPassword = (email, password, navigate) => {
  return (dispatch) => {
    dispatch(setAuthStatus('loading'));
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        dispatch(loginSuccess(userCredential.user.email));
        if(navigate) {
          navigate();
        }
      })
      .catch((error) => {
        dispatch(loginError(error));
      });
  };
}