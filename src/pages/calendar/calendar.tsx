import "./calendar.style.scss";
import { useEffect, useState } from "react";
import { IClasses } from "./calendar.interface";
import { IClassesData } from "../../types/dataClasses.interface";

const Calendar = () => {
  const [classes, setClasses] = useState<IClasses[]>([
    {
      day: "Domingo",
      classes: [],
    },
    {
      day: "seg",
      classes: [],
    },
    {
      day: "ter",
      classes: [],
    },
    {
      day: "qua",
      classes: [],
    },
    {
      day: "qui",
      classes: [],
    },
    {
      day: "sex",
      classes: [],
    },
    {
      day: "Sábado",
      classes: [],
    },
  ]);

  useEffect(() => {
    const storedClasses: IClassesData[] = JSON.parse(
      localStorage.getItem("chosenClasses") || "[]"
    );
    const specificClasses = storedClasses
      .flatMap((item) => item.classes)
      .filter((f) => f.selected);

    setClasses((prev) =>
      prev.map((item, index) => {
        return {
          ...item,
          classes: specificClasses.filter((f) => +f.weekDay === index),
        };
      })
    );

    console.log(classes);
  }, []);

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

  const checkDate = (dia: string) => {
    if (dia === "Domingo" || dia === "Sábado") return false;
    else return true;
  };

  const sortByPeriod = (dayClasses: any[]) => {
    return dayClasses.sort(
      (class1, class2) => Number(class1.period[0]) - Number(class2.period[0])
    );
  };

  const organizeClass = (classes: any[]) => {
    let organizedSchedule = Array(6).fill(null);

    classes.forEach((classInfo) => {
      const startPeriod = +classInfo.period[0];
      const endPeriod = +classInfo.period[classInfo.period.length - 1];

      for (let i = startPeriod; i <= endPeriod; i++) {
        organizedSchedule[i] = classInfo;
      }
    });

    return organizedSchedule;
  };

  return (
    <main className="calendar">
      <h2 className="calendar-title">Todas as Aulas</h2>
      <article className="calendar__container">
        <div className="calendar__schedule">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={`calendar__schedule__periods calendar__schedule__periods${i}`}
            >
              <h3 className="calendar__schedule__period">{definePeriod(i)}</h3>
              <h3 className="calendar__schedule__period">
                {definePeriod(i + 1)}
              </h3>
            </div>
          ))}
        </div>

        {classes
          .filter((dayItem) => checkDate(dayItem.day))
          .map((dayItem, id) => (
            <div
              key={id}
              className={`calendar__class calendar__class--${dayItem.day}`}
            >
              <div className="calendar__class__day">
                <h3 className="calendar__class__day-title">{dayItem.day}</h3>
              </div>

              {sortByPeriod(dayItem.classes) &&
                organizeClass(dayItem.classes).map((classInfo, index) => (
                  <div key={index} className="calendar__class__info">
                    {classInfo ? (
                      <>
                        <h3 className="calendar__class__info-title">
                          {classInfo.className}
                        </h3>
                        <h5 className="calendar__class__info-classroom">
                          {classInfo.classroom || "-----"}
                        </h5>
                      </>
                    ) : (
                      <h3 className="calendar__class__info-empty">Vazio</h3>
                    )}
                  </div>
                ))}
            </div>
          ))}
      </article>
    </main>
  );
};

export default Calendar;
