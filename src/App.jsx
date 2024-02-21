import DiaDaSemana from "./components/diaDaSemana"
import Header from "./components/header"
import Footer from "./components/footer"

import "./components/style/style.scss"
import { useEffect, useState } from "react";

function App() {
  
  const diaDaSemanaValor = new Date().getDay();

  const [aulas, setAulas] = useState([
    {
      id: 0,
      dia: 'Domingo',
      aulas: [
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        },
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        },
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        }
      ]
    },
    {
      id: 1,
      dia: 'Segunda-Feira',
      aulas: [
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        },
        {
          nome: 'MAT222',
          professor: 'Antonio Magno',
          lugar: 'BLOCO O - Sala 7',
          descricao: 'Matemática I',
        },
        {
          nome: 'LET100',
          professor: 'Wesley Correia',
          lugar: 'BLOCO B - Sala 6',
          descricao: 'Língua Portuguesa',
        }
      ]
    },
    {
      id: 2,
      dia: 'Terça-Feira',
      aulas: [
        {
          nome: 'LET102',
          professor: 'Luzia Helena',
          lugar: 'Bloco L - Cen. de Idiomas',
          descricao: 'Inglês',
        },
        {
          nome: 'INF027 T02',
          professor: 'Romilson',
          lugar: 'BLOCO E - Lab. 4',
          descricao: 'Introdução a Lógica de Programação',
        },
        {
          nome: 'INF026',
          professor: 'Antônio Carlos (AC)',
          lugar: 'BLOCO L - Sala 1',
          descricao: 'Introdução a Computação',
        }
      ]
    },
    {
      id: 3,
      dia: 'Quarta-Feira',
      aulas: [
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        },
        {
          nome: 'MAT222',
          professor: 'Antonio Magno',
          lugar: 'BLOCO O - Sala 7',
          descricao: 'Matemática I',
        },
        {
          nome: 'INF027 T02',
          professor: 'Romilson',
          lugar: 'BLOCO E - Lab. 4',
          descricao: 'Introdução a Lógica de Programação',
        }
      ]
    },
    {
      id: 4,
      dia: 'Quinta-Feira',
      aulas: [
        {
          nome: 'LET100',
          professor: 'Wesley Correia',
          lugar: 'BLOCO B - Sala 6',
          descricao: 'Língua Portuguesa',
        },
        {
          nome: 'INF026',
          professor: 'Antônio Carlos (AC)',
          lugar: 'BLOCO E - Lab. 3',
          descricao: 'Introdução a Computação',
        },
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        }
      ]
    },
    {
      id: 5,
      dia: 'Sexta-Feira',
      aulas: [
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        },
        {
          nome: 'MAT222',
          professor: 'Antonio Magno',
          lugar: 'BLOCO O - Sala 7',
          descricao: 'Matemática I',
        },
        {
          nome: 'LET102',
          professor: 'Luzia Helena',
          lugar: 'Bloco L - Cen. de Idiomas',
          descricao: 'Inglês',
        }
      ]
    },
    {
      id: 6,
      dia: 'Sábado',
      aulas: [
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        },
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        },
        {
          nome: '------',
          professor: '------',
          lugar: '------',
          descricao: '------',
        }
      ]
    },
  ])
  return (
    <>
    <Header/>
    <DiaDaSemana 
      diaDaSemana={aulas[diaDaSemanaValor].dia}
      infoDia={aulas[diaDaSemanaValor].aulas}
    />
    <Footer/>
    </>
  )
}

export default App
