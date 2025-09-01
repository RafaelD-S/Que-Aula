import { IClassesData } from "../../types/dataClasses.interface";


export const mockClassesData: IClassesData[] = [
  {
    name: "Matemática Básica",
    description: "Disciplina de matemática fundamental",
    semester: "1",
    multiClass: false,
    classList: ["Turma A"],
    greve: false,
    classes: [
      {
        weekDay: "segunda",
        period: ["1", "2"],
        teacher: "Prof. João Silva",
        selected: false,
        classList: ["Turma A"],
        classroom: "Lab 01",
        whichClass: "Turma A",
        classDescription: "Aula de matemática básica",
        className: "Matemática Básica"
      }
    ]
  },
  {
    name: "Programação I",
    description: "Introdução à programação",
    semester: "1", 
    multiClass: true,
    classList: ["Turma A", "Turma B"],
    greve: false,
    classes: [
      {
        weekDay: "terça",
        period: ["3", "4"],
        teacher: "Prof. Maria Santos",
        selected: false,
        classList: ["Turma A", "Turma B"],
        classroom: "Lab 02",
        whichClass: "Turma A",
        classDescription: "Aula de programação",
        className: "Programação I"
      }
    ]
  }
];

export const mockSingleClassData: IClassesData = mockClassesData[0];

export const mockClassDataWithGreve: IClassesData = {
  ...mockSingleClassData,
  greve: true,
  name: "Disciplina em Greve"
};