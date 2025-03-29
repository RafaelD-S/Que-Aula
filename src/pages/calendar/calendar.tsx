import "./calendar.style.scss";
import Download from "../../assets/download.svg";
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

  const checkDate = (dia: string) => dia !== "Domingo" && dia !== "Sábado";

  const sortByPeriod = (dayClasses: any[]) => {
    return dayClasses.sort(
      (class1, class2) => Number(class1.period[0]) - Number(class2.period[0])
    );
  };

  const organizeClass = (classes: any[]) => {
    const organizedSchedule: any[][] = Array(6)
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
      backgroundColor: "#080e13",
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

      ctx.fillStyle = "#080e13";
      ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

      ctx.drawImage(canvas, padding, padding);

      const link = document.createElement("a");
      link.href = newCanvas.toDataURL("image/png");
      link.download = "que-aula-calendario.png";
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
                        {classInfo.length > 2 && (
                          <h5
                            className={`calendar__class__info-item-description`}
                          >
                            {`... mais ${classInfo.length - 2}`}
                          </h5>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
      </article>
      <button className="calendar__button" onClick={saveImage}>
        Salvar imagem do calendário
        <img src={Download} alt="download icon" />
      </button>
    </main>
  );
};

export default Calendar;
