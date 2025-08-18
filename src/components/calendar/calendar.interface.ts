import { IClassesData } from "../../types/dataClasses.interface";

export interface ICalendar {
  classes: IClasses[];
  secondaryInfo?: "classroom" | "description" | "teacher";
}

export interface IClasses {
  day: string;
  classes: IClassesData["classes"];
}

export interface IClassInfo {
  classDescription?: string;
  className?: string;
  classroom: string;
  greve?: boolean;
  period: string[];
  selected?: boolean;
  teacher?: string;
  weekDay?: string;
}
