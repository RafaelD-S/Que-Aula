import { useEffect, useState } from "react";
import "./dayClassesStyle.scss";

export default function dayClasses({ currentWeekday }) {
  const [selectedClasses, setSelectedClasses] = useState();
  const [classes, setClasses] = useState([
    {
      day: "Domingo",
      classes: {
        firstClass: [],
        secClass: [],
        thirdClass: [],
      },
    },
    {
      day: "Segunda-Feira",
      classes: {
        firstClass: [],
        secClass: [],
        thirdClass: [],
      },
    },
    {
      day: "Terça-Feira",
      classes: {
        firstClass: [],
        secClass: [],
        thirdClass: [],
      },
    },
    {
      day: "Quarta-Feira",
      classes: {
        firstClass: [],
        secClass: [],
        thirdClass: [],
      },
    },
    {
      day: "Quinta-Feira",
      classes: {
        firstClass: [],
        secClass: [],
        thirdClass: [],
      },
    },
    {
      day: "Sexta-Feira",
      classes: {
        firstClass: [],
        secClass: [],
        thirdClass: [],
      },
    },
    {
      day: "Sábado",
      classes: {
        firstClass: [],
        secClass: [],
        thirdClass: [],
      },
    },
  ]);

  useEffect(() => {
    const storedClasses = JSON.parse(
      localStorage.getItem("chosenClasses") || "[]"
    );
    const selecionados = [];
    storedClasses.forEach((e) => {
      e.classes.forEach((f) => {
        f.selected && !selecionados.includes(e) && selecionados.push(f);
      });
    });

    setSelectedClasses(selecionados);
    setClasses([
      {
        day: "Domingo",
        classes: {
          firstClass: selecionados.filter(
            (f) => f.weekDay == 0 && f.period == 0
          ),
          secClass: selecionados.filter((f) => f.weekDay == 0 && f.period == 1),
          thirdClass: selecionados.filter(
            (f) => f.weekDay == 0 && f.period == 2
          ),
        },
      },
      {
        day: "Segunda-Feira",
        classes: {
          firstClass: selecionados.filter(
            (f) => f.weekDay == 1 && f.period == 0
          ),
          secClass: selecionados.filter((f) => f.weekDay == 1 && f.period == 1),
          thirdClass: selecionados.filter(
            (f) => f.weekDay == 1 && f.period == 2
          ),
        },
      },
      {
        day: "Terça-Feira",
        classes: {
          firstClass: selecionados.filter(
            (f) => f.weekDay == 2 && f.period == 0
          ),
          secClass: selecionados.filter((f) => f.weekDay == 2 && f.period == 1),
          thirdClass: selecionados.filter(
            (f) => f.weekDay == 2 && f.period == 2
          ),
        },
      },
      {
        day: "Quarta-Feira",
        classes: {
          firstClass: selecionados.filter(
            (f) => f.weekDay == 3 && f.period == 0
          ),
          secClass: selecionados.filter((f) => f.weekDay == 3 && f.period == 1),
          thirdClass: selecionados.filter(
            (f) => f.weekDay == 3 && f.period == 2
          ),
        },
      },
      {
        day: "Quinta-Feira",
        classes: {
          firstClass: selecionados.filter(
            (f) => f.weekDay == 4 && f.period == 0
          ),
          secClass: selecionados.filter((f) => f.weekDay == 4 && f.period == 1),
          thirdClass: selecionados.filter(
            (f) => f.weekDay == 4 && f.period == 2
          ),
        },
      },
      {
        day: "Sexta-Feira",
        classes: {
          firstClass: selecionados.filter(
            (f) => f.weekDay == 5 && f.period == 0
          ),
          secClass: selecionados.filter((f) => f.weekDay == 5 && f.period == 1),
          thirdClass: selecionados.filter(
            (f) => f.weekDay == 5 && f.period == 2
          ),
        },
      },
      {
        day: "Sábado",
        classes: {
          firstClass: selecionados.filter(
            (f) => f.weekDay == 6 && f.period == 0
          ),
          secClass: selecionados.filter((f) => f.weekDay == 6 && f.period == 1),
          thirdClass: selecionados.filter(
            (f) => f.weekDay == 6 && f.period == 2
          ),
        },
      },
    ]);
  }, []);

  return (
    <main className="dayClasses">
      <h2 className="dayClasses__title">{classes[currentWeekday].day}</h2>
      <article className="dayClasses__container">
        <section className="dayClasses__item">
          <div className={`dayClasses__schedule`}>
            <h3 className="dayClasses__schedule">17h 18h40</h3>
          </div>
          <div className="dayClasses__info-container">
            {classes[currentWeekday].classes.firstClass.map((e, index) => (
              <div key={index} className="dayClasses__info-item">
                <h4 className="dayClasses__info-item-title">
                  {e.className} <span>{e.whichClass}</span> - {e.teacher}
                </h4>
                <h4 className="dayClasses__info-item-classroom">
                  {e.classroom}
                </h4>
                <h5 className="dayClasses__info-item-description">
                  {e.classDescription}
                </h5>
              </div>
            ))}
          </div>
        </section>
        <section className="dayClasses__item">
          <div className={`dayClasses__schedule`}>
            <h3 className="dayClasses__schedule">18h40 20h20</h3>
          </div>
          <div className="dayClasses__info-container">
            {classes[currentWeekday].classes.secClass.map((e, index) => (
              <div key={index} className="dayClasses__info-item">
                <h4 className="dayClasses__info-item-title">
                  {e.className} <span>{e.whichClass}</span> - {e.teacher}
                </h4>
                <h4 className="dayClasses__info-item-classroom">
                  {e.classroom}
                </h4>
                <h5 className="dayClasses__info-item-description">
                  {e.classDescription}
                </h5>
              </div>
            ))}
          </div>
        </section>
        <section className="dayClasses__item">
          <div className={`dayClasses__schedule`}>
            <h3 className="dayClasses__schedule">20h20 22h</h3>
          </div>
          <div className="dayClasses__info-container">
            {classes[currentWeekday].classes.thirdClass.map((e, index) => (
              <div key={index} className="dayClasses__info-item">
                <h4 className="dayClasses__info-item-title">
                  {e.className} <span>{e.whichClass}</span> - {e.teacher}
                </h4>
                <h4 className="dayClasses__info-item-classroom">
                  {e.classroom}
                </h4>
                <h5 className="dayClasses__info-item-description">
                  {e.classDescription}
                </h5>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
