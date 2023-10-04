import React from "react";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";

import ChatUI from "./components/ChatUI";
import { Header } from "./components/Header";
import { firebaseConfig, getAnalytics, initializeApp } from "./firebase";

import "./css/App.css";
function App() {
  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    getAnalytics(firebaseApp);
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
