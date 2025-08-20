import { useRef } from "react";
import { IModal } from "./modal.interface";

import "./modal.style.scss";

export const Modal = ({ children, isClosable, onOverlayClick = () => {} }: IModal) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (isClosable && modalRef.current && !modalRef.current.contains(target)) {
      onOverlayClick(e);
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__scroll-box">
        <div className="modal__container" ref={modalRef}>
          {children}
        </div>
      </div>
    </div>
  );
};
