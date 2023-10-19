import React from "react";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

import ChatUI from "./ChatUI/ChatUI";
import Home from './Home';
import Login from "./Login";
import SignUp from "./SignUp";
import { NotAllowed } from "./NotAllowed";
import { NotFound } from "./NotFound";

function RootRouter() {
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
    {
      path: "/not-allowed",
      element: <NotAllowed />,
    },
    {
      path: "*",
      element: <NotFound />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default RootRouter;