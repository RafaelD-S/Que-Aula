export default function DiaDaSemana({diaDaSemana, primeiraAulaNome, primeiraAulaInfo, segundaAulaNome, segundaAulaInfo, terceiraAulaNome, terceiraAulaInfo}) {

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
                            {primeiraAulaNome}
                        </h4>
                        <h4>
                            {primeiraAulaInfo}
                        </h4>
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
                            {segundaAulaNome}
                        </h4>
                        <h4>
                            {segundaAulaInfo}
                        </h4>
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
                            {terceiraAulaNome}
                        </h4>
                        <h4>
                            {terceiraAulaInfo}
                        </h4>
                    </div>
                </section>
            </article>
        </main>
    )
}