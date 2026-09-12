import { useState, useEffect } from "react";
import { IClassItem } from "../components/classItem/classItem.Interface";

const API_BASE_URL = "https://que-aula-api.vercel.app";

async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  getFlowchart: (): Promise<IClassItem[][]> => {
    return apiRequest<IClassItem[][]>("/flowchart");
  },

  getFlowchartClass: (className: string): Promise<IClassItem> => {
    return apiRequest<IClassItem>(`/flowchart/${className}`);
  },
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
        console.error("Erro ao buscar fluxograma:", err);
        setError("Erro ao carregar fluxograma");
      } finally {
        setLoading(false);
      }
    };

    fetchFlowchart();
  }, []);

  return { flowchart, loading, error };
};
