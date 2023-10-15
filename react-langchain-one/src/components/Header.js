import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import "../css/Header.css";
import React from "react";

export function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <BsFillFileEarmarkMedicalFill style={{ marginRight: "5px" }} />
          <span className="title">PDF Expert</span>
        </div>
      </div>
      <div className="header__right">
        <span></span>
      </div>
    </div>
  );
}
