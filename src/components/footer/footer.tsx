import Warning from "../waning/warning";
import "./footer.style.scss";
import { version } from "../../../package.json";

const Footer = () => {
  const eraseCalendar = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <footer className="footer">
      <Warning
        message="Você tem certeza que quer apagar seu calendário?"
        buttonLabel="sim"
        onClickButton={eraseCalendar}
      >
        <a className="footer__new-calendar">Criar um novo calendário</a>
      </Warning>
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
        {version} - Made By{" "}
        <a href="https://github.com/RafaelD-S" target="blank_">
          Rafael Dantas Silva
        </a>
      </div>
    </footer>
  );
};

export default Footer;
