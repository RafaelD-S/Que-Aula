import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useAuth } from "../../hooks/useAuth";
import { ProtectedRoutesProps } from "./ProtectedRoutes.interface";

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { hasSavedClasses } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!hasSavedClasses) {
      navigate("/form", { replace: true, state: { from: location.pathname } });
    }
  }, [hasSavedClasses, navigate, location]);

  return hasSavedClasses ? <MainLayout>{children}</MainLayout> : null;
};

export default ProtectedRoutes;
