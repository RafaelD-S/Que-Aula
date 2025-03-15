export interface IDayClasses {
  currentWeekday: number;
}

export interface IClasses {
  day: string;
  classes: any[];
}

export interface ISectionArray {
  start: string | number;
  end: string | number;
  data: {
    weekDay: string;
    period: string[];
    teacher: string;
    selected?: boolean;
    classList?: string[];
    classroom: string;
    whichClass?: string;
    classDescription?: string;
    className?: string;
  } | null;
}
