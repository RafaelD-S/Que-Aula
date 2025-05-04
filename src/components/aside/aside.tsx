import { useRef, useState } from "react";
import Close from "../../assets/close.svg";
import Logo from "/logo.svg";
import "./aside.style.scss";
import Footer from "../footer/footer";
import { Link } from "react-router-dom";
import { IAside } from "./aside.interface";

const Aside = ({ children }: IAside) => {
  const [isOpenState, setIsOpenState] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    if (asideRef.current && !asideRef.current.contains(target)) {
      setIsOpenState(false);
    }
  };

  return (
    <>
      <span onClick={() => setIsOpenState(true)} className="aside__opener">
        {children}
      </span>
      {isOpenState && (
        <div className="aside" onClick={handleOverlayClick}>
          <div className="aside__container" ref={asideRef}>
            <div className="aside__header">
              <Link to="/">
                <figure
                  className="aside__header__logo"
                  onClick={() => setIsOpenState(false)}
                >
                  <img src={Logo} alt="" />
                </figure>
              </Link>
              <figure
                className="aside__header__close"
                onClick={() => setIsOpenState(false)}
              >
                <img src={Close} alt="close" />
              </figure>
            </div>
            <div className="aside__content">
              <div className="aside__main">
                <nav
                  className="aside__main__nav"
                  onClick={() => setIsOpenState(false)}
                >
                  <Link to="/">
                    <div className="aside__main__nav__item">Página Inicial</div>
                  </Link>
                  <Link to="/todas-as-aulas">
                    <div className="aside__main__nav__item">Todas as Aulas</div>
                  </Link>
                  <Link to="/fluxograma">
                    <div className="aside__main__nav__item">Fluxograma</div>
                  </Link>
                </nav>
              </div>
              <div className="aside__footer">
                <Footer hasCredits={false} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Aside;
