import { request } from "./client";
import type { CourseExpand, CourseResponse } from "./models";

export const listCourses = (expand?: CourseExpand | CourseExpand[]) => {
  return request<CourseResponse[]>("/courses", {
    expand,
  });
};

export const getCourseById = (idCourse: number, expand?: CourseExpand | CourseExpand[]) => {
  return request<CourseResponse>(`/courses/${idCourse}`, {
    expand,
  });
};
