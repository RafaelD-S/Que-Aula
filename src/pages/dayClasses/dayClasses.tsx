import { useEffect, useState } from "react";
import "./dayClasses.style.scss";
import { IClasses, IDayClasses, ISectionArray } from "./dayClasses.interface";
import { IClassesData } from "../../types/dataClasses.interface";

const DayClasses = ({ currentWeekday }: IDayClasses) => {
  const [sections, setSections] = useState<ISectionArray[][]>([]);
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
    const storedClasses: IClassesData[] = JSON.parse(localStorage.getItem("chosenClasses") || "[]");
    const specificClasses = storedClasses.flatMap((item) => item.classes).filter((f) => f.selected);

    setClasses((prev) =>
      prev.map((item, index) => {
        return {
          ...item,
          classes: specificClasses.filter((f) => +f.weekDay === index),
        };
      })
    );
  }, []);

  useEffect(() => {
    const updatedSections = classes[currentWeekday].classes.map((item) => ({
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

    setSections(uniqueArray);
  }, [classes, currentWeekday]);

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
    <main className="dayClasses">
      <h2 className="dayClasses__title">{classes[currentWeekday].day}</h2>
      <article className="dayClasses__container">
        {sections.map((item, i) => (
          <section
            className={`dayClasses__item ${!item[0].data ? "dayClasses__item--empty" : ""}`}
            key={i}
          >
            <div className={`dayClasses__schedule`}>
              <h3 className="dayClasses__schedule">
                {definePeriod(+item[0].start)} {definePeriod(+item[0].end + 1)}
              </h3>
            </div>
            <div className="dayClasses__info-container">
              {item.map((info, index: number) =>
                info.data ? (
                  <div key={index} className="dayClasses__info-item">
                    <h4 className="dayClasses__info-item-title">
                      {info.data.className}
                      <span className="dayClasses__info-item-class">
                        {" "}
                        {info.data.whichClass}{" "}
                      </span>- {info.data.teacher}
                    </h4>
                    <h4 className="dayClasses__info-item-classroom">{info.data.classroom}</h4>
                    <h5 className="dayClasses__info-item-description">
                      {info.data.classDescription}
                    </h5>
                  </div>
                ) : (
                  <div className="dayClasses__info-item-title" key={index}></div>
                )
              )}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
};

export default DayClasses;
