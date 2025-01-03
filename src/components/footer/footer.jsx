import "./footerStyle.scss";
import closeIcon from "../../assets/close.svg";
import { useState } from "react";

export default function Footer() {
  const [openWarning, setOpenWarning] = useState(false);

  return (
    <footer className="footer">
      <a className="footer__new-calendar" onClick={() => setOpenWarning(true)}>
        Criar um novo calendário
      </a>
      <div className="footer__feedback">
        Achou algo ou quer dar uma sugestão?{" "}
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfkVjykgXE8E3kBQETSRzgBIYWiNX0wNW0aL5av3yZbJN6bEw/viewform?usp=sf_link"
        >
          Feedback
        </a>
      </div>
      <div className="footer__credits">
        Beta V2 - Made By{" "}
        <a href="https://github.com/RafaelD-S" target="blank_">
          Rafael Dantas Silva
        </a>
      </div>
      {openWarning && <Warning setOpenWarning={setOpenWarning} />}
    </footer>
  );
}

export function Warning({ setOpenWarning }) {
  const eraseCalendar = () => {
    localStorage.clear();
    location.reload();
  };
  return (
    <div className="footer__warning" onClick={() => setOpenWarning(false)}>
      <div className="footer__warning-content">
        <img src={closeIcon} alt="" className="footer__warning-content__icon" />
        <h2 className="footer__warning-content__title">
          Você tem certeza que quer apagar seu calendário?
        </h2>
        <button
          className="footer__warning-content__button"
          onClick={eraseCalendar}
        >
          Sim
        </button>
      </div>
    </div>
  );
}
