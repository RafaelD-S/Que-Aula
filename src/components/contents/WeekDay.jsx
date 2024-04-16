import PropTypes from "prop-types";
import React from "react";

class WeekDay extends React.Component {
  render() {
    const blocks = [
      {
        index: 0,
        greve: this.props.data[0].greve,
        style: "primeiro",
        time: "17h 18h40",
      },
      {
        index: 1,
        greve: this.props.data[1].greve,
        style: "segundo",
        time: "18h40 20h20",
      },
      {
        index: 2,
        greve: this.props.data[2].greve,
        style: "terceiro",
        time: "20h20 22h",
      },
    ];

    return (
      <main>
        <h2>{this.props.day}</h2>
        <article>
          {blocks.map((block) => (
            <section key={block.index} className={block.style}>
              <div id={block.greve}>
                <h3 className="schedule">{block.time}</h3>
              </div>
              <div className="block-container">
                {this.props.data[block.index][0] ? (
                  this.props.data[block.index].map((e) => (
                    <div key={e.name} className="blocks">
                      <h4 className="lecture-title">
                        {e.name} <span>{e.class ? e.class : ""}</span> -{" "}
                        {e.teacher}
                      </h4>
                      <h4 className="lecture-classroom">{e.classroom}</h4>
                      <h5 className="lecture-description">{e.description}</h5>
                    </div>
                  ))
                ) : (
                  <div className="blocks">
                    <h4 className="lecture-title">
                      {this.props.data[block.index].name}{" "}
                      <span>
                        {this.props.data[block.index].class
                          ? this.props.data[block.index].class
                          : ""}
                      </span>{" "}
                      - {this.props.data[block.index].teacher}
                    </h4>
                    <h4 className="lecture-classroom">
                      {this.props.data[block.index].classroom}
                    </h4>
                    <h5 className="lecture-description">
                      {this.props.data[block.index].description}
                    </h5>
                  </div>
                )}
              </div>
            </section>
          ))}
        </article>
      </main>
    );
  }
}

WeekDay.propTypes = {
  day: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default WeekDay;
