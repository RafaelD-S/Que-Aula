import { CourseResponse } from "../../api";

export interface IPeriodGroup {
  periodStart: number;
  periodEnd: number;
  content?: ICourseResponse[];
}

export interface ICourseResponse extends CourseResponse {
  description?: string;
}
