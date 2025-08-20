import Menu from "../../assets/menu.svg";

import "./header.style.scss";

import { useState } from "react";
import DropDown from "./views/headerDropdown";
import Aside from "../aside/aside";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { setWeekday, weekDays } = useAppContext();
  const [navSwitch, setNavSwitch] = useState(false);

  return (
    <header className="header">
      <section className="header__title" onClick={() => setNavSwitch(false)}>
        <Link to="/" onClick={() => setWeekday(new Date().getDay())}>
          <h1>Que Aula?</h1>
        </Link>
        <Aside>
          <figure className="header__menu">
            <img src={Menu} alt="menu" />
          </figure>
        </Aside>
      </section>
      <DropDown
        setNavSwitch={setNavSwitch}
        switchWeekday={setWeekday}
        dropdownItems={weekDays}
        navSwitch={navSwitch}
      />
    </header>
  );
};
export default Header;
