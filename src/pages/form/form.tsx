import { Fragment, useEffect, useState } from "react";
import "./form.style.scss";
import { IClassesData } from "../../types/dataClasses.interface";
import { version } from "../../../package.json";
import { useClasses } from "../../hooks/useClasses";
import { ClassTag } from "./views/classTag";
import { classNames } from "../../utils/functions/classNames";
import Warning from "../../components/warning/warning";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/modal/modal";

import PreviewIcon from "../../assets/preview.svg";
import { Preview } from "../../components/preview/preview";
import { useAppContext } from "../../context/AppContext";
import { IClasses } from "../../context/appContext.interface";
import { storedClassesMock } from "../../context/mocks/storedClasses";

const Form = () => {
  const { classes: apiClasses, loading, error } = useClasses();
  const [classesData, setClassesData] = useState<IClassesData[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<IClasses[]>([]);
  const [hasSelected, setHasSelected] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDataState, setPreviewDataState] = useState(storedClassesMock);
  const navigate = useNavigate();
  const { setClasses } = useAppContext();

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
    ["form__submit"]: true,
    "form__submit--active": hasSelected,
  });

  const selectClass = (e: React.MouseEvent<HTMLElement>, item: IClassesData) => {
    const clickedText = e.currentTarget.innerText;
    const whichClass = clickedText.slice(clickedText.lastIndexOf(" ")).trim();
    const newClasses = classesData.map((data) => {
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
    });

    setClassesData(newClasses);
  };

  const submitCalendar = () => {
    setClasses(selectedClasses);
    localStorage.setItem("chosenClasses", JSON.stringify(selectedClasses));
    localStorage.setItem("version", version);
    navigate("/");
  };

  const handleClickPreview = () => {
    setIsPreviewOpen(true);
    const previewData = storedClassesMock.map((item, index) => ({
      ...item,
      classes: selectedClasses
        .flatMap((classData) =>
          classData.classes.map((classItem) => ({
            ...classItem,
          }))
        )
        .filter((f) => f.selected && +f.weekDay === index),
    }));

    setPreviewDataState(previewData);
  };

  useEffect(() => {
    setHasSelected(classesData.some((e) => e.classes.some((f) => f.selected)));
    const selecionados = classesData.filter((e) => e.classes.some((f) => f.selected));

    const updatedSelecionados = selecionados.map((e) => ({
      ...e,
      classes: e.classes.map((item) => ({
        ...item,
        className: e.name,
        classDescription: e.description,
      })),
    }));

    setSelectedClasses(updatedSelecionados as any);
  }, [classesData, setHasSelected]);

  useEffect(() => {
    if (apiClasses.length > 0 && classesData.length < 1) {
      const initializedData = apiClasses.map((e) => ({
        ...e,
        classes: e.classes.map((item) => ({ ...item, selected: false })),
      }));
      setClassesData(initializedData);
    }
  }, [apiClasses]);

  return (
    <Modal>
      <div className="form">
        <div className="form__introduction">
          <h2 className="form__introduction__title">
            Bem vindo ao <span className="form__introduction__title__accent">Que Aula?</span>
          </h2>
          <p className="form__introduction__paragraph">
            Um site desenvolvido por estudantes, para estudantes! Lhe informando suas aulas
            atualizadas diariamente, um calendário relativo a sua rotina, um fluxograma editável, e
            muito mais!
          </p>
          <h4 className="form__warning">Aulas e locais para 2025.2 atualizados!</h4>
        </div>
        <div className="form__classes">
          <h3 className="form__classes__title">Escolha as suas matérias</h3>

          {(loading || error) &&
            semestres.map((item, index) => (
              <Fragment key={index}>
                <h4 className="form__classes__subtitle">{item}</h4>
                <div className="form__classes__container">
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
                <h4 className="form__classes__subtitle">{item}</h4>
                <div className="form__classes__container">
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

        <Preview
          isOpen={isPreviewOpen}
          classesData={previewDataState}
          onOverlayClick={() => setIsPreviewOpen(false)}
          onButtonClick={() => setIsPreviewOpen(false)}
        />

        <div className={submitButtonClasses}>
          <button
            className="form__submit__button form__submit__preview"
            onClick={handleClickPreview}
          >
            <span>Preview</span> <img src={PreviewIcon} alt="" />
          </button>
          <button className="form__submit__button form__submit__generate" onClick={submitCalendar}>
            Gerar Calendario
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Form;
