import "./classItem.style.scss";
import { IClassItemProps } from "./classItem.Interface";

const ClassItem = ({ data, onStateChange }: IClassItemProps) => {
  const {
    name,
    description,
    // prerequisites,
    credit,
    state = "default",
  } = data;

  const handleClick = () => {
    let newState: string;

    if (state === "disabled") {
      newState = "default";
    } else if (state === "default") {
      newState = "disabled";
    } else {
      newState = "default";
    }
    onStateChange(name, newState);
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    let newState: string;
    if (state === "disabled") {
      newState = "default";
    } else if (state === "default") {
      newState = "selected";
    } else {
      newState = "default";
    }
    onStateChange(name, newState);
  };

  if (name === undefined) {
    return <div className="class-item class-item--empty"></div>;
  }

  return (
    <div onClick={handleClick} className={`class-item class-item--${state}`}>
      <div className="class-item_checkbox-area">
        <div
          onClick={handleCheckboxClick}
          className={`class-item__checkbox class-item__checkbox--${state}`}
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
