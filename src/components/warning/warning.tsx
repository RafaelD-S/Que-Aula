import { useEffect, useRef, useState } from "react";
import warning from "../../assets/warning.svg";
import info from "../../assets/info.svg";
import { IWarning } from "./warning.interface";
import "./warning.style.scss";

const Warning = ({
  children,
  message,
  buttonLabel,
  onClickButton,
  disabled = false,
  opened = false,
  isClosable = true,
  type = "warning",
}: IWarning) => {
  const [isOpenState, setIsOpenState] = useState(opened);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    if (isClosable && modalRef.current && !modalRef.current.contains(target)) {
      setIsOpenState(false);
    }
  };

  useEffect(() => {
    setIsOpenState(opened);
  }, [opened]);

  if (disabled) return children;

  return (
    <>
      <div className="warning__opener" onClick={() => setIsOpenState(true)}>
        {children}
      </div>
      {isOpenState && (
        <div className="warning" onClick={handleOverlayClick}>
          <div className="warning__content" ref={modalRef}>
            <img
              src={type === "warning" ? warning : info}
              alt=""
              className="warning__content__icon"
            />
            <h2 className="warning__content__title">{message}</h2>
            {buttonLabel && (
              <button
                className={`warning__content__button warning__content__button${
                  type === "warning" ? "--warning" : "--info"
                }`}
                onClick={onClickButton}
              >
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
