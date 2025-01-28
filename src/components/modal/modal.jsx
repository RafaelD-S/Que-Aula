import { Fragment, useEffect } from "react";
import "./modalStyle.scss";
import Data from "../../data/classes.json";

const Modal = ({ isModalOpen }) => {
  const classesData = Data;

  useEffect(() => {
    classesData.forEach((e) => {
      e.classes.forEach((item) => {
        item.selected = false;
      });
    });
  }, []);

  const selectClass = (e, item) => {
    e.target.classList.toggle("class-tags--selected");

    if (!item.multiClass) {
      item.classes.forEach((element) => {
        element.selected = !element.selected;
      });
    } else {
      const whichClass = e.target.innerText.slice(e.target.innerText.lastIndexOf(" ")).trim();

      item.classes.forEach((element) => {
        element.whichClass == whichClass ? (element.selected = !element.selected) : "";
      });
    }
  };

  const submitCalendar = () => {
    const selecionados = [];
    classesData.forEach((e) => {
      e.classes.forEach((f) => {
        f.selected && !selecionados.includes(e) && selecionados.push(e);
      });
    });
    selecionados.forEach((e) => {
      e.classes.forEach((item) => {
        item.className = e.name;
        item.classDescription = e.description;
      });
    });
    localStorage.setItem("chosenClasses", JSON.stringify(selecionados));
    location.reload();
  };

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
    <>
      <div className={`modal modal--${isModalOpen ? "open" : "closed"}`}>
        <div className="modal__container">
          <div>
            <h2>
              Bem vindo ao <span className="modal-title">Que Aula?</span>
            </h2>
            <p>
              Um site desenvolvido para ajudar com a bagunça que são as aulas do IFBA. Lhe
              informando suas aulas atualizadas diariamente e um calendário relativo a sua rotina.
            </p>
            <h4 className="modal__warning">
              Todas as aulas já disponíveis! Caso ache algo, por favor deixe seu Feedback.
            </h4>
          </div>
          <div>
            <h3>Escolha as suas matérias</h3>
            {semestres.map((e, i) => (
              <Fragment key={i}>
                <h4>{e}</h4>
                <div className="class-tags-container">
                  {classesData
                    .filter((e) => +e.semester === i)
                    .map((item) =>
                      !item.multiClass ? (
                        <div
                          className="class-tags"
                          onClick={(e) => selectClass(e, item)}
                          key={item.description}
                        >
                          {item.name}
                        </div>
                      ) : (
                        item.classList.map((classInfo) => (
                          <div
                            className="class-tags"
                            onClick={(e) => selectClass(e, item)}
                            key={classInfo}
                          >
                            {item.name} {classInfo}
                          </div>
                        ))
                      )
                    )}
                </div>
              </Fragment>
            ))}
          </div>
          <button className="generate-calendar" onClick={() => submitCalendar()}>
            Gerar Calendario
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
