import { useRef, useState } from "react";
import warning from "../../assets/warning.svg";
import { IWarning } from "./warning.interface";
import "./warningStyle.scss";

const Warning = ({ children, message, buttonLabel, onClickButton }: IWarning) => {
  const [isOpenState, setIsOpenState] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    if (modalRef.current && !modalRef.current.contains(target)) {
      setIsOpenState(false);
    }
  };

  return (
    <>
      <div onClick={() => setIsOpenState(true)}>{children}</div>
      {isOpenState && (
        <div className="warning" onClick={handleOverlayClick}>
          <div className="warning__content" ref={modalRef}>
            <img src={warning} alt="" className="warning__content__icon" />
            <h2 className="warning__content__title">{message}</h2>
            {buttonLabel && (
              <button className="warning__content__button" onClick={onClickButton}>
                {buttonLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Warning;
