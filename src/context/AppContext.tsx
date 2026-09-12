import { createContext, useContext } from "react";
import { IAppContext } from "./models/appContext.interface";

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];

  const contextValue: IAppContext = { weekdays };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
