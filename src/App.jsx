import { useEffect, useState } from "react";

import DayClasses from "./pages/dayClasses/dayClasses";
import Calendar from "./pages/calendar/calendar";
import Flowchart from "./pages/flowchart/flowchart";

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

  const [allClassesData, setAllClassesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const weekDays = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
  ];
  const savedVersion = localStorage.getItem("version") || "";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/data");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllClassesData(data);
      } catch (e) {
        console.error("Failed to fetch classes data:", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const verifyVersion = () => {
    const localVersion = +savedVersion.slice(0, savedVersion.indexOf("."));
    const appVersion = +version.slice(0, version.indexOf("."));

    if (!savedVersion || localVersion < appVersion) {
      setUrgentUpdate(true);
    }
  };

  useEffect(() => {
    if (!allClassesData) return;

    const localVersion = +savedVersion.slice(-1);
    const appVersion = +version.slice(-1);

    if (localVersion < appVersion && savedVersion) {
      const selectedClasses = JSON.parse(
        localStorage.getItem("chosenClasses") || "[]"
      );

      const allClasses = allClassesData;

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
  }, [allClassesData, savedVersion, version]);

  const updateCalendar = () => {
    localStorage.clear();
    location.reload();
  };

  if (isLoading) {
    return <div>Loading classes...</div>;
  }

  if (error) {
    return <div>Error fetchind data: {error}</div>;
  }

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

  if (!allClassesData) {
    return <div>Waiting for data...</div>;
  }

  return (
    <BrowserRouter>
      <Header switchWeekday={setCurrentWeekday} weekDays={weekDays} />

      <Routes>
        <Route
          path="/"
          element={<DayClasses currentWeekday={currentWeekday} />}
        />
        <Route path="/todas-as-aulas" element={<Calendar />} />
        <Route path="/fluxograma" element={<Flowchart />} />
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
