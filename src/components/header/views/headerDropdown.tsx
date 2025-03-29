import { IDropdown } from "./headerDropdown.interface";
import ArrowDown from "../../../assets/arrow-down.svg";
import "./headerDropdown.style.scss";
import { Link } from "react-router-dom";

const DropDown = ({ setNavSwitch, switchWeekday, dropdownItems, navSwitch }: IDropdown) => {
  const navButtonClass = navSwitch ? "headerDropdown__button--focus" : "";
  const navButtonClassIcon = navSwitch ? "headerDropdown__button__icon--focus" : "";

  return (
    <nav className="headerDropdown" onClick={() => setNavSwitch((prev) => !prev)}>
      <button className={`headerDropdown__button ${navButtonClass}`}>
        <h4 className="headerDropdown__button__text">Dias da Semana</h4>
        <img
          src={ArrowDown}
          alt="open-dropdown"
          className={`headerDropdown__button__icon ${navButtonClassIcon}`}
        />
      </button>

      {navSwitch &&
        dropdownItems.map((item, index) => (
          <Link to="/">
            <div
              onClick={() => switchWeekday(index + 1)}
              className="headerDropdown-item"
              key={index}
            >
              <h3 className="headerDropdown-item__text">{item}</h3>
            </div>
          </Link>
        ))}
    </nav>
  );
};

export default DropDown;
