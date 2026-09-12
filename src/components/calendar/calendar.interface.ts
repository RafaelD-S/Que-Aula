import { CourseResponse } from "../../api";
import { IClassesDataTag } from "../../pages/form/views/classesContainer/classesContainer.interface";

export interface ICalendar {
  classes: IClassesDataTag[];
  secondaryInfo?: "classroom" | "description" | "teacher";
}

export interface CalendarCourseResponse extends CourseResponse {
  description?: string;
}
