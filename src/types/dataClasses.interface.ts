export interface IClassesData {
  name: string;
  description: string;
  semester: string;
  multiClass: boolean;
  classList?: string[];
  greve: boolean;
  classes: {
    weekDay: string;
    period: string;
    teacher: string;
    selected?: boolean;
    classList?: string[];
    classroom: string;
    whichClass?: string;
    classDescription?: string;
    className?: string;
  }[];
}
