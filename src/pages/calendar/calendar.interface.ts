import { IClassesData } from "../../types/dataClasses.interface";

export interface IClasses {
  day: string;
  classes: IClassesData["classes"];
}

export interface ClassInfo {
  classDescription?: string;
  className?: string;
  classroom: string;
  greve?: boolean;
  period: string[];
  selected?: boolean;
  teacher?: string;
  weekDay?: string;
}
