import "./dayClassesStyle.scss";

export default function dayClasses({ day, data }) {
  const blocks = [
    {
      index: 0,
      greve: data[0].greve,
      time: "17h 18h40",
    },
    {
      index: 1,
      greve: data[1].greve,
      time: "18h40 20h20",
    },
    {
      index: 2,
      greve: data[2].greve,
      time: "20h20 22h",
    },
  ];

  return (
    <main className="dayClasses">
      <h2 className="dayClasses__title">{day}</h2>
      <article className="dayClasses__container">
        {blocks.map((block) => (
          <section key={block.index} className="dayClasses__item">
            <div
              className={`dayClasses__schedule${
                block.greve ? "--greve" : "--normal"
              }`}
            >
              <h3 className="dayClasses__schedule">{block.time}</h3>
            </div>
            <div className="dayClasses__info-container">
              {data[block.index].map((e, index) => (
                <div key={index} className="dayClasses__info-item">
                  <h4 className="dayClasses__info-item-title">
                    {e.name} <span>{e.class ? e.class : ""}</span> - {e.teacher}
                  </h4>
                  <h4 className="dayClasses__info-item-classroom">
                    {e.classroom}
                  </h4>
                  <h5 className="dayClasses__info-item-description">
                    {e.description}
                  </h5>
                </div>
              ))}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
}
