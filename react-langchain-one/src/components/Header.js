import "../css/Header.css";
import React from "react";
import NameLogo from "./NameLogo";
import { useSelector } from "react-redux";

export function Header() {
  const authUser = useSelector((state) => state.authentication.authUser);

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <NameLogo />
        </div>
      </div>
      <div className="header__right">
        <span>{authUser}</span>
      </div>
    </div>
  );
}
