import { SectionFull, SubjectResponse } from "../../../../api";

export interface IClassesContainer {
  title: string;
  classesData?: SubjectResponse[];
  semestre?: number;
  loading?: boolean;
  detailed?: boolean;
  onClickTag?: (item: IClassesDataTag) => void;
}

export interface IClassesDataTag extends SectionFull {
  selected?: boolean;
  description?: string;
}
