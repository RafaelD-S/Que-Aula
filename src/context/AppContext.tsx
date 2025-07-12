import { createContext, useContext, useState, ReactNode } from "react";
import { IAppContextType } from "./appContext.interface";

const AppContext = createContext<IAppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentWeekday, setCurrentWeekday] = useState(new Date().getDay());
  const setWeekday = (num: number) => setCurrentWeekday(num);

  return (
    <AppContext.Provider value={{ currentWeekday, setWeekday }}>{children}</AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de <AppProvider>");
  }
  return context;
}
