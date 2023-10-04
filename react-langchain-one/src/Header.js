import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import "./css/Header.css";

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
        <span>
          WIP by {""}
          <a href="https://www.linkedin.com/in/omprakashsahkanu/">Omprakash</a>
        </span>
      </div>
    </div>
  );
}
