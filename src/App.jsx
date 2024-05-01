import WeekDay from "./components/contents/WeekDay";

import Footer from "./components/footer.jsx"
import Header from "./components/header.jsx"

import "./components/style/style.scss";
import { useState } from "react";

/*
  References:
   - subjects: same as 'disciplinas'
   - class: same as 'turma'
   - lectures: same as 'aulas'
*/

function App() {
  const [currentWeekday, setCurrentWeekday] = useState(new Date().getDay());

  const subjects = [
    {
      id: 0,
      name: "------",
      teacher: "------",
      classroom: "------",
      description: "------",
    },
    [
      {
        id: 1.0,
        name: "MAT222",
        teacher: "Antonio Magno",
        classroom: "BLOCO O - Sala 7",
        description: "Matemática I"
      },
      {
        id: 1.1,
        name: "MAT222",
        teacher: "Antonio Magno",
        classroom: "BLOCO D - Sala 4",
        description: "Matemática I"
      },
    ],
    {
      id: 2,
      name: "LET100",
      teacher: "Wesley Correia",
      classroom: "BLOCO B - Sala 6",
      description: "Língua Portuguesa"
    },
    [
      {
        id: 3.0,
        name: "LET102",
        class: "T01",
        teacher: "Luzia Helena",
        classroom: "Bloco L - Cen. de Idiomas",
        description: "Inglês Instrumental"
      },
      {
        id: 3.1,
        name: "LET102",
        class: "T02",
        teacher: "Luzia Helena",
        classroom: "Bloco L - Cen. de Idiomas",
        description: "Inglês Instrumental"
      },
    ],
    [
      {
        id: 4.0,
        name: "INF027",
        class: "T01",
        teacher: "Fred",
        classroom: "BLOCO E - Lab. 3",
        description: "Introdução a Lógica de Programação"
      },
      {
        id: 4.1,
        name: "INF027",
        class: "T02",
        teacher: "Romilson",
        classroom: "BLOCO E - Lab. 4",
        description: "Introdução a Lógica de Programação"
      },
    ],
    [
      {
        id: 5.0,
        name: "INF026",
        teacher: "Antônio Carlos (AC)",
        classroom: "BLOCO O - Sala 6",
        description: "Introdução a Computação"
      },
      {
        id: 5.1,
        name: "INF026",
        teacher: "Antônio Carlos (AC)",
        classroom: "BLOCO E - Lab. 3",
        description: "Introdução a Computação"
      },
    ],
  ];

  const schedule = [
    {
      id: 0,
      day: "Domingo",
      lectures: [subjects[0], subjects[0], subjects[0]],
    },
    {
      id: 1,
      day: "Segunda-Feira",
      lectures: [subjects[0], subjects[1][0], subjects[2]],
    },
    {
      id: 2,
      day: "Terça-Feira",
      lectures: [
        subjects[3][1],
        [subjects[4][0], subjects[4][1]],
        subjects[5][0],
      ],
    },
    {
      id: 3,
      day: "Quarta-Feira",
      lectures: [subjects[3][0], subjects[1][0], subjects[4][1]],
    },
    {
      id: 4,
      day: "Quinta-Feira",
      lectures: [subjects[2], subjects[5][1], subjects[4][0]],
    },
    {
      id: 5,
      day: "Sexta-Feira",
      lectures: [subjects[3][0], subjects[1][1], subjects[3][1]],
    },
    {
      id: 6,
      day: "Sábado",
      lectures: [subjects[0], subjects[0], subjects[0]],
    },
  ];
  return (
    <>
      <Header switchWeekday={setCurrentWeekday}/>
      <WeekDay
        day={schedule[currentWeekday].day}
        data={schedule[currentWeekday].lectures}
      />
      <Footer />
    </>
  );
}

export default App;
