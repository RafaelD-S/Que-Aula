export default function DiaDaSemana({diaDaSemana, infoDia}) {

    return (
        <main>
            <h2>
                {diaDaSemana}
            </h2>
            <article>
                <section className="primeiro">
                    <div>
                        <h3>
                            17h 18h40
                        </h3>
                    </div>
                    <div>
                        <h4>
                            {infoDia[0].nome} - {infoDia[0].professor}
                        </h4>
                        <h4>
                            {infoDia[0].lugar}
                        </h4>
                        <h5>
                            {infoDia[0].descricao}
                        </h5>
                    </div>
                </section>
                <section className="segundo">
                    <div>
                        <h3>
                            18h40 20h20
                        </h3>
                    </div>
                    <div>
                        <h4>
                            {infoDia[1].nome} - {infoDia[1].professor}
                        </h4>
                        <h4>
                            {infoDia[1].lugar}
                        </h4>
                        <h5>
                            {infoDia[1].descricao}
                        </h5>
                    </div>
                </section>
                <section className="terceiro">
                    <div>
                        <h3>
                            20h20 22h
                        </h3>
                    </div>
                    <div>
                    <h4>
                            {infoDia[2].nome} - {infoDia[2].professor}
                        </h4>
                        <h4>
                            {infoDia[2].lugar}
                        </h4>
                        <h5>
                            {infoDia[2].descricao}
                        </h5>
                    </div>
                </section>
            </article>
        </main>
    )
}