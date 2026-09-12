import { request } from "./client";
import type { SectionExpand, SectionFull, SectionResponse } from "./models";

export const listSections = (expand?: SectionExpand | SectionExpand[]) => {
  const hasCourses = Array.isArray(expand)
    ? expand.includes("courses") || expand.includes("course")
    : expand === "courses" || expand === "course";

  return request<SectionResponse[] | SectionFull[]>("/sections", {
    expand,
  }).then((data) => (hasCourses ? (data as SectionFull[]) : (data as SectionResponse[])));
};

export const getSectionByCode = (
  subjectCode: string,
  code: string,
  expand?: SectionExpand | SectionExpand[],
) => {
  const hasCourses = Array.isArray(expand)
    ? expand.includes("courses") || expand.includes("course")
    : expand === "courses" || expand === "course";

  return request<SectionResponse | SectionFull>(`/sections/${subjectCode}/${code}`, {
    expand,
  }).then((data) => (hasCourses ? (data as SectionFull) : (data as SectionResponse)));
};
