import { Fragment, useEffect, useState } from "react";
import "./modalStyle.scss";
import Data from "../../data/classes.json";
import { IModal } from "./modal.Interface";
import { IClassesData } from "../../types/dataClasses.interface";

const Modal = ({ isModalOpen }: IModal) => {
  const [classesData, setClassesData] = useState<IClassesData[]>(Data);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    const initializedData = classesData.map((e) => ({
      ...e,
      classes: e.classes.map((item) => ({ ...item, selected: false })),
    }));
    setClassesData(initializedData);
  }, []);

  const selectClass = (e: React.MouseEvent<HTMLElement>, item: IClassesData) => {
    const clickedText = e.currentTarget.innerText;
    const whichClass = clickedText.slice(clickedText.lastIndexOf(" ")).trim();

    setClassesData((prevData) =>
      prevData.map((data) => {
        if (data.name === item.name) {
          return {
            ...data,
            classes: data.classes.map((classData) => {
              const isClickedClass = classData.whichClass === whichClass;

              if (!item.multiClass || isClickedClass) {
                return { ...classData, selected: !classData.selected };
              }

              return classData;
            }),
          };
        }
        return data;
      })
    );
  };

  const submitCalendar = () => {
    const selecionados = classesData.filter((e) => e.classes.some((f) => f.selected));

    const updatedSelecionados = selecionados.map((e) => ({
      ...e,
      classes: e.classes.map((item) => ({
        ...item,
        className: e.name,
        classDescription: e.description,
      })),
    }));

    localStorage.setItem("chosenClasses", JSON.stringify(updatedSelecionados));
    location.reload();
  };

  useEffect(() => {
    setHasSelected(classesData.some((e) => e.classes.some((f) => f.selected)));
  }, [classesData, setHasSelected]);

  const semestres = [
    "Optativas",
    "1º Semestre",
    "2º Semestre",
    "3º Semestre",
    "4º Semestre",
    "5º Semestre",
    "6º Semestre",
  ];

  return (
    <div className={`modal modal--${isModalOpen ? "open" : "closed"}`}>
      <div className="modal__container">
        <div className="modal__introduction">
          <h2 className="modal__introduction__title">
            Bem vindo ao <span className="modal__introduction__title__accent">Que Aula?</span>
          </h2>
          <p className="modal__introduction__paragraph">
            Um site desenvolvido para ajudar com a bagunça que são as aulas do IFBA. Lhe informando
            suas aulas atualizadas diariamente e um calendário relativo a sua rotina.
          </p>
          <h4 className="modal__warning">
            Passando por atualizações. Talvez seu calendário seja resetado.
          </h4>
        </div>
        <div className="modal__classes">
          <h3 className="modal__classes__title">Escolha as suas matérias</h3>
          {semestres.map((item, i) => (
            <Fragment key={i}>
              <h4 className="modal__classes__subtitle">{item}</h4>
              <div className="modal__classes__container">
                {classesData
                  .filter((filter) => +filter.semester === i)
                  .map((classData) =>
                    !classData.multiClass ? (
                      <div
                        className={`modal__classes__tag ${
                          classData.classes.some((cls) => cls.selected)
                            ? "modal__classes__tag--selected"
                            : ""
                        }`}
                        onClick={(e) => selectClass(e, classData)}
                        key={classData.description}
                      >
                        {classData.name}
                      </div>
                    ) : (
                      classData.classList &&
                      classData.classList.map((classInfo) => (
                        <div
                          className={`modal__classes__tag ${
                            classData.classes.find(
                              (cls) => cls.whichClass === classInfo && cls.selected
                            )
                              ? "modal__classes__tag--selected"
                              : ""
                          }`}
                          onClick={(e) => selectClass(e, classData)}
                          key={classInfo}
                        >
                          {classData.name} {classInfo}
                        </div>
                      ))
                    )
                  )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <button
        className={`modal__submit ${hasSelected ? "modal__submit--active" : ""}`}
        onClick={() => submitCalendar()}
      >
        Gerar Calendario
      </button>
    </div>
  );
};

export default Modal;
