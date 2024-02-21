import WeekDay from "./components/contents/WeekDay";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./components/style/style.scss";

/*
  References:
   - subjects: same as 'disciplinas'
   - class: same as 'turma'
   - lectures: same as 'aulas'
*/

function App() {
  const currentWeekday = new Date().getDay();

  // there is no need for this being a state since it's not going to change
  const subjects = [
    {
      id: 0,
      name: "------",
      teacher: "------",
      classroom: "------",
      // could be also named as displayName or something like that, it is not actually a description
      description: "------",
    },
    {
      id: 1,
      name: "MAT222",
      teacher: "Antonio Magno",
      classroom: "BLOCO O - Sala 7",
      description: "Matemática I",
    },
    {
      id: 2,
      name: "LET100",
      teacher: "Wesley Correia",
      classroom: "BLOCO B - Sala 6",
      description: "Língua Portuguesa",
    },
    [
      {
        id: 3.0,
        name: "LET102",
        class: "T01",
        teacher: "Luzia Helena",
        classroom: "Bloco L - Cen. de Idiomas",
        description: "Inglês Instrumental",
      },
      {
        id: 3.1,
        name: "LET102",
        class: "T02",
        teacher: "Luzia Helena",
        classroom: "Bloco L - Cen. de Idiomas",
        description: "Inglês Instrumental",
      },
    ],
    [
      {
        id: 4.0,
        name: "INF027",
        class: "T01",
        teacher: "Fred",
        classroom: "BLOCO E - Lab. 3",
        description: "Introdução a Lógica de Programação",
      },
      {
        id: 4.1,
        name: "INF027",
        class: "T02",
        teacher: "Romilson",
        classroom: "BLOCO E - Lab. 4",
        description: "Introdução a Lógica de Programação",
      },
    ],
    [
      {
        id: 5.0,
        name: "INF026",
        teacher: "Antônio Carlos (AC)",
        classroom: "BLOCO L - Sala 1",
        description: "Introdução a Computação",
      },
      {
        id: 5.1,
        name: "INF026",
        teacher: "Antônio Carlos (AC)",
        classroom: "BLOCO E - Lab. 3",
        description: "Introdução a Computação",
      },
    ],
  ];

  // same as above, a state that is not going to change
  const schedule = [
    {
      id: 0,
      day: "Domingo",
      lectures: [subjects[0], subjects[0], subjects[0]],
    },
    {
      id: 1,
      day: "Segunda-Feira",
      lectures: [subjects[0], subjects[1], subjects[2]],
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
      lectures: [subjects[3][0], subjects[1], subjects[4][1]],
    },
    {
      id: 4,
      day: "Quinta-Feira",
      lectures: [subjects[2], subjects[5][1], subjects[4][0]],
    },
    {
      id: 5,
      day: "Sexta-Feira",
      lectures: [subjects[3][0], subjects[1], subjects[3][1]],
    },
    {
      id: 6,
      day: "Sábado",
      lectures: [subjects[0], subjects[0], subjects[0]],
    },
  ];
  return (
    <>
      <Header />
      <WeekDay
        day={schedule[currentWeekday].day}
        data={schedule[currentWeekday].lectures}
      />
      <Footer />
    </>
  );
}

export default App;
