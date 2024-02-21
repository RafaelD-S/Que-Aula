import { useEffect } from "react"

export default function DiaDaSemana({diaDaSemana, infoDia}) {

    useEffect(() => {
        
    })

    return (
        <main>
            <h2>
                {diaDaSemana}
            </h2>
            <article>
                <section className="primeiro">
                    <div>
                        <h3 className="horarios">
                            17h 18h40
                        </h3>
                    </div>
                    <div className="blocos-container">
                        {infoDia[0][0] ? infoDia[0].map((e) => (
                            <div className="blocos">
                                <h4 className="titulo-aula">
                                    {e.nome} <span>{e.turma ? e.turma : ''}</span> - {e.professor}
                                </h4>
                                <h4 className="lugar-aula">
                                    {e.lugar}
                                </h4>
                                <h5 className="info-aula">
                                    {e.descricao}
                                </h5>
                            </div>
                        )) : 
                        <div className="blocos">
                            <h4 className="titulo-aula">
                                {infoDia[0].nome} <span>{infoDia[0].turma ? infoDia[0].turma : ''}</span> - {infoDia[0].professor}
                            </h4>
                            <h4 className="lugar-aula">
                                {infoDia[0].lugar}
                            </h4>
                            <h5 className="info-aula">
                                {infoDia[0].descricao}
                            </h5>
                        </div>  
                        }
                    </div>
                </section>
                <section className="segundo">
                    <div className="horarios">
                        <h3>
                            18h40 20h20
                        </h3>
                    </div>
                    <div className="blocos-container">
                        {infoDia[1][0] ? infoDia[1].map((e) => (
                            <div className="blocos">
                                <h4 className="titulo-aula">
                                    {e.nome} <span>{e.turma ? e.turma : ''}</span> - {e.professor}
                                </h4>
                                <h4 className="lugar-aula">
                                    {e.lugar}
                                </h4>
                                <h5 className="info-aula">
                                    {e.descricao}
                                </h5>
                            </div>
                        )) : 
                        <div className="blocos">
                            <h4 className="titulo-aula">
                                {infoDia[1].nome} <span>{infoDia[1].turma ? infoDia[1].turma : ''}</span> - {infoDia[1].professor}
                            </h4>
                            <h4 className="lugar-aula">
                                {infoDia[1].lugar}
                            </h4>
                            <h5 className="info-aula">
                                {infoDia[1].descricao}
                            </h5>
                        </div>  
                        }
                    </div>
                </section>
                <section className="terceiro">
                    <div>
                        <h3 className="horarios">
                            20h20 22h
                        </h3>
                    </div>
                    <div className="blocos-container">
                        {infoDia[2][0] ? infoDia[2].map((e) => (
                            <div className="blocos">
                                <h4 className="titulo-aula">
                                    {e.nome} <span>{e.turma ? e.turma : ''}</span> - {e.professor}
                                </h4>
                                <h4 className="lugar-aula">
                                    {e.lugar}
                                </h4>
                                <h5 className="info-aula">
                                    {e.descricao}
                                </h5>
                            </div>
                        )) : 
                        <div className="blocos">
                            <h4 className="titulo-aula">
                                {infoDia[2].nome} <span>{infoDia[2].turma ? infoDia[2].turma : ''}</span> - {infoDia[2].professor}
                            </h4>
                            <h4 className="lugar-aula">
                                {infoDia[2].lugar}
                            </h4>
                            <h5 className="info-aula">
                                {infoDia[2].descricao}
                            </h5>
                        </div>  
                        }
                    </div>
                </section>
            </article>
        </main>
    )
}