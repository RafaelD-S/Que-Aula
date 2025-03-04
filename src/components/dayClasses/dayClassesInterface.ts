import { IClassesData } from "../../types/dataClasses.interface";

export interface IDayClasses {
  currentWeekday: number;
}

export interface IClasses {
  day: string;
  classes: {
    firstClass: IClassesData["classes"];
    secClass: IClassesData["classes"];
    thirdClass: IClassesData["classes"];
  };
}
