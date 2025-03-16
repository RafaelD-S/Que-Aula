import { useRef, useState } from "react";
import Close from "../../assets/close.svg";
import "./aside.style.scss";
import Footer from "../footer/footer";

const Aside = ({ children }: any) => {
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
              <img src="./public/logo.svg" alt="" />
              <figure className="aside__header__close">
                <img src={Close} alt="close" />
              </figure>
            </div>
            <div className="aside__content">
              <div className="aside__main">
                <nav className="aside__main__nav">
                  <div className="aside__main__nav__item">Página Inicial</div>
                  <div className="aside__main__nav__item">Todas as Aulas</div>
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
