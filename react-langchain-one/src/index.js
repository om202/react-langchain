import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import ChatUI from "./components/ChatUI/ChatUI";
import { Header } from "./components/Header";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./components/Home";
const root = ReactDOM.createRoot(document.getElementById("root"));

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {

//   }
// });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/app",
    element: <ChatUI />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
    <Toaster position="top-right" reverseOrder={false} />
  </React.StrictMode>
);

reportWebVitals();
