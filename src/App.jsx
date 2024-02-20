import DiaDaSemana from "./components/diaDaSemana"
import Header from "./components/header"
import Footer from "./components/footer"

import "./components/style/style.scss"
import { useEffect, useState } from "react";

function App() {
  
  const diaDaSemanaValor = new Date().getDay();
  
  const [diaDaSemana, setDiaDaSemana] = useState('nada')
  
  useEffect(() => {
    switch (diaDaSemanaValor) {
      case 0:
        setDiaDaSemana("Domingo");
        break;
      case 1:
        setDiaDaSemana("Segunda-Feira");
        break;
      case 2:
        setDiaDaSemana("Terça-Feira");
        break;
      case 3:
        setDiaDaSemana("Quarta-Feira");
        break;
      case 4:
        setDiaDaSemana("Quinta-Feira");
        break;
      case 5:
        setDiaDaSemana("Sexta-Feira");
        break;
      default:
        setDiaDaSemana("Sábado")
    }
  })
  //                          Domingo       Segunda      Terça       Quarta    Quinta    Sexta        Sábado
  const primeiraAulaNome = ['não tem aula', '------', 'LET102'    , '------', 'LET100', '------', 'não tem aula']
  const segundaAulaNome = ['não tem aula' , 'MAT222', 'INF027 T02', 'MAT222', 'INF026', 'MAT222', 'não tem aula']
  const terceiraAulaNome = ['não tem aula', 'LET100', 'INF026'    , 'INF027', '------', 'LET102', 'não tem aula']
  
  //                        Domingo          Segunda               Terça                        Quarta                Quinta                     Sexta
  const primeiraAulaInfo =  ['------', '------'          , 'BLOCO L-L - 002 - Cen. de Idiomas', '------'          , 'BLOCO B - Sala 6', '------']
  const segundaAulaInfo =   ['------', 'BLOCO O - Sala 7', 'BLOCO E - Lab. 4'                 , 'BLOCO O - Sala 7', 'BLOCO B - Sala 2', 'BLOCO O - Sala 7']
  const terceiraAulaInfo =  ['------', 'BLOCO B - Sala 6', 'BLOCO L - Sala 1'                 , 'BLOCO E - Lab. 4', '------'          , 'BLOCO L-L - 002 - Cen. de Idiomas']
   
  return (
    <>
    <Header/>
    <DiaDaSemana 

      diaDaSemana={diaDaSemana}

      primeiraAulaNome={primeiraAulaNome[diaDaSemanaValor]}
      segundaAulaNome={segundaAulaNome[diaDaSemanaValor]}
      terceiraAulaNome={terceiraAulaNome[diaDaSemanaValor]}

      primeiraAulaInfo={primeiraAulaInfo[diaDaSemanaValor]}
      segundaAulaInfo={segundaAulaInfo[diaDaSemanaValor]}
      terceiraAulaInfo={terceiraAulaInfo[diaDaSemanaValor]}
    />
    <Footer/>
    </>
  )
}

export default App
