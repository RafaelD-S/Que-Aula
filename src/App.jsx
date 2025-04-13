import { useEffect, useState } from "react";

import DayClasses from "./pages/dayClasses/dayClasses";
import Calendar from "./pages/calendar/calendar";

import Data from "./data/classes.json";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Modal from "./components/modal/modal";
import Warning from "./components/warning/warning";
import { version } from "../package.json";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./style/GlobalStyle.scss";

function App() {
  const [currentWeekday, setCurrentWeekday] = useState(new Date().getDay());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urgentUpdate, setUrgentUpdate] = useState(false);

  const weekDays = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
  const savedVersion = localStorage.getItem("version") || "";

  const verifyVersion = () => {
    const localVersion = +savedVersion.slice(0, savedVersion.lastIndexOf("."));
    const appVersion = +version.slice(0, version.lastIndexOf("."));

    if (!savedVersion || localVersion < appVersion) {
      setUrgentUpdate(true);
    }
  };

  useEffect(() => {
    const localVersion = +savedVersion.slice(-1);
    const appVersion = +version.slice(-1);

    if (localVersion < appVersion && savedVersion) {
      const selectedClasses = JSON.parse(localStorage.getItem("chosenClasses") || "[]");

      const allClasses = Data.flatMap((item) => item.classes);

      selectedClasses.forEach((item) => {
        item.classes.forEach((e) => {
          const foundClass = allClasses.find(
            (element) =>
              e.teacher === element.teacher &&
              e.period[0] === element.period[0] &&
              e.weekDay === element.weekDay
          );
          e.classroom = foundClass.classroom;
        });
      });

      localStorage.setItem("chosenClasses", JSON.stringify(selectedClasses));
      localStorage.setItem("version", version);
      location.reload();
    }

    if (!localStorage.getItem("chosenClasses")) setIsModalOpen(true);
    else verifyVersion();
  });

  const updateCalendar = () => {
    localStorage.clear();
    location.reload();
  };

  if (urgentUpdate)
    return (
      <Warning
        opened
        isClosable={false}
        message="Sua versão está desatualizada."
        buttonLabel="Atualizar"
        type="info"
        onClickButton={() => updateCalendar()}
      />
    );

  return (
    <BrowserRouter>
      <Header switchWeekday={setCurrentWeekday} weekDays={weekDays} />

      <Routes>
        <Route path="/" element={<DayClasses currentWeekday={currentWeekday} />} />
        <Route path="/todas-as-aulas" element={<Calendar />} />
      </Routes>

      <Modal isModalOpen={isModalOpen} />
      <Footer
        calendarMessage="Criar um novo calendário"
        feedbackMessage="Achou algo ou quer dar uma sugestão?"
        hasCredits
      />
    </BrowserRouter>
  );
}

export default App;
