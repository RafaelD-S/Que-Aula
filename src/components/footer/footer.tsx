import Warning from "../warning/warning";
import "./footer.style.scss";
import { version } from "../../../package.json";
import { IFooter } from "./footer.interface";

const Footer = ({
  calendarMessage = "Apagar calendário",
  feedbackMessage,
  hasCredits = true,
}: IFooter) => {
  const eraseCalendar = () => {
    localStorage.removeItem("version");
    localStorage.removeItem("chosenClasses");
    location.reload();
  };

  return (
    <footer className="footer">
      <Warning
        message="Você tem certeza que quer apagar seu calendário?"
        buttonLabel="sim"
        onClickButton={eraseCalendar}
      >
        <a className="footer__new-calendar">{calendarMessage}</a>
      </Warning>
      <div className="footer__feedback">
        {feedbackMessage ? feedbackMessage + " " : ""}
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfkVjykgXE8E3kBQETSRzgBIYWiNX0wNW0aL5av3yZbJN6bEw/viewform?usp=sf_link"
        >
          Feedback
        </a>
      </div>
      <div className="footer__credits">
        {version}
        {hasCredits && (
          <a href="https://github.com/RafaelD-S" target="blank_">
            {" "}
            - Made By Rafael Dantas Silva
          </a>
        )}
      </div>
    </footer>
  );
};

export default Footer;
