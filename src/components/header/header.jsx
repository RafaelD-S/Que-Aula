import Reset from "../../assets/refresh.svg";
import ArrowDown from "../../assets/arrow-down.svg";

import "./headerStyle.scss";

import { useState } from "react";

export default function Header({ switchWeekday }) {
  const dropdownItems = [
    "Segunda-Feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-Feira",
  ];
  const [navSwitch, setNavSwitch] = useState(true);

  return (
    <header className="header">
      <section className="header__title" onClick={() => setNavSwitch(true)}>
        <h1>Que Aula?</h1>
        <figure className="header__reset" onClick={() => location.reload()}>
          <img src={Reset} alt="reset" />
        </figure>
      </section>
      <DropDown
        setNavSwitch={setNavSwitch}
        switchWeekday={switchWeekday}
        dropdownItems={dropdownItems}
        navSwitch={navSwitch}
      />
    </header>
  );
}

function DropDown({ setNavSwitch, switchWeekday, dropdownItems, navSwitch }) {
  const navButtonClass = navSwitch ? "header__dropDown__button--focus" : "";
  const navButtonClassIcon = navSwitch ? "header__dropDown__button__icon--focus" : "";

  return (
    <nav className="header__dropDown" onClick={() => setNavSwitch((prev) => !prev)}>
      <button className={`header__dropDown__button ${navButtonClass}`}>
        <h4 className="header__dropDown__button__text">Dias da Semana</h4>
        <img
          src={ArrowDown}
          alt=""
          className={`header__dropDown__button__icon ${navButtonClassIcon}`}
        />
      </button>

      {navSwitch &&
        dropdownItems.map((item, index) => (
          <div onClick={() => switchWeekday(index + 1)} className="header__dropDown-item">
            <h3 className="header__dropDown-item__text">{item}</h3>
          </div>
        ))}
    </nav>
  );
}
