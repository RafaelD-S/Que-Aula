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
