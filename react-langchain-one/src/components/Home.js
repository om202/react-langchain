import React from "react";
import "../css/Home.css";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="homeContainer">
      <div className="homeCardHolder homeCardHolder-1">
        <div className="homeCard homeCard-1">
          <img src='/talk.png' alt="chat" className="homeIntroImage" />
          <h1>Talk with PDFs</h1>
          <div className="homeCardButtons">
            <button className="homeCardButton" onClick={() => navigate('/login')}>Login</button>
            <button className="homeCardButton" onClick={() => navigate('/signup')}>Sign Up </button>
          </div>
        </div>
      </div>
    </div>
  );
}
