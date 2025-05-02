import "./flowchart.style.scss";
import flowchartImage from "../../assets/flowchart.png";
import Data from "../../data/flowchart.json";
import ClassItem from "../../components/classItem/classItem";
import { IClassItem } from "../../components/classItem/classItem.Interface";

/*
  Data
  {
    name: String //INF028
    description: String //Algoritmos e Lógica de Programação
    semester: Number //1
    line: Number //1
    prerequisites: [String] //INF027
    state: Number //0 = Disabled, 1 = Default, 2 = Selected
  }

  UserCache
  {
    name: String //INF028
    state: Number //0 = Default, 1 = Disabled, 2 = Selected
  }
*/

const classData: IClassItem[] = Data as IClassItem[];

const Flowchart = () => {
  return (
    <main className="flowchart">
      <div>
        <h2 className="flowchart__title">Fluxograma</h2>
        <article className="flowchart__container">
          {classData.map((item) => (
            <ClassItem key={item.name} data={item} />
          ))}
        </article>
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
