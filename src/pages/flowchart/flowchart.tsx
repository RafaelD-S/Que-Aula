import "./flowchart.style.scss";
import Data from "../../data/flowchart.json";
import ClassItem from "../../components/classItem/classItem";
import { IClassItem } from "../../components/classItem/classItem.Interface";
import { useCallback, useEffect, useState } from "react";

const Flowchart = () => {
  const defaultData: IClassItem[][] = Data.map((semester) =>
    semester.map((item) => {
      const { state, credit, requiredFor, description, name, semester } = item;

      if (item.state === "empty") return { state };

      return {
        name,
        description,
        requiredFor,
        credit,
        state,
        semester,
      };
    })
  );

  const [classData, setClassData] = useState<IClassItem[][]>(() => {
    try {
      const storedData = localStorage.getItem("classData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.every(Array.isArray)) {
          return parsedData;
        }
      }
    } catch (error) {
      console.error("Error parsing classData from localStorage:", error);
    }

    return defaultData;
  });

  const deepEqual = (a: Array<Array<IClassItem>>, b: Array<Array<IClassItem>>): boolean =>
    JSON.stringify(a) === JSON.stringify(b);

  const handleClassStateChange = useCallback((itemName: string | undefined, newState: string) => {
    if (!itemName) return;

    setClassData((prevClassData) => {
      const newData = prevClassData.map((semester) => {
        return semester.map((item) => {
          if (item.name === itemName) {
            return { ...item, state: newState };
          }
          return item;
        });
      });

      if (deepEqual(newData, prevClassData)) {
        return prevClassData;
      }
      return newData;
    });
  }, []);

  useEffect(() => {
    try {
      const currentStorageData = localStorage.getItem("classData");
      if (!currentStorageData || !deepEqual(JSON.parse(currentStorageData), classData)) {
        localStorage.setItem("classData", JSON.stringify(classData));
      }
    } catch (error) {
      console.error("Error saving classData to localStorage:", error);
    }
  }, [classData]);

  useEffect(() => {
    const allClases = classData.flatMap((m) => m);

    classData.forEach((item) => {
      item.forEach((e, i) => {
        if (e.requiredFor?.length && e.name) {
          const element = document.querySelector(`.${e.name}`);

          e.requiredFor.forEach((clazz) => {
            allClases.forEach((allClass) => {
              if (clazz === allClass.name && allClass.semester) {
                const tagetIndex = classData[allClass.semester].findIndex(
                  (f) => f.name === allClass.name
                );

                if (e.semester === allClass.semester - 1) {
                  if (i === tagetIndex) {
                    element?.classList.add("class-item__dependency--straight");
                  } else if (i === tagetIndex - 1) {
                    element?.classList.add("class-item__dependency--beside");
                  }
                } else {
                  element?.classList.add("class-item__dependency--straight");

                  for (let j = e.semester! + 1; j < allClass.semester; j++) {
                    const itemState = classData[j][i].state;
                    if (itemState === "empty") classData[j][i].state = "empty-through";
                  }
                }
              }
            });
          });
        }
      });
    });
  }, [classData]);

  return (
    <main className="flowchart">
      <h2 className="flowchart__title">Fluxograma</h2>
      <article className="flowchart__container">
        <div className="flowchart__container__content">
          {classData.map((semester, index) => (
            <div key={index} className="flowchart__semester">
              <h3 className="flowchart__semester-title">{index + 1}º Semestre</h3>
              <div className="flowchart__semester-classes">
                {semester.map((item, line) => (
                  <ClassItem
                    key={`${index}-${line}`}
                    data={item}
                    onStateChange={handleClassStateChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
    </main>
  );
};

export default Flowchart;
