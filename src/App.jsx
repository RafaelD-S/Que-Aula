import { useEffect, useState } from "react";

import DayClasses from "./components/dayClasses/dayClasses";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Modal from "./components/modal/modal";
import { version } from "../package.json";

import "./style/GlobalStyle.scss";
import Warning from "./components/waning/warning";

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

  return (
    <>
      <Header switchWeekday={setCurrentWeekday} weekDays={weekDays} />
      {urgentUpdate ? (
        <Warning
          opened
          isClosable={false}
          message="Sua versão está desatualizada."
          buttonLabel="Atualizar"
          type="info"
          onClickButton={() => updateCalendar()}
        />
      ) : (
        <DayClasses currentWeekday={currentWeekday} />
      )}
      <Modal isModalOpen={isModalOpen} />
      <Footer />
    </>
  );
}

export default App;
