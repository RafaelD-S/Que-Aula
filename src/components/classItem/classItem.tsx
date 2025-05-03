import "./classItem.style.scss";
import { IClassItem } from "./classItem.Interface";
import { useState } from "react";

const ClassItem = ({ data }: { data: IClassItem }) => {
  const {
    name,
    description,
    // prerequisites,
    credit,
    state,
  } = data;

  const [classState, setClassState] = useState(state);

  const handleClick = () => {
    if (classState === 0) {
      setClassState(1);
    }
    if (classState === 1) {
      setClassState(0);
    }
    if (classState === 2) {
      setClassState(1);
    }
  };
  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (classState === 0) {
      setClassState(1);
    }
    if (classState === 1) {
      setClassState(2);
    }
    if (classState === 2) {
      setClassState(1);
    }
  };

  if (name === undefined) {
    return <div className="class-item class-item--empty"></div>;
  }

  return (
    <div
      onClick={handleClick}
      className={`class-item class-item--state-${classState}`}
    >
      <div className="class-item_checkbox-area">
        <div
          onClick={handleCheckboxClick}
          className={`class-item__checkbox class-item__checkbox--state-${classState}`}
        ></div>
      </div>
      <div className="class-item__content">
        <h3 className="class-item__title">{name}</h3>
        <p className="class-item__description">{description}</p>
      </div>
      <p className="class-item__credit">{credit}</p>
    </div>
  );
};

export default ClassItem;
