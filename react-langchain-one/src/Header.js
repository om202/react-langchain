import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";
import "./css/Header.css";

export function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <BsFillFileEarmarkMedicalFill style={{ marginRight: "5px" }} /> PDF
          Expert
        </div>
      </div>
      <div className="header__right">
        <span>
          Made with ❤️ by{" "}
          <a href="https://www.linkedin.com/in/omprakashsahkanu/">Omprakash</a>
        </span>
        <span>🚧 Work in Progress!</span>
      </div>
    </div>
  );
}
