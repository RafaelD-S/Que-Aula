import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import DayClasses from "../pages/dayClasses/dayClasses";
import Schedule from "../pages/schedule/schedule";
import Flowchart from "../pages/flowchart/flowchart";
import ProtectedRoutes from "../components/protectedRoutes/ProtectedRoutes";
import Form from "../pages/form/form";
import Warning from "../components/warning/warning";

export default function AppRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  const checkedInitialNavigation = useRef(false);

  useEffect(() => {
    if (checkedInitialNavigation.current) return;

    checkedInitialNavigation.current = true;

    const navigationEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = navigationEntry?.type === "reload";
    const isDayRoute = location.pathname.startsWith("/day/");

    if (isReload && isDayRoute) {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/form" element={<Form />} />
      <Route
        path="*"
        element={
          <ProtectedRoutes>
            <Routes>
              <Route path="/" element={<DayClasses />} />
              <Route path="/day/:day" element={<DayClasses />} />
              <Route path="/todas-as-aulas" element={<Schedule />} />
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
