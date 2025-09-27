import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { IAppContextType, IClasses } from "./appContext.interface";
import { storedClassesMock } from "./mocks/storedClasses";
import { IClassesData } from "../types/dataClasses.interface";

const AppContext = createContext<IAppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentWeekday, setCurrentWeekday] = useState(new Date().getDay());
  const setWeekday = (num: number) => setCurrentWeekday(num);

  const [storedClasses, setStoredClasses] = useState<IClasses[]>(storedClassesMock);
  const [changedClasses, setChangedClasses] = useState<IClasses[]>(storedClassesMock);
  const setClasses = (classes: IClasses[]) => setChangedClasses(classes);

  const weekDays = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
  const allDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  useEffect(() => {
    const storedClassesNew: IClassesData[] = JSON.parse(
      localStorage.getItem("chosenClasses") || "[]"
    );

    setStoredClasses((prev) =>
      prev.map((item, index) => ({
        ...item,
        classes: storedClassesNew
          .flatMap((classData) =>
            classData.classes.map((classItem) => ({
              ...classItem,
              greve: classData.greve,
            }))
          )
          .filter((f) => f.selected && +f.weekDay === index),
      }))
    );
  }, [changedClasses]);

  return (
    <AppContext.Provider
      value={{ currentWeekday, setWeekday, storedClasses, weekDays, setClasses, allDays }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de <AppProvider>");
  }
  return context;
};
