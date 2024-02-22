import Sol from '../assets/sol.svg'
import Calendario from '../assets/calendario.svg'
import ArrowDown from '../assets/arrow-down.svg'
import Reset from '../assets/recarregar.svg'

export default function Header() {
    return (
        <header>
            <section>
                <h1>
                    Que Aula?
                </h1>
            </section>
            {/* Implementação futura de:
            - Ver todas as aulas
            - Ver um calendário de aulas
            - Mudar de tema escuro para tema claro */}

            {/* <nav>
                <ul>
                    <li>Todas as Aulas <img src={ArrowDown} alt="" /></li>
                    <li>
                        <figure>
                            <img src={Calendario} alt="Calendário" />
                            <img src={Sol} alt="Mudar tema" />
                        </figure>
                    </li>
                </ul>
            </nav> */}
            <figure className='reset' onClick={() => location.reload()}>
                <img src={Reset} alt="reset" />
            </figure>
        </header>
    )
}