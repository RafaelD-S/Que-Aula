import DayClasses from "./components/dayClasses/dayClasses.jsx";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";

import "./style/style.scss";
import { useEffect, useState } from "react";
import Modal from "./components/modal/modal.jsx";

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
