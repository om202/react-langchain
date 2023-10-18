import React from "react";
import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import "../css/NameLogo.css";

function NameLogo() {
  return (
    <span className="name-logo-container">
      <BsFillFileEarmarkMedicalFill className="logoStyle" />
      <span className="title">PDF Expert</span>
    </span>
  );
}

export default NameLogo;
