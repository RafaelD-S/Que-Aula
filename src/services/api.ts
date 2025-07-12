import { IClassesData } from "../types/dataClasses.interface";
import { IClassItem } from "../components/classItem/classItem.Interface";

const API_BASE_URL = "https://que-aula-api.up.railway.app";

interface IHealthCheck {
  message: string;
  version: string;
  endpoints: {
    classes: string;
    flowchart: string;
  };
}

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
  getClasses: (): Promise<IClassesData[]> => {
    return apiRequest<IClassesData[]>("/classes");
  },

  getClassByName: (className: string): Promise<IClassesData> => {
    return apiRequest<IClassesData>(`/classes/${className}`);
  },

  getFlowchart: (): Promise<IClassItem[][]> => {
    return apiRequest<IClassItem[][]>("/flowchart");
  },

  getFlowchartClass: (className: string): Promise<IClassItem> => {
    return apiRequest<IClassItem>(`/flowchart/${className}`);
  },

  healthCheck: (): Promise<IHealthCheck> => {
    return apiRequest<IHealthCheck>("/");
  },
};

export default api;
