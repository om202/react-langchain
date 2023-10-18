import "../css/Header.css";
import React from "react";
import NameLogo from "./NameLogo";

export function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <NameLogo />
        </div>
      </div>
      <div className="header__right">
        <span>Version: 0.2 (Unstable)</span>
      </div>
    </div>
  );
}
