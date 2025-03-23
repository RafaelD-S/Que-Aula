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
      day: "Seg",
      classes: [],
    },
    {
      day: "Ter",
      classes: [],
    },
    {
      day: "Qua",
      classes: [],
    },
    {
      day: "Qui",
      classes: [],
    },
    {
      day: "Sex",
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

  const setDate = (dia: string) => {
    if (dia === "Domingo" || dia === "Sábado") return false;
    else return true;
  };

  return (
    <main className="calendar">
      <h2 className="calendar__title">Todas as Aulas</h2>
      <article className="calendar__container">
        <div className="calendar__schedule">
          {Array.from({ length: 6 }, (_, i) => (
            <div className="calendar__schedule__item">
              <h3 key={i}>{definePeriod(i)}</h3>
              <h3 key={i}>{definePeriod(i + 1)}</h3>
            </div>
          ))}
        </div>
      </article>
    </main>
  );
};

export default Calendar;
