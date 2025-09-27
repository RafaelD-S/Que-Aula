import { IClassesData } from "../types/dataClasses.interface";

export interface IClasses {
  day: string;
  classes: IClassesData["classes"];
}
export interface IAppContextType {
  currentWeekday: number;
  setWeekday: (num: number) => void;
  storedClasses: IClasses[];
  weekDays: string[];
  allDays: string[];
  setClasses: (classes: IClasses[]) => void;
}
