import DiaDaSemana from "./components/diaDaSemana"
import Header from "./components/header"
import Footer from "./components/footer"

import "./components/style/style.scss"
import { useEffect, useState } from "react";

function App() {
  
  const diaDaSemanaValor = new Date().getDay();

  const [disciplinas, setDisciplinas] = useState([
    {
      id: 0,
      nome: '------',
      professor: '------',
      lugar: '------',
      descricao: '------'
    },
    {
      id: 1,
      nome: 'MAT222',
      professor: 'Antonio Magno',
      lugar: 'BLOCO O - Sala 7',
      descricao: 'Matemática I',
    },
    {
      id: 2,
      nome: 'LET100',
      professor: 'Wesley Correia',
      lugar: 'BLOCO B - Sala 6',
      descricao: 'Língua Portuguesa',
    },
    [
      {
        id: 3.0,
        nome: 'LET102 T01',
        professor: 'Luzia Helena',
        lugar: 'Bloco L - Cen. de Idiomas',
        descricao: 'Inglês',
      },
      {
        id: 3.1,
        nome: 'LET102 T02',
        professor: 'Luzia Helena',
        lugar: 'Bloco L - Cen. de Idiomas',
        descricao: 'Inglês',
      },
    ],
    [
      {
        id: 4.0,
        nome: 'INF027 T01',
        professor: 'Fred',
        lugar: 'BLOCO E - Lab. 3',
        descricao: 'Introdução a Lógica de Programação',
      },
      {
        id: 4.1,
        nome: 'INF027 T02',
        professor: 'Romilson',
        lugar: 'BLOCO E - Lab. 4',
        descricao: 'Introdução a Lógica de Programação',
      },
    ],
    [
      {
        id: 5.0,
        nome: 'INF026',
        professor: 'Antônio Carlos (AC)',
        lugar: 'BLOCO L - Sala 1',
        descricao: 'Introdução a Computação',
      },
      {
        id: 5.1,
        nome: 'INF026',
        professor: 'Antônio Carlos (AC)',
        lugar: 'BLOCO E - Lab. 3',
        descricao: 'Introdução a Computação',
      }
    ],
  ])

  const [aulas, setAulas] = useState([
    {
      id: 0,
      dia: 'Domingo',
      aulas: [
        disciplinas[0],
        disciplinas[0],
        disciplinas[0]
      ]
    },
    {
      id: 1,
      dia: 'Segunda-Feira',
      aulas: [
        disciplinas[0],
        disciplinas[1],
        disciplinas[2]
      ]
    },
    {
      id: 2,
      dia: 'Terça-Feira',
      aulas: [
        disciplinas[3][1],
        [
          disciplinas[4][0],
          disciplinas[4][1]
        ],
        disciplinas[5][0]
      ]
    },
    {
      id: 3,
      dia: 'Quarta-Feira',
      aulas: [
        disciplinas[3][0],
        disciplinas[1],
        disciplinas[4][1]
      ]
    },
    {
      id: 4,
      dia: 'Quinta-Feira',
      aulas: [
        disciplinas[2],
        disciplinas[5][1],
        disciplinas[4][0]
      ]
    },
    {
      id: 5,
      dia: 'Sexta-Feira',
      aulas: [
        disciplinas[3][0],
        disciplinas[1],
        disciplinas[3][1]
      ]
    },
    {
      id: 6,
      dia: 'Sábado',
      aulas: [
        disciplinas[0],
        disciplinas[0],
        disciplinas[0]
      ]
    },
  ])
  return (
    <>
    <Header
      
    />
    <DiaDaSemana 
      diaDaSemana={aulas[diaDaSemanaValor].dia}
      infoDia={aulas[diaDaSemanaValor].aulas}
    />
    <Footer/>
    </>
  )
}

export default App
