import "./flowchart.style.scss";
import ClassItem from "../../components/classItem/classItem";
import { IClassItem } from "../../components/classItem/classItem.Interface";
import { useCallback, useEffect, useState } from "react";
import { useFlowchart } from "../../hooks/useClasses";
import Warning from "../../components/warning/warning";
import { useNavigate } from "react-router-dom";
import ProgressTracker from "../../components/progressTracker/progressTracker";

const Flowchart = () => {
  const { flowchart: apiData, loading, error } = useFlowchart();
  const navigate = useNavigate();

  const [classesAmount, setClassesAmount] = useState(0);
  const [checkedAmount, setCheckedAmount] = useState(0);

  const checkClassesAmount = () => {
    if (!classData) return;
    const totalClasses = classData.flatMap((item) => {
      const valid = item.filter((e) => {
        return e.state !== "empty" && e.state !== "empty-through";
      });
      return valid;
    }).length;

    const totalChecked = classData.flatMap((item) => {
      const checked = item.filter((e) => {
        return e.state === "disabled";
      });
      return checked;
    }).length;

    setClassesAmount(totalClasses);
    setCheckedAmount(totalChecked);
  };

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

    return [];
  });

  const deepEqual = (
    a: Array<Array<IClassItem>>,
    b: Array<Array<IClassItem>>
  ): boolean => JSON.stringify(a) === JSON.stringify(b);

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

  const requirementStyling = () => {
    const allClases = classData.flatMap((m) => m);

    classData.forEach((item) => {
      item.forEach((e, i) => {
        if (e.requiredFor?.length && e.name) {
          const element = document.querySelector(`.${e.name}`);

          e.requiredFor.forEach((clazz) => {
            allClases.forEach((allClass) => {
              if (clazz === allClass.name && allClass.semester) {
                const tagetIndex = classData[allClass.semester].findIndex(
                  (findItem) => findItem.name === allClass.name
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
                    if (itemState === "empty")
                      classData[j][i].state = "empty-through";
                  }
                }
              }
            });
          });
        }
      });
    });
  };

  useEffect(requirementStyling, [classData]);

  useEffect(() => {
    // checar a quantidade de aulas e a quantidade de aulas concluidas
    checkClassesAmount();

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

  useEffect(() => {
    if (apiData.length > 0) {
      const processedData: IClassItem[][] = apiData.map((semester) =>
        semester.map((item) => {
          const { state, credit, requiredFor, description, name, semester } =
            item;

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

      const storedData = localStorage.getItem("classData");
      if (storedData) {
        try {
          const savedData = JSON.parse(storedData);
          const mergedData = processedData.map((semester, semesterIndex) =>
            semester.map((item, itemIndex) => {
              const savedItem = savedData[semesterIndex]?.[itemIndex];
              if (
                savedItem &&
                savedItem.name === item.name &&
                savedItem.state
              ) {
                return { ...item, state: savedItem.state };
              }
              return item;
            })
          );
          setClassData(mergedData);
        } catch (error) {
          console.error("Error parsing classData from localStorage:", error);
          setClassData(processedData);
        }
      } else {
        setClassData(processedData);
      }
    }
  }, [apiData]);

  if (loading) {
    return (
      <main className="flowchart">
        <h2 className="flowchart__title">Fluxograma</h2>
        <article className="flowchart__container">
          <div className="flowchart__container__content">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flowchart__semester flowchart__semester--loading"
              >
                <h3 className="flowchart__semester-title">{i + 1}º Semestre</h3>
                <div className="flowchart__semester-classes">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <ClassItem key={i} loading={loading} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </main>
    );
  }

  if (error) {
    console.error("Error fetching flowchart:", error);
    return (
      <Warning
        message="Ocorreu um erro no carregamento do fluxograma."
        opened
        isClosable={false}
        buttonLabel="Voltar a página inicial"
        onClickButton={() => navigate("/")}
      />
    );
  }

  return (
    <main className="flowchart">
      <h2 className="flowchart__title">Fluxograma</h2>
      <article className="flowchart__container">
        <ProgressTracker
          classesAmount={classesAmount}
          checkedAmount={checkedAmount}
        />
        <div className="flowchart__container__content-wrapper">
          <div className="flowchart__container__content">
            {classData.map((semester, index) => (
              <div key={index} className="flowchart__semester">
                <h3 className="flowchart__semester-title">
                  {index + 1}º Semestre
                </h3>
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
        </div>
      </article>
    </main>
  );
};

export default Flowchart;
