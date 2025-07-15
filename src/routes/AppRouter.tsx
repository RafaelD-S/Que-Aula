import { Routes, Route, useNavigate } from "react-router-dom";
import DayClasses from "../pages/dayClasses/dayClasses";
import Calendar from "../pages/calendar/calendar";
import Flowchart from "../pages/flowchart/flowchart";
import ProtectedRoutes from "../components/protectedRoutes/ProtectedRoutes";
import Form from "../pages/form/form";
import Warning from "../components/warning/warning";

export default function AppRouter() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/form" element={<Form />} />
      <Route
        path="*"
        element={
          <ProtectedRoutes>
            <Routes>
              <Route path="/" element={<DayClasses />} />
              <Route path="/todas-as-aulas" element={<Calendar />} />
              <Route path="/fluxograma" element={<Flowchart />} />
              <Route
                path="*"
                element={
                  <Warning
                    message="Página não encontrada."
                    opened
                    isClosable={false}
                    buttonLabel="Voltar a página inicial"
                    onClickButton={() => navigate("/")}
                  />
                }
              />
            </Routes>
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}
