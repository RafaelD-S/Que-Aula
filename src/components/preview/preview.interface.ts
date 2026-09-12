import { IClassesDataTag } from "../../pages/form/views/classesContainer/classesContainer.interface";

export interface IPreview {
  isOpen?: boolean;
  classesData: IClassesDataTag[];
  onOverlayClick?: () => void;
  onButtonClick?: () => void;
}
