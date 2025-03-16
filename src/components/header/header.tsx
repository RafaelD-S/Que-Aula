import Menu from "../../assets/menu.svg";

import "./header.style.scss";

import { useState } from "react";
import { IHeader } from "./header.interface";
import DropDown from "./views/headerDropdown";
import Aside from "../aside/aside";

const Header = ({ switchWeekday, weekDays }: IHeader) => {
  const [navSwitch, setNavSwitch] = useState(false);
  const [asideSwitch, setAsideSwitch] = useState(false);

  return (
    <header className="header">
      <section className="header__title" onClick={() => setNavSwitch(false)}>
        <h1>Que Aula?</h1>
        <figure className="header__reset" onClick={() => setAsideSwitch((prev) => !prev)}>
          <img src={Menu} alt="reset" />
        </figure>
      </section>
      <DropDown
        setNavSwitch={setNavSwitch}
        switchWeekday={switchWeekday}
        dropdownItems={weekDays}
        navSwitch={navSwitch}
      />
      {asideSwitch && <Aside />}
    </header>
  );
};
export default Header;
