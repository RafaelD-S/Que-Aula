export type ExpandParam = string | string[] | undefined;

export type SubjectResponse = {
  code: string;
  name: string;
  semester: number;
};

export type SectionResponse = {
  code: string;
  isStrike: boolean;
  subjectCode: string;
};

export type CourseResponse = {
  idCourse: number;
  sectionCode: string;
  subjectCode: string;
  teacher: string;
  classroom: string;
  weekday: number;
  periodStart: number;
  periodEnd: number;
};

export type SectionFull = SectionResponse & {
  courses: CourseResponse[];
};

export type SubjectFull = SubjectResponse & {
  sections: SectionFull[];
};

export type SubjectExpand = "sections" | "courses" | "section" | "course";

export type SectionExpand = "courses" | "course";

export type CourseExpand = "section" | "subject" | "sections" | "subjects";
