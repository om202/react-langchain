import React from "react";
import { Header } from "./components/Header";
import "./css/App.css";
import RootRouter from "./components/RootRouter";

function App() {
  return (
    <div className="app-container">
      <Header />
      <RootRouter />
    </div>
  );
}

export default App;
