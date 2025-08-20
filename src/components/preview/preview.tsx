import { Modal } from "../modal/modal";
import { IPreview } from "./preview.interface";

import "./preview.style.scss";
import { Calendar } from "../calendar/calendar";

import Return from "../../assets/return.svg";

export const Preview = ({
  isOpen = false,
  classesData,
  onOverlayClick = () => {},
  onButtonClick = () => {},
}: IPreview) => {
  if (!isOpen) return;

  return (
    <Modal onOverlayClick={onOverlayClick} isClosable>
      <div className="preview">
        <h2 className="preview__title">Preview das Aulas</h2>
        <Calendar classes={classesData} secondaryInfo="description" />
        <button className="preview__button" onClick={onButtonClick}>
          <span className="preview__button__text">Voltar</span>
          <img src={Return} />
        </button>
      </div>
    </Modal>
  );
};
