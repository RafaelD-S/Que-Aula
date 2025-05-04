import "./classItem.style.scss";
import { IClassItemProps } from "./classItem.Interface";

const ClassItem = ({ data, onStateChange }: IClassItemProps) => {
  const {
    name,
    description,
    // prerequisites,
    credit,
    state = 1,
  } = data;

  const handleClick = () => {
    let newState: number;

    if (state === 0) {
      newState = 1;
    } else if (state === 1) {
      newState = 0;
    } else {
      newState = 1;
    }
    onStateChange(name, newState);
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    let newState: number;
    if (state === 0) {
      newState = 1;
    } else if (state === 1) {
      newState = 2;
    } else {
      newState = 1;
    }
    onStateChange(name, newState);
  };

  if (name === undefined) {
    return <div className="class-item class-item--empty"></div>;
  }

  return (
    <div
      onClick={handleClick}
      className={`class-item class-item--state-${state}`}
    >
      <div className="class-item_checkbox-area">
        <div
          onClick={handleCheckboxClick}
          className={`class-item__checkbox class-item__checkbox--state-${state}`}
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
