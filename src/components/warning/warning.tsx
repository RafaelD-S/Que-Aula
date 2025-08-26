import { useEffect, useState } from "react";
import warning from "../../assets/warning.svg";
import info from "../../assets/info.svg";
import { IWarning } from "./warning.interface";
import "./warning.style.scss";
import { createPortal } from "react-dom";
import { Modal } from "../modal/modal";

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
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const warningTypes = {
    warning,
    info,
  };

  useEffect(() => {
    if (isOpenState) {
      const element = document.createElement("div");
      element.className = "overlay";
      document.body.appendChild(element);
      setPortalTarget(element);

      return () => {
        if (element && document.body.contains(element)) {
          document.body.removeChild(element);
        }
      };
    }
  }, [isOpenState]);

  useEffect(() => {
    setIsOpenState(opened);
  }, [opened]);

  if (disabled) return children;

  return (
    <>
      <div className="warning__opener" onClick={() => setIsOpenState(true)}>
        {children}
      </div>
      {isOpenState &&
        portalTarget &&
        createPortal(
          <Modal isClosable={isClosable} onOverlayClick={() => setIsOpenState(false)}>
            <div className="warning">
              <img src={warningTypes[type]} alt="" className="warning__content__icon" />
              <h2 className="warning__content__title">{message}</h2>
              {buttonLabel && (
                <button
                  className={`warning__content__button warning__content__button--${type}`}
                  onClick={() => (onClickButton ? onClickButton() : setIsOpenState(false))}
                >
                  {buttonLabel}
                </button>
              )}
            </div>
          </Modal>,
          portalTarget!
        )}
    </>
  );
};

export default Warning;
