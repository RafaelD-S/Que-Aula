import "./form.style.scss";
import { Modal } from "../../components/modal/modal";
import { ClassesContainer } from "./views/classesContainer/classesContainer";
import { useState } from "react";
import { IClassesDataTag } from "./views/classesContainer/classesContainer.interface";
import { classNames } from "../../utils/functions/classNames";
import { Preview } from "../../components/preview/preview";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";

const Form = () => {
  const navigate = useNavigate();
  const [selectedClasses, setSelectedClasses] = useState<IClassesDataTag[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const semestres = [
    "Optativas",
    "1º Semestre",
    "2º Semestre",
    "3º Semestre",
    "4º Semestre",
    "5º Semestre",
    "6º Semestre",
  ];

  const submitClassNames = classNames({
    form__submit: true,
    "form__submit--active": selectedClasses.length > 0,
  });

  const handleSelectCourse = (item: IClassesDataTag) => {
    setSelectedClasses((prev) => {
      const filtered = prev.filter(
        (selectedItem) =>
          selectedItem.code !== item.code || selectedItem.subjectCode !== item.subjectCode,
      );
      return filtered.length === prev.length ? [...filtered, item] : filtered;
    });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedSections = selectedClasses.map((item) => item);

    localStorage.setItem("SelectedClasses", JSON.stringify(selectedSections));
    navigate("/");
  };

  return (
    <>
      <Modal>
        <form onSubmit={handleSubmitForm}>
          <div className="form">
            <div className="form__introduction">
              <h2 className="form__introduction__title">
                Bem vindo ao <span className="form__introduction__title__accent">Que Aula?</span>
              </h2>
              <p className="form__introduction__paragraph">
                Um site desenvolvido por estudantes, para estudantes! Lhe informando suas aulas
                atualizadas diariamente, um calendário relativo a sua rotina, um fluxograma
                editável, e muito mais!
              </p>
              <h4 className="form__warning">Já atualizado para 2026.2</h4>
            </div>
            <div className="form__classes">
              <h3 className="form__classes__title">Escolha as suas matérias</h3>

              {semestres.map((item, i) => {
                return (
                  <ClassesContainer
                    title={item}
                    semestre={i}
                    key={i}
                    onClickTag={handleSelectCourse}
                  />
                );
              })}
            </div>
          </div>
          <Footer hasEraseCalendar={false} />

          <div className={submitClassNames}>
            <button
              className="form__submit__button form__submit__preview"
              type="button"
              onClick={() => setIsPreviewOpen(true)}
            >
              Preview
            </button>
            <button className="form__submit__button form__submit__generate" type="submit">
              Gerar Calendário
            </button>
          </div>
        </form>
      </Modal>

      <Preview
        isOpen={isPreviewOpen}
        classesData={selectedClasses}
        onButtonClick={() => setIsPreviewOpen(false)}
        onOverlayClick={() => setIsPreviewOpen(false)}
      />
    </>
  );
};

export default Form;
