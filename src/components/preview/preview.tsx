import { Modal } from "../modal/modal";
import { IPreview } from "./preview.interface";

import "./preview.style.scss";

const Preview = ({}: IPreview) => {
  return (
    <Modal>
      <div className="preview"></div>
    </Modal>
  );
};
