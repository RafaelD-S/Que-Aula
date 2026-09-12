import { forwardRef, Fragment, useEffect, useState } from "react";
import { CalendarCourseResponse, ICalendar } from "./calendar.interface";

import "./calendar.style.scss";
import { useAppContext } from "../../context/AppContext";
import { CourseResponse } from "../../api";
import { getPeriodString } from "../../utils/functions/getPeriodString";

export const Calendar = forwardRef<HTMLDivElement, ICalendar>(
  ({ classes, secondaryInfo = "description" }, ref) => {
    const { weekdays } = useAppContext();
    const [grid, setGrid] = useState<CalendarCourseResponse[][][]>(
      Array.from({ length: 7 }, () => Array.from({ length: 6 }, () => [])),
    );

    useEffect(() => {
      const nextGrid: CourseResponse[][][] = Array.from({ length: 7 }, () =>
        Array.from({ length: 6 }, () => []),
      );

      const classesMap = classes.flatMap((item) => {
        return item.courses.map((course) => {
          return { ...course, description: item.description };
        });
      });

      classesMap.forEach((classItem) => {
        const { weekday, periodStart, periodEnd } = classItem;
        if (weekday < 0 || weekday >= nextGrid.length) return;
        for (let period = periodStart; period <= periodEnd; period += 1) {
          nextGrid[weekday]?.[period]?.push(classItem);
        }
      });

      setGrid(nextGrid);
    }, [classes]);

    return (
      <div ref={ref} className="calendar">
        <div className="calendar__body">
          <div className="calendar__period">
            <div className="calendar__period__item calendar__period__item--empty" />
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="calendar__period__item">
                <h3>{getPeriodString(i)}</h3>
                <h3>{getPeriodString(i + 1)}</h3>
              </div>
            ))}
          </div>
          <div className="calendar__grid">
            {grid.map((day, dayIndex) => {
              if (dayIndex === 0 || dayIndex === 6) return null;

              return (
                <div key={dayIndex} className="calendar__grid__column">
                  <h3 className="calendar__grid__column__weekday">
                    {weekdays![dayIndex].slice(0, 3)}
                  </h3>
                  {day.map((period, periodIndex) => (
                    <Fragment key={periodIndex}>
                      {period.length === 1 && (
                        <div key={periodIndex} className="calendar__grid__column__class">
                          <h4 className="calendar__grid__column__class__text">
                            {period[0].subjectCode}
                          </h4>

                          <p className="calendar__grid__column__class__description">
                            {period[0][secondaryInfo]}
                          </p>
                        </div>
                      )}

                      {period.length > 1 && (
                        <div className="calendar__grid__column__class calendar__grid__column__class--error">
                          {period.slice(0, 2).map((item, i) => (
                            <h4 className="calendar__grid__column__class__text--error" key={i}>
                              {item.subjectCode}
                            </h4>
                          ))}

                          {period.length > 2 && (
                            <p className="calendar__grid__column__class__description--error">
                              ...mais {period.length - 2}
                            </p>
                          )}
                        </div>
                      )}

                      {period.length <= 0 && (
                        <div className="calendar__grid__column__class calendar__grid__column__class--empty">
                          <p>Vazio</p>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
