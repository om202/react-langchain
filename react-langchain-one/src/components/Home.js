import React, { useEffect, useState } from "react";
import "../css/Home.css";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="homeContainer">
      <div className="homeCardHolder homeCardHolder-1">
        <div className="homeCard homeCard-1">
          <span className="home-banner">
            <span className="home-banner-text font-large gradient-text">
              PDF Expert - Chat with your PDFs
            </span>
          </span>
          <span className="home-banner-subtitle font-medium">
            Its like ChatGPT but made for your documents.
          </span>
          <span className="get-started font-medium">Get Started</span>
          <div className="homeCardButtons">
            <button
              className="homeCardButton"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="homeCardButton"
              onClick={() => navigate("/signup")}
            >
              Sign Up{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
