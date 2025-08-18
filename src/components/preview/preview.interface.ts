import { IClasses } from "../calendar/calendar.interface";

export interface IPreview {
  isOpen?: boolean;
  classesData: IClasses[];
  onOverlayClick?: () => void;
  onButtonClick?: () => void;
}
