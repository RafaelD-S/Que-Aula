import { useEffect, useState } from "react";

import DayClasses from "./components/dayClasses/dayClasses";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Modal from "./components/modal/modal";

import "./style/GlobalStyle.scss";

function App() {
  const [currentWeekday, setCurrentWeekday] = useState(new Date().getDay());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const weekDays = ["Segunda-Feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-Feira"];

  useEffect(() => {
    if (!localStorage.getItem("chosenClasses")) setIsModalOpen(true);
  });

  return (
    <>
      <Header switchWeekday={setCurrentWeekday} weekDays={weekDays} />
      <DayClasses currentWeekday={currentWeekday} />
      <Modal isModalOpen={isModalOpen} />
      <Footer />
    </>
  );
}

export default App;
