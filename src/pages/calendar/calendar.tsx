import "./calendar.style.scss";
import { useEffect, useState } from "react";
import { IClasses, ISectionArray } from "./calendar.interface";
import { IClassesData } from "../../types/dataClasses.interface";

const Calendar = () => {
  const [day, setDay] = useState<ISectionArray[][]>([]);
  const [classes, setClasses] = useState<IClasses[]>([
    {
      day: "Domingo",
      classes: [],
    },
    {
      day: "Segunda-Feira",
      classes: [],
    },
    {
      day: "Terça-Feira",
      classes: [],
    },
    {
      day: "Quarta-Feira",
      classes: [],
    },
    {
      day: "Quinta-Feira",
      classes: [],
    },
    {
      day: "Sexta-Feira",
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

    // console.log(classes);
  }, []);

  useEffect(() => {
    classes.forEach((day) => {
      const updatedSections = day.classes.map((item) => ({
        start: item.period[0],
        end: item.period[item.period.length - 1],
        data: item,
      }));

      const newArray: ISectionArray[][] = Array(6).fill(null);

      updatedSections.forEach((e) => {
        for (let i = +e.start; i <= +e.end; i++) {
          newArray[i] = newArray[i] ? [...newArray[i], e] : [e];
        }
      });

      let i = 0;
      while (i < newArray.length) {
        if (newArray[i] === null) {
          const start = i;
          let end = i;

          while (end < newArray.length && newArray[end] === null) {
            end++;
          }

          const emptySection = [
            {
              start: start,
              end: end - 1,
              data: null,
            },
          ];

          for (let j = start; j < end; j++) {
            newArray[j] = emptySection;
          }

          i = end;
        } else {
          i++;
        }
      }

      const uniqueArray: ISectionArray[][] = [];
      const seen = new Set();

      newArray.forEach((item) => {
        const key = `${item[0].start}-${item[0].end}-${item[0].data}`;

        if (!seen.has(key)) {
          seen.add(key);
          uniqueArray.push(item);
        }
      });

      setDay(uniqueArray);

      // console.log(day);
    });
  }, [classes]);

  // const definePeriod = (num: number) => {
  //   switch (num) {
  //     case 0:
  //       return "17h";
  //     case 1:
  //       return "17h50";
  //     case 2:
  //       return "18h40";
  //     case 3:
  //       return "19h30";
  //     case 4:
  //       return "20h20";
  //     case 5:
  //       return "21h10";
  //     case 6:
  //       return "22h";
  //   }
  // };

  return <main className="calendar">Hello World!</main>;
};

export default Calendar;
