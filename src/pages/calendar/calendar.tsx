import "./calendar.style.scss";
import { useEffect, useState, useRef } from "react";
import { IClasses } from "./calendar.interface";
import { IClassesData } from "../../types/dataClasses.interface";
import html2canvas from "html2canvas";

const Calendar = () => {
  const calendarRef = useRef(null);
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

    setClasses((prev) =>
      prev.map((item, index) => ({
        ...item,
        classes: storedClasses
          .flatMap((classData) =>
            classData.classes.map((classItem) => ({
              ...classItem,
              greve: classData.greve,
            }))
          )
          .filter((f) => f.selected && +f.weekDay === index),
      }))
    );
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
    let organizedSchedule: any[][] = Array(6)
      .fill(null)
      .map(() => []);

    classes.forEach((classInfo) => {
      const startPeriod = +classInfo.period[0];
      const endPeriod = +classInfo.period[classInfo.period.length - 1];

      for (let i = startPeriod; i <= endPeriod; i++) {
        organizedSchedule[i].push(classInfo);
      }
    });

    return organizedSchedule;
  };

  const saveImage = () => {
    if (!calendarRef.current) return;

    html2canvas(calendarRef.current, {
      backgroundColor: "#0a1927",
      useCORS: true,
      scale: 2,
      windowWidth: 400,
    }).then((canvas) => {
      const padding = 20;

      const newCanvas = document.createElement("canvas");
      const ctx = newCanvas.getContext("2d");

      if (!ctx) {
        console.error("Erro ao obter contexto do canvas.");
        return;
      }

      newCanvas.width = canvas.width + 2 * padding;
      newCanvas.height = canvas.height + 2 * padding;

      ctx.fillStyle = "#0a1927";
      ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

      ctx.drawImage(canvas, padding, padding);

      const link = document.createElement("a");
      link.href = newCanvas.toDataURL("image/png");
      link.download = "calendario.png";
      link.click();
    });
  };

  return (
    <main className="calendar">
      <h2 className="calendar__title">Todas as Aulas</h2>
      <article ref={calendarRef} className="calendar__container">
        <div className="calendar__schedule">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <h3 className="calendar__schedule-period">{definePeriod(i)}</h3>
              <h3 className="calendar__schedule-period">
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
                    {classInfo.length === 0 && (
                      <div key={index} className="calendar__class__info-item">
                        <h3 className="calendar__class__info-item--empty">
                          Vazio
                        </h3>
                      </div>
                    )}

                    {classInfo.length === 1 &&
                      classInfo.map((info, subIndex) => (
                        <div
                          key={subIndex}
                          className={`calendar__class__info-item calendar__class__info-item${
                            info.greve ? "--greve" : ""
                          }`}
                        >
                          <h3 className="calendar__class__info-item-title">
                            {info.className}
                          </h3>
                          <h5 className="calendar__class__info-item-description">
                            {info.greve ? "GREVE" : info.classroom || "-----"}
                          </h5>
                        </div>
                      ))}

                    {classInfo.length >= 2 && (
                      <div
                        key={index}
                        className={`calendar__class__info-item calendar__class__info-item--full`}
                      >
                        <h3 className={`calendar__class__info-item-title`}>
                          {classInfo[0].className}
                        </h3>
                        <h3 className={`calendar__class__info-item-title`}>
                          {classInfo[1].className}
                        </h3>
                        <h5
                          className={`calendar__class__info-item-description`}
                        >
                          {`... mais ${classInfo.length}`}
                        </h5>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
      </article>
      <button className="calendar__button" onClick={saveImage}>
        Salvar imagem do calendário
        <svg
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.46954 6.49851C1.46954 3.6693 1.46954 2.2547 2.34823 1.37579C3.09272 0.631093 4.22167 0.517369 6.26954 0.5M13.4695 6.49851C13.4695 3.6693 13.4695 2.2547 12.5908 1.37579C11.8464 0.631093 10.7174 0.517369 8.66954 0.5"
            stroke="#C6F3F5"
            stroke-linecap="round"
          />
          <path
            d="M6.26954 12.5C4.58939 12.5 3.74931 12.5 3.10757 12.173C2.54309 11.8853 2.08414 11.4262 1.79653 10.8616C1.46954 10.2197 1.46954 9.37938 1.46954 7.69875C1.46954 6.01812 1.46954 5.17784 1.79653 4.53593C2.08414 3.97129 2.54309 3.51222 3.10757 3.22453C3.74931 2.89746 4.58939 2.89746 6.26954 2.89746H8.66954C10.3497 2.89746 11.1898 2.89746 11.8315 3.22453C12.396 3.51222 12.855 3.97129 13.1425 4.53593C13.4695 5.17784 13.4695 6.01812 13.4695 7.69875C13.4695 9.37938 13.4695 10.2197 13.1425 10.8616C12.855 11.4262 12.396 11.8853 11.8315 12.173C11.1898 12.5 10.3497 12.5 8.66954 12.5"
            stroke="#C6F3F5"
            stroke-linecap="round"
          />
          <path
            d="M7.46954 5.89819V9.49916M7.46954 9.49916L8.96954 7.99876M7.46954 9.49916L5.96954 7.99876"
            stroke="#C6F3F5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </main>
  );
};

export default Calendar;
