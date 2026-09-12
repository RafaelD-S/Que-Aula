import { request } from "./client";
import type { SubjectExpand, SubjectFull, SubjectResponse } from "./models";

export const listSubjects = (semester?: number, expand?: SubjectExpand | SubjectExpand[]) => {
  const hasSections = Array.isArray(expand)
    ? expand.includes("sections") || expand.includes("section")
    : expand === "sections" || expand === "section";

  return request<SubjectResponse[] | SubjectFull[]>("/subjects", {
    expand,
    query: {
      semester,
    },
  }).then((data) => (hasSections ? (data as SubjectFull[]) : (data as SubjectResponse[])));
};

export const getSubjectByCode = (code: string, expand?: SubjectExpand | SubjectExpand[]) => {
  const hasSections = Array.isArray(expand)
    ? expand.includes("sections") || expand.includes("section")
    : expand === "sections" || expand === "section";

  return request<SubjectResponse | SubjectFull>(`/subjects/${code}`, {
    expand,
  }).then((data) => (hasSections ? (data as SubjectFull) : (data as SubjectResponse)));
};
