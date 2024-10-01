import DayClasses from "./components/dayClasses/dayClasses.jsx";
import Header from "./components/header/header.jsx";
import Footer from "./components/footer/footer.jsx";

import "./style/style.scss";
import { useEffect, useState } from "react";
import Modal from "./components/modal/modal.jsx";

function App() {
  const [currentWeekday, setCurrentWeekday] = useState(new Date().getDay());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    !localStorage.getItem("chosenClasses") && setIsModalOpen(true);
  }, []);

  const [selectedClasses, setSelectedClasses] = useState([]);

  return (
    <>
      <Header switchWeekday={setCurrentWeekday} />
      <DayClasses currentWeekday={currentWeekday} />
      <Modal
        setSelectedClasses={setSelectedClasses}
        selectedClasses={selectedClasses}
        isModalOpen={isModalOpen}
      ></Modal>
      <Footer />
    </>
  );
}

export default App;
