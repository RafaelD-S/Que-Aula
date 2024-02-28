import Reset from '../assets/recarregar.svg'
import ArrowDown from '../assets/arrow-down.svg'
import { useState } from 'react';

export default function Header({switchWeekday}) {

    const [navSwitch, setNavSwitch] = useState(true)

  return (
    <header>
        <section className='title' onClick={() => setNavSwitch(true)}>
            <h1>Que Aula?</h1>
            <figure className='reset' onClick={() => location.reload()}>
                <img src={Reset} alt="reset" />
            </figure>
        </section>
        {navSwitch ? <Nav setNavSwitch={setNavSwitch}/> : <DropDown setNavSwitch={setNavSwitch} switchWeekday={switchWeekday}/>}
    </header>
  );
}

function DropDown({setNavSwitch, switchWeekday}) {
    return (
        <nav className='dropDown' onClick={() => setNavSwitch(true)}>
            <button>
                <h4>
                    Dias da Semana
                </h4>
                <img src={ArrowDown} alt="" />
            </button>
            <h3 onClick={() => switchWeekday(1)}>
                Segunda-Feira
            </h3>
            <h3 onClick={() => switchWeekday(2)}>
                Terça-Feira
            </h3>
            <h3 onClick={() => switchWeekday(3)}>
                Quarta-Feira
            </h3>
            <h3 onClick={() => switchWeekday(4)}>
                Quinta-Feira
            </h3>
            <h3 onClick={() => switchWeekday(5)}>
                Sexta-Feira
            </h3>
        </nav>
    )
}

function Nav({setNavSwitch}) {
    return (
        <nav>
            <button  onClick={() => setNavSwitch(false)}>
                <h4>
                    Dias da Semana
                </h4>
                <img src={ArrowDown} alt="" />
            </button>
        </nav>
    )
}