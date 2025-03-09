import { useEffect, useState } from "react";
import "./dayClassesStyle.scss";
import { IClasses, IDayClasses } from "./dayClassesInterface";
import { IClassesData } from "../../types/dataClasses.interface";

const DayClasses = ({ currentWeekday }: IDayClasses) => {
  const classesTemplate = { firstClass: [], secClass: [], thirdClass: [] };
  const [classes, setClasses] = useState<IClasses[]>([
    {
      day: "Domingo",
      classes: classesTemplate,
    },
    {
      day: "Segunda-Feira",
      classes: classesTemplate,
    },
    {
      day: "Terça-Feira",
      classes: classesTemplate,
    },
    {
      day: "Quarta-Feira",
      classes: classesTemplate,
    },
    {
      day: "Quinta-Feira",
      classes: classesTemplate,
    },
    {
      day: "Sexta-Feira",
      classes: classesTemplate,
    },
    {
      day: "Sábado",
      classes: classesTemplate,
    },
  ]);

  useEffect(() => {
    const storedClasses: IClassesData[] = JSON.parse(localStorage.getItem("chosenClasses") || "[]");
    const specificClasses = storedClasses.flatMap((item) => item.classes).filter((f) => f.selected);

    setClasses((prev) =>
      prev.map((item, index) => {
        return {
          ...item,
          classes: {
            firstClass: specificClasses.filter((f) => +f.weekDay === index && +f.period === 0),
            secClass: specificClasses.filter((f) => +f.weekDay === index && +f.period === 1),
            thirdClass: specificClasses.filter((f) => +f.weekDay === index && +f.period === 2),
          },
        };
      })
    );
  }, []);

  const blocks = [
    {
      time: "17h 18h40",
      data: classes[currentWeekday].classes.firstClass,
    },
    {
      time: "18h40 20h20",
      data: classes[currentWeekday].classes.secClass,
    },
    {
      time: "20h20 22h",
      data: classes[currentWeekday].classes.thirdClass,
    },
  ];

  return (
    <main className="dayClasses">
      <h2 className="dayClasses__title">{classes[currentWeekday].day}</h2>
      <article className="dayClasses__container">
        {blocks.map((item, i) => (
          <section className="dayClasses__item" key={i}>
            <div className={`dayClasses__schedule`}>
              <h3 className="dayClasses__schedule">{item.time}</h3>
            </div>
            <div className="dayClasses__info-container">
              {item.data.map((info, index) => (
                <div key={index} className="dayClasses__info-item">
                  <h4 className="dayClasses__info-item-title">
                    {info.className}
                    <span className="dayClasses__info-item-class"> {info.whichClass} </span>-{" "}
                    {info.teacher}
                  </h4>
                  <h4 className="dayClasses__info-item-classroom">{info.classroom}</h4>
                  <h5 className="dayClasses__info-item-description">{info.classDescription}</h5>
                </div>
              ))}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
};

export default DayClasses;
