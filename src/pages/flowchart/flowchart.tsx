import "./flowchart.style.scss";
import Data from "../../data/flowchart.json";
import ClassItem from "../../components/classItem/classItem";
import { IClassItem } from "../../components/classItem/classItem.Interface";
import { useCallback, useEffect, useState } from "react";

const deepEqual = (
  a: Array<Array<IClassItem>>,
  b: Array<Array<IClassItem>>
): boolean => JSON.stringify(a) === JSON.stringify(b);

const defaultData: IClassItem[][] = Data.map((semester) =>
  semester.map((item) => ({
    name: item.name,
    description: item.description,
    prerequisites: item.prerequisites || [],
    credit: item.credit,
    state: item.state !== undefined ? item.state : "default",
  }))
);

const Flowchart = () => {
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

  useEffect(() => {
    try {
      const currentStorageData = localStorage.getItem("classData");
      if (
        !currentStorageData ||
        !deepEqual(JSON.parse(currentStorageData), classData)
      ) {
        localStorage.setItem("classData", JSON.stringify(classData));
      }
    } catch (error) {
      console.error("Error saving classData to localStorage:", error);
    }
  }, [classData]);

  const handleClassStateChange = useCallback(
    (itemName: string | undefined, newState: string) => {
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
    },
    []
  );

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
                  <ClassItem
                    key={`${index}-${line}`}
                    data={item}
                    onStateChange={handleClassStateChange}
                  />
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
