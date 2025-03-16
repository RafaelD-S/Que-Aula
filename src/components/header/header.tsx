import Menu from "../../assets/menu.svg";

import "./header.style.scss";

import { useState } from "react";
import { IHeader } from "./header.interface";
import DropDown from "./views/headerDropdown";
import Aside from "../aside/aside";

const Header = ({ switchWeekday, weekDays }: IHeader) => {
  const [navSwitch, setNavSwitch] = useState(false);

  return (
    <header className="header">
      <section className="header__title" onClick={() => setNavSwitch(false)}>
        <h1>Que Aula?</h1>
        <Aside>
          <figure className="header__menu">
            <img src={Menu} alt="menu" />
          </figure>
        </Aside>
      </section>
      <DropDown
        setNavSwitch={setNavSwitch}
        switchWeekday={switchWeekday}
        dropdownItems={weekDays}
        navSwitch={navSwitch}
      />
    </header>
  );
};
export default Header;
