import { useState, useEffect } from "react";
import { api } from "../services/api";
import { IClassesData } from "../types/dataClasses.interface";
import { IClassItem } from "../components/classItem/classItem.Interface";

export const useClasses = () => {
  const [classes, setClasses] = useState<IClassesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getClasses();
        setClasses(data);
      } catch (err) {
        console.error("Erro ao buscar disciplinas:", err);
        setError("Erro ao carregar disciplinas");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return { classes, loading, error };
};

export const useFlowchart = () => {
  const [flowchart, setFlowchart] = useState<IClassItem[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlowchart = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getFlowchart();
        setFlowchart(data);
      } catch (err) {
        console.error("❌ Erro ao buscar fluxograma:", err);
        setError("Erro ao carregar fluxograma");
      } finally {
        setLoading(false);
      }
    };

    fetchFlowchart();
  }, []);

  return { flowchart, loading, error };
};
