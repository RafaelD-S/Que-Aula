import { forwardRef } from "react";
import { ICalendar, IClassInfo } from "./calendar.interface";

import "./canlendar.style.scss";

export const Calendar = forwardRef<HTMLDivElement, ICalendar>(
  ({ classes, secondaryInfo = "classroom" }, ref) => {
    const checkDate = (dia: string) => dia !== "Domingo" && dia !== "Sábado";

    const handleSecondaryInfo = (info: IClassInfo) => {
      switch (secondaryInfo) {
        case "classroom":
          return info.classroom;
        case "description":
          return info.classDescription;
        case "teacher":
          return info.teacher;
      }
    };

    const sortByPeriod = (dayClasses: IClassInfo[]) => {
      return dayClasses.sort(
        (class1, class2) => Number(class1.period[0]) - Number(class2.period[0])
      );
    };

    const organizeClass = (classes: IClassInfo[]) => {
      const organizedSchedule: IClassInfo[][] = Array(6)
        .fill(null)
        .map(() => []);

      classes.forEach((IClassInfo) => {
        const startPeriod = +IClassInfo.period[0];
        const endPeriod = +IClassInfo.period[IClassInfo.period.length - 1];

        for (let i = startPeriod; i <= endPeriod; i++) {
          organizedSchedule[i].push(IClassInfo);
        }
      });

      return organizedSchedule;
    };

    const definePeriod = (num: number) => {
      switch (num) {
        case 0:
          return "17h";
        case 1:
          return "17h50";
        case 2:
          return "18h40";
        case 3:
          return "19h30";
        case 4:
          return "20h20";
        case 5:
          return "21h10";
        case 6:
          return "22h";
      }
    };

    return (
      <div ref={ref} className="calendar">
        <div className="calendar__container">
          <div className="calendar__period">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i}>
                <h3 className="calendar__period__day">{definePeriod(i)}</h3>
                <h3 className="calendar__period__day">{definePeriod(i + 1)}</h3>
              </div>
            ))}
          </div>

          {classes
            .filter((dayItem) => checkDate(dayItem.day))
            .map((dayItem, id) => (
              <div key={id} className={`calendar__class calendar__class--${dayItem.day}`}>
                <div className="calendar__class__day">
                  <h3 className="calendar__class__day-title">{dayItem.day}</h3>
                </div>

                {sortByPeriod(dayItem.classes) &&
                  organizeClass(dayItem.classes).map((IClassInfo, index) => (
                    <div key={index} className="calendar__class__info">
                      {IClassInfo.length === 0 && (
                        <div key={index} className="calendar__class__info-item">
                          <h3 className="calendar__class__info-item--empty">Vazio</h3>
                        </div>
                      )}

                      {IClassInfo.length === 1 &&
                        IClassInfo.map((info, subIndex) => (
                          <div
                            key={subIndex}
                            className={`calendar__class__info-item calendar__class__info-item${
                              info.greve ? "--greve" : ""
                            }`}
                          >
                            <h3 className="calendar__class__info-item-title">{info.className}</h3>
                            <h5 className="calendar__class__info-item-description">
                              {info.greve ? "GREVE" : handleSecondaryInfo(info) || "-----"}
                            </h5>
                          </div>
                        ))}

                      {IClassInfo.length >= 2 && (
                        <div
                          key={index}
                          className={`calendar__class__info-item calendar__class__info-item--full`}
                        >
                          <h3 className={`calendar__class__info-item-title`}>
                            {IClassInfo[0].className}
                          </h3>
                          <h3 className={`calendar__class__info-item-title`}>
                            {IClassInfo[1].className}
                          </h3>
                          {IClassInfo.length > 2 && (
                            <h5 className={`calendar__class__info-item-description`}>
                              {`... mais ${IClassInfo.length - 2}`}
                            </h5>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    );
  }
);
