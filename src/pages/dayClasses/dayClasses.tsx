import { useNavigate, useParams } from "react-router-dom";
import "./dayClasses.style.scss";
import { useAppContext } from "../../context/AppContext";
import { Fragment, useEffect, useMemo, useState } from "react";
import { IClassesDataTag } from "../form/views/classesContainer/classesContainer.interface";
import { CourseResponse, getCourseById } from "../../api";
import { getPeriodString } from "../../utils/functions/getPeriodString";
import { ICourseResponse, IPeriodGroup } from "./dayClasses.interface";

import Reload from "../../assets/reload.svg";

const DayClasses = () => {
  const appContext = useAppContext() as { weekdays?: string[]; weekDays?: string[] };
  const weekdays = appContext.weekdays ?? appContext.weekDays ?? [];
  const params = useParams();
  const navigate = useNavigate();
  const [currentWeekday, setCurrentWeekday] = useState<number>(new Date().getDay());
  const [animation, setAnimation] = useState(false);

  const initialselectedClasses = useMemo(() => {
    try {
      const storedClasses = localStorage.getItem("SelectedClasses");
      return storedClasses ? (JSON.parse(storedClasses) as IClassesDataTag[]) : [];
    } catch {
      return [] as IClassesDataTag[];
    }
  }, []);

  const [selectedClasses, setSelectedClasses] = useState<IClassesDataTag[]>(initialselectedClasses);
  const [reloadingCourseId, setReloadingCourseId] = useState<number | null>(null);

  const hasMoreSections = (course: ICourseResponse) => {
    const count = selectedClasses.filter((item) => item.subjectCode === course.subjectCode).length;

    return count <= 1;
  };

  const getClassesByWeekday = (
    selectedClasses: IClassesDataTag[],
    weekday: number,
  ): CourseResponse[] => {
    const classFlatMap = selectedClasses.flatMap((item) => {
      const coursesMap = item.courses.map((course) => {
        return { ...course, description: item.description };
      });
      return coursesMap;
    });

    const filteredClasses = classFlatMap.filter((item) => item.weekday === weekday);
    return filteredClasses;
  };

  const getClassesGroups = (
    selectedClasses: IClassesDataTag[],
    weekday: number,
  ): IPeriodGroup[] => {
    const todayCourses = getClassesByWeekday(selectedClasses, weekday);
    const periods: CourseResponse[][] = Array.from({ length: 6 }, () => []);

    todayCourses.forEach((item) => {
      const startPeriod = Number.isFinite(item.periodStart) ? item.periodStart : 0;
      const endPeriod = Number.isFinite(item.periodEnd) ? item.periodEnd : startPeriod;

      for (let i = startPeriod; i <= endPeriod; i += 1) {
        if (!periods[i]) {
          periods[i] = [];
        }

        periods[i].push(item);
      }
    });

    const groups: Array<IPeriodGroup & { courseIds: Set<number> }> = [];
    const activeCourses = new Map<number, number>();
    let gapStart: number | null = null;

    for (let periodIndex = 0; periodIndex < periods.length; periodIndex += 1) {
      const period = periods[periodIndex] ?? [];

      if (!period.length) {
        if (gapStart === null) {
          gapStart = periodIndex;
        }

        activeCourses.clear();
        continue;
      }

      if (gapStart !== null) {
        const lastGroup = groups[groups.length - 1];

        if (lastGroup && lastGroup.content === undefined) {
          lastGroup.periodEnd = periodIndex - 1;
        } else {
          groups.push({
            periodStart: gapStart,
            periodEnd: periodIndex - 1,
            content: undefined,
            courseIds: new Set(),
          });
        }

        gapStart = null;
      }

      const currentCourseIds = [...new Set(period.map((item) => item.idCourse))];

      for (const courseId of Array.from(activeCourses.keys())) {
        if (!currentCourseIds.includes(courseId)) {
          activeCourses.delete(courseId);
        }
      }

      let groupIndex = currentCourseIds
        .map((courseId) => activeCourses.get(courseId))
        .find((index): index is number => index !== undefined);

      if (groupIndex === undefined) {
        const newGroup = {
          periodStart: periodIndex,
          periodEnd: periodIndex,
          content: [] as CourseResponse[],
          courseIds: new Set<number>(currentCourseIds),
        };

        groups.push(newGroup);
        groupIndex = groups.length - 1;

        currentCourseIds.forEach((courseId) => activeCourses.set(courseId, groupIndex!));
      }

      const group = groups[groupIndex];
      group.periodEnd = periodIndex;

      const groupKeys = new Set(
        group.content?.map(
          (item) => `${item.idCourse}-${item.teacher}-${item.classroom}-${item.subjectCode}`,
        ) ?? [],
      );

      period.forEach((item) => {
        const key = `${item.idCourse}-${item.teacher}-${item.classroom}-${item.subjectCode}`;

        if (!groupKeys.has(key)) {
          group.content ??= [];
          group.content.push(item);
          groupKeys.add(key);
        }
      });

      currentCourseIds.forEach((courseId) => {
        if (!group.courseIds.has(courseId)) {
          group.courseIds.add(courseId);
        }

        activeCourses.set(courseId, groupIndex);
      });
    }

    if (gapStart !== null) {
      const lastGroup = groups[groups.length - 1];

      if (lastGroup && lastGroup.content === undefined) {
        lastGroup.periodEnd = periods.length - 1;
      } else {
        groups.push({
          periodStart: gapStart,
          periodEnd: periods.length - 1,
          content: undefined,
          courseIds: new Set(),
        });
      }
    }

    return groups
      .filter(
        (group) =>
          group.content !== undefined ||
          group.periodStart !== group.periodEnd ||
          group.courseIds.size === 0,
      )
      .map((group) => ({
        periodStart: group.periodStart,
        periodEnd: group.periodEnd,
        content: group.content,
      }));
  };

  const handleReloadClassroom = async (course: ICourseResponse) => {
    setReloadingCourseId(course.idCourse);

    try {
      const teste = await getCourseById(course.idCourse);

      const newClasses: IClassesDataTag[] = selectedClasses.map((classItem) => {
        const newCourses = classItem.courses.map((courseItem) => {
          if (courseItem.idCourse === teste.idCourse) return teste;
          return courseItem;
        });

        return { ...classItem, courses: newCourses };
      });

      setSelectedClasses(newClasses);
      localStorage.setItem("SelectedClasses", JSON.stringify(newClasses));
    } finally {
      setReloadingCourseId(null);
    }
  };

  useEffect(() => {
    setAnimation(false);

    requestAnimationFrame(() => {
      setAnimation(true);
    });
  }, [currentWeekday]);

  useEffect(() => {
    const isDayRoute = params["*"]?.startsWith("day");
    const dayIndex = weekdays.findIndex((item) => item.toLowerCase() === params.day?.toLowerCase());

    if (isDayRoute && dayIndex === -1) {
      navigate("/error");
      return;
    }

    const resolvedDay = isDayRoute ? dayIndex : new Date().getDay();
    setCurrentWeekday(resolvedDay >= 0 ? resolvedDay : 0);
  }, [navigate, params, weekdays]);

  const dayGroups = getClassesGroups(selectedClasses, currentWeekday);

  return (
    <main className="dayClasses">
      <h2 className="dayClasses__title">{weekdays[currentWeekday] ?? "Dia"}</h2>
      <article className="dayClasses__container">
        {dayGroups.map((group, index) => {
          const isEmpty = !group.content || group.content.length === 0;

          if (!animation) return <Fragment key={index}></Fragment>;

          return (
            <section
              className={`dayClasses__item ${isEmpty ? "dayClasses__item--empty" : ""}`}
              key={`${group.periodStart}-${group.periodEnd}-${index}`}
            >
              <div className="dayClasses__schedule">
                <h3>
                  {getPeriodString(group.periodStart)} {getPeriodString(group.periodEnd + 1)}
                </h3>
              </div>
              <div className="dayClasses__info-container">
                {!isEmpty ? (
                  group.content!.map((course) => (
                    <div
                      key={`${course.idCourse}-${course.classroom}-${course.teacher}`}
                      className="dayClasses__info-item"
                    >
                      <h4 className="dayClasses__info-item-title">
                        <span>{course.subjectCode}</span>
                        {!hasMoreSections(course) && (
                          <span className="dayClasses__info-item-class">{course.sectionCode}</span>
                        )}
                        <span> - {course.teacher}</span>
                      </h4>
                      <h4 className="dayClasses__info-item-classroom">
                        <span
                          className={`${reloadingCourseId === course.idCourse ? "shimmer" : ""}`}
                        >
                          {course.classroom}
                        </span>
                        <button
                          className={`dayClasses__info-item-classroom__reload `}
                          disabled={reloadingCourseId !== null}
                          onClick={() => handleReloadClassroom(course)}
                        >
                          <img src={Reload} />
                        </button>
                      </h4>
                      <h5 className="dayClasses__info-item-description">{course.description}</h5>
                    </div>
                  ))
                ) : (
                  <div className="dayClasses__info-item-title"></div>
                )}
              </div>
            </section>
          );
        })}
      </article>
    </main>
  );
};

export default DayClasses;
