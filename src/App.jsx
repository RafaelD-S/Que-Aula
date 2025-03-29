import { useEffect, useState } from "react";

import DayClasses from "./pages/dayClasses/dayClasses";
import Calendar from "./pages/calendar/calendar";

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
    if (!savedVersion || +savedVersion.charAt(0) < version.charAt(0)) {
      setUrgentUpdate(true);
    }
  };

  useEffect(() => {
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
