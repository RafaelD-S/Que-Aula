import "./flowchart.style.scss";
import flowchartImage from "../../assets/flowchart.png";

const Flowchart = () => {
  return (
    <main className="flowchart">
      <div>
        <h2 className="flowchart__title">Fluxograma</h2>
        <article className="flowchart__content">
          <img
            className="flowchart__image"
            src={flowchartImage}
            alt="Fluxograma do Curso de Análise e Desenvolvimento de Sistemas - IFBA"
          />
        </article>
      </div>
    </main>
  );
};

export default Flowchart;
