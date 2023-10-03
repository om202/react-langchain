import "./css/SideBar.css";
import { BsFillFileEarmarkMedicalFill } from "react-icons/bs";

export default function SideBar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <BsFillFileEarmarkMedicalFill style={{ marginRight: "5px" }} /> PDF
          Expert
        </div>
        <div className="sidebar-subtitle">
          <b>Work in progress!</b>
          <br></br>
          <br></br>
          Currently I am testing with langchain.
        </div>
      </div>
      <div className="sidebar-content"></div>
      <div className="sidebar-footer">
        Made with <span style={{ color: "red" }}>❤</span> by{" "}
        <a href="https://www.linkedin.com/in/omprakashsahkanu/">Omprakash</a>.
      </div>
    </div>
  );
}
