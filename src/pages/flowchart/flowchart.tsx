import "./flowchart.style.scss";
import Data from "../../data/flowchart.json";
import ClassItem from "../../components/classItem/classItem";
import { IClassItem } from "../../components/classItem/classItem.Interface";

/*
  Data[
  [
  {
    name: String //INF028
    description: String //Algoritmos e Lógica de Programação
    semester: Number //1
    line: Number //1
    prerequisites: [String] //INF027
    state: Number //0 = Disabled, 1 = Default, 2 = Selected
  },
  {
    name: String //INF028
    description: String //Algoritmos e Lógica de Programação
    semester: Number //1
    line: Number //1
    prerequisites: [String] //INF027
    state: Number //0 = Disabled, 1 = Default, 2 = Selected
  }
  ],
  [
    {
      name: String //INF028
      description: String //Algoritmos e Lógica de Programação
      semester: Number //1
      line: Number //1
      prerequisites: [String] //INF027
      state: Number //0 = Disabled, 1 = Default, 2 = Selected
    },
    {
      name: String //INF028
      description: String //Algoritmos e Lógica de Programação
      semester: Number //1
      line: Number //1
      prerequisites: [String] //INF027
      state: Number //0 = Disabled, 1 = Default, 2 = Selected
    }
  ]
]

  UserCache
  {
    name: String //INF028
    state: Number //0 = Default, 1 = Disabled, 2 = Selected
  }
*/

const classData: IClassItem[][] = Data.map((semester) =>
  semester.map((item) => ({
    name: item.name,
    description: item.description,
    prerequisites: item.prerequisites,
    credit: item.credit,
    state: item.state,
  }))
);

const Flowchart = () => {
  return (
    <main className="flowchart">
      <div>
        <h2 className="flowchart__title">Fluxograma</h2>
        <article className="flowchart__container">
          {classData.map((semester, index) => (
            <div key={index} className="flowchart__semester">
              <h3 className="flowchart__semester-title">
                {index + 1}º Semestre
              </h3>
              <div className="flowchart__semester-content">
                {semester.map((item, line) => (
                  <ClassItem key={`${index}-${line}`} data={item} />
                ))}
              </div>
            </div>
          ))}
        </article>
      </div>
    </main>
  );
};

export default Flowchart;
