import { Fragment, useEffect, useState } from "react";
import "./form.style.scss";
import { IClassesData } from "../../types/dataClasses.interface";
import { version } from "../../../package.json";
import { useClasses } from "../../hooks/useClasses";
import { ClassTag } from "./views/classTag";
import { classNames } from "../../utils/functions/classNames";
import Warning from "../../components/warning/warning";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { classes: apiClasses, loading, error } = useClasses();
  const [classesData, setClassesData] = useState<IClassesData[]>([]);
  const [hasSelected, setHasSelected] = useState(false);
  const navigate = useNavigate();

  const semestres = [
    "Optativas",
    "1º Semestre",
    "2º Semestre",
    "3º Semestre",
    "4º Semestre",
    "5º Semestre",
    "6º Semestre",
  ];

  const submitButtonClasses = classNames({
    ["modal__submit"]: true,
    "modal__submit--active": hasSelected,
  });

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
    localStorage.setItem("version", version);
    navigate("/");
  };

  useEffect(() => {
    setHasSelected(classesData.some((e) => e.classes.some((f) => f.selected)));
  }, [classesData, setHasSelected]);

  useEffect(() => {
    if (apiClasses.length > 0) {
      const initializedData = apiClasses.map((e) => ({
        ...e,
        classes: e.classes.map((item) => ({ ...item, selected: false })),
      }));
      setClassesData(initializedData);
    }
  }, [apiClasses]);

  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modal__introduction">
          <h2 className="modal__introduction__title">
            Bem vindo ao <span className="modal__introduction__title__accent">Que Aula?</span>
          </h2>
          <p className="modal__introduction__paragraph">
            Um site desenvolvido para ajudar com a bagunça que são as aulas do IFBA. Lhe informando
            suas aulas atualizadas diariamente e um calendário relativo a sua rotina.
          </p>
          <h4 className="modal__warning">Horários e salas de aulas para 2025.1 atualizados!</h4>
        </div>
        <div className="modal__classes">
          <h3 className="modal__classes__title">Escolha as suas matérias</h3>

          {(loading || error) &&
            semestres.map((item, index) => (
              <Fragment key={index}>
                <h4 className="modal__classes__subtitle">{item}</h4>
                <div className="modal__classes__container">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <ClassTag key={i} loading />
                  ))}
                </div>
              </Fragment>
            ))}

          {error && (
            <Warning
              message="Ocorreu um erro no carregamento das aulas."
              opened
              isClosable={false}
              buttonLabel="Tentar Novamente"
              onClickButton={() => location.reload()}
            />
          )}

          {!loading && classesData.length === 0 && !error && (
            <Warning
              message="Não há matérias disponíveis no momento. Tente novamente mais tarde."
              opened
              isClosable={false}
              type="info"
              buttonLabel="OK"
              onClickButton={() => location.reload()}
            />
          )}

          {!loading &&
            classesData.length > 0 &&
            semestres.map((item, i) => (
              <Fragment key={i}>
                <h4 className="modal__classes__subtitle">{item}</h4>
                <div className="modal__classes__container">
                  {classesData
                    .filter((filter) => +filter.semester === i)
                    .map((classData, index) =>
                      !classData.multiClass ? (
                        <ClassTag
                          title={classData.name}
                          key={index}
                          selected={classData.classes.some((cls) => cls.selected)}
                          onClick={(e) => selectClass(e, classData)}
                        />
                      ) : (
                        classData.classList &&
                        classData.classList.map((classInfo) => (
                          <ClassTag
                            title={`${classData.name} ${classInfo}`}
                            key={classInfo}
                            selected={classData.classes.some(
                              (cls) => cls.whichClass === classInfo && cls.selected
                            )}
                            onClick={(e) => selectClass(e, classData)}
                          />
                        ))
                      )
                    )}
                </div>
              </Fragment>
            ))}
        </div>
      </div>

      <button className={submitButtonClasses} onClick={() => submitCalendar()}>
        Gerar Calendario
      </button>
    </div>
  );
};

export default Form;
