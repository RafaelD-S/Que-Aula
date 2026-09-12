import { useCallback, useEffect, useState } from "react";

import { ApiError } from "./client";

import { getCourseById, listCourses } from "./courses";

import { getSectionByCode, listSections } from "./sections";

import { getSubjectByCode, listSubjects } from "./subjects";

import type {
  CourseExpand,
  CourseResponse,
  SectionExpand,
  SectionFull,
  SectionResponse,
  SubjectExpand,
  SubjectFull,
  SubjectResponse,
} from "./models";

type QueryState<TData> = {
  data: TData | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<TData | null>;
};

type QueryOptions = {
  enabled?: boolean;
};

const toApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  return new ApiError("Unexpected error", 0, error);
};

export const useApiQuery = <TData>(
  queryFn: () => Promise<TData>,
  deps: readonly unknown[],
  options?: QueryOptions,
): QueryState<TData> => {
  const [data, setData] = useState<TData | null>(null);

  const [loading, setLoading] = useState<boolean>(Boolean(options?.enabled ?? true));

  const [error, setError] = useState<ApiError | null>(null);

  const enabled = options?.enabled ?? true;

  const refetch = useCallback(async (): Promise<TData | null> => {
    if (!enabled) {
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await queryFn();

      setData(response);

      return response;
    } catch (caughtError: unknown) {
      const apiError = toApiError(caughtError);

      setError(apiError);

      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [enabled, queryFn]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    let ignore = false;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await queryFn();

        if (!ignore) {
          setData(response);
        }
      } catch (caughtError: unknown) {
        if (!ignore) {
          setError(toApiError(caughtError));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      ignore = true;
    };
  }, [enabled, queryFn, ...deps]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export const useSubjects = (semester?: number, expand?: SubjectExpand | SubjectExpand[]) => {
  const expandKey = Array.isArray(expand) ? expand.join(",") : expand;

  const queryFn = useCallback(() => listSubjects(semester, expand), [semester, expandKey]);

  return useApiQuery<SubjectResponse[] | SubjectFull[]>(queryFn, [semester, expandKey]);
};

export const useSubject = (
  code?: string,
  expand?: SubjectExpand | SubjectExpand[],
  options?: QueryOptions,
) => {
  const queryFn = useCallback(() => {
    if (!code) {
      throw new ApiError("Subject code is required", 0, null);
    }

    return getSubjectByCode(code, expand);
  }, [code, expand]);

  return useApiQuery<SubjectResponse | SubjectFull>(queryFn, [code, expand], {
    enabled: Boolean(code) && (options?.enabled ?? true),
  });
};

export const useSections = (expand?: SectionExpand | SectionExpand[]) => {
  const queryFn = useCallback(() => listSections(expand), [expand]);

  return useApiQuery<SectionResponse[] | SectionFull[]>(queryFn, [expand]);
};

export const useSection = (
  subjectCode?: string,
  code?: string,
  expand?: SectionExpand | SectionExpand[],
  options?: QueryOptions,
) => {
  const expandKey = Array.isArray(expand) ? expand.join(",") : expand;

  const queryFn = useCallback(() => {
    if (!subjectCode || !code) {
      throw new ApiError("Section key is required", 0, null);
    }

    return getSectionByCode(subjectCode, code, expand);
  }, [subjectCode, code, expandKey]);

  return useApiQuery<SectionResponse | SectionFull>(queryFn, [subjectCode, code, expandKey], {
    enabled: Boolean(subjectCode) && Boolean(code) && (options?.enabled ?? true),
  });
};

export const useCourses = (expand?: CourseExpand | CourseExpand[]) => {
  const queryFn = useCallback(() => listCourses(expand), [expand]);

  return useApiQuery<CourseResponse[]>(queryFn, [expand]);
};

export const useCourse = (
  idCourse?: number,
  expand?: CourseExpand | CourseExpand[],
  options?: QueryOptions,
) => {
  const queryFn = useCallback(() => {
    if (idCourse === undefined || idCourse === null) {
      throw new ApiError("Course id is required", 0, null);
    }

    return getCourseById(idCourse, expand);
  }, [idCourse, expand]);

  return useApiQuery<CourseResponse>(queryFn, [idCourse, expand], {
    enabled: idCourse !== undefined && idCourse !== null && (options?.enabled ?? true),
  });
};
