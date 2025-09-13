import { IClasses } from "../../components/calendar/calendar.interface";
import { mockDayWithClasses, mockDayWithMultipleClasses, mockEmptyDay } from "./calendar.mock";

export const mockPreviewClassesData: IClasses[] = [
  mockDayWithClasses,
  mockDayWithMultipleClasses
];

export const mockEmptyPreviewData: IClasses[] = [mockEmptyDay];

export const mockPreviewPropsDefault = {
  isOpen: true,
  classesData: mockPreviewClassesData
};

export const mockPreviewPropsClosed = {
  ...mockPreviewPropsDefault,
  isOpen: false
};

export const mockPreviewPropsEmpty = {
  ...mockPreviewPropsDefault,
  classesData: mockEmptyPreviewData
};
