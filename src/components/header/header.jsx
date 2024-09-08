import Reset from "../../assets/refresh.svg";
import ArrowDown from "../../assets/arrow-down.svg";

import "./headerStyle.scss";

import { useState } from "react";

export default function Header({ switchWeekday }) {
  const [navSwitch, setNavSwitch] = useState(true);

  return (
    <header className="header">
      <section className="header__title" onClick={() => setNavSwitch(true)}>
        <h1>Que Aula?</h1>
        <figure className="header__reset" onClick={() => location.reload()}>
          <img src={Reset} alt="reset" />
        </figure>
      </section>
      {navSwitch ? (
        <Nav setNavSwitch={setNavSwitch} />
      ) : (
        <DropDown setNavSwitch={setNavSwitch} switchWeekday={switchWeekday} />
      )}
    </header>
  );
}

function DropDown({ setNavSwitch, switchWeekday }) {
  return (
    <nav
      className="header__nav header__nav__dropDown"
      onClick={() => setNavSwitch(true)}
    >
      <button className="header__nav-button header__nav__dropDown-button">
        <h4 className="header__nav-button-text">Dias da Semana</h4>
        <img
          src={ArrowDown}
          alt=""
          className="header__nav-button-icon header__nav__dropDown-button-icon"
        />
      </button>
      <h3
        onClick={() => switchWeekday(1)}
        className="header__nav__dropDown-item"
      >
        Segunda-Feira
      </h3>
      <h3
        onClick={() => switchWeekday(2)}
        className="header__nav__dropDown-item"
      >
        Terça-Feira
      </h3>
      <h3
        onClick={() => switchWeekday(3)}
        className="header__nav__dropDown-item"
      >
        Quarta-Feira
      </h3>
      <h3
        onClick={() => switchWeekday(4)}
        className="header__nav__dropDown-item"
      >
        Quinta-Feira
      </h3>
      <h3
        onClick={() => switchWeekday(5)}
        className="header__nav__dropDown-item"
      >
        Sexta-Feira
      </h3>
    </nav>
  );
}

function Nav({ setNavSwitch }) {
  return (
    <nav className="header__nav">
      <button
        className="header__nav-button"
        onClick={() => setNavSwitch(false)}
      >
        <h4 className="header__nav-button-text">Dias da Semana</h4>
        <img src={ArrowDown} alt="" className="header__nav-button-icon" />
      </button>
    </nav>
  );
}
