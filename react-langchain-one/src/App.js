import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import ChatUI from "./components/ChatUI/ChatUI";
import { Header } from "./components/Header";

import "./css/App.css";
import Login from "./components/Login";


import SignUp from "./components/SignUp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="app-container">
      <Header />
      <ChatUI userName={"Omprakash"} />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
