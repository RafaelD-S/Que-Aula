import Warning from "../warning/warning";
import "./footer.style.scss";
import { version } from "../../../package.json";
import { IFooter } from "./footer.interface";

import Github from "../../assets/github.svg";
import { classNames } from "../../utils/functions/classNames";
import { useNavigate } from "react-router-dom";

const Footer = ({
  calendarMessage = "Apagar calendário",
  feedbackMessage,
  hasEraseCalendar = true,
  hasCredits = true,
}: IFooter) => {
  const navigate = useNavigate();

  const eraseCalendar = () => {
    localStorage.removeItem("version");
    localStorage.removeItem("SelectedClasses");
    navigate("/form");
  };

  const creditClasses = classNames({
    footer__credits: true,
    "footer__credits--no-credits": !hasCredits,
  });

  return (
    <footer className="footer">
      {hasEraseCalendar && (
        <Warning
          message="Você tem certeza que quer apagar seu calendário?"
          buttonLabel="sim"
          onClickButton={eraseCalendar}
        >
          <a className="footer__new-calendar">{calendarMessage}</a>
        </Warning>
      )}
      <div className="footer__feedback">
        {feedbackMessage ? feedbackMessage + " " : ""}
        <a
          target="_blank"
          title="feedback"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfkVjykgXE8E3kBQETSRzgBIYWiNX0wNW0aL5av3yZbJN6bEw/viewform?usp=sf_link"
        >
          Feedback
        </a>
      </div>
      <div className={creditClasses}>
        <p className="footer__credits__version">{version}</p>
        {hasCredits && (
          <>
            <span>|</span>
            <span>Made By</span>
          </>
        )}
        <a
          href="https://github.com/RafaelD-S"
          target="blank_"
          title="github"
          className="footer__credits__link"
        >
          {hasCredits && <p>Rafael Dantas Silva</p>}
          <img src={Github} alt="gitbub icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
