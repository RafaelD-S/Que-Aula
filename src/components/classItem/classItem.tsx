import "./classItem.style.scss";
import { IClassItem } from "./classItem.Interface";

const ClassItem = ({ data }: { data: IClassItem }) => {
  const { name, description, semester, line, prerequisites, credit, state } =
    data;

  return (
    <div className={`class-item class-item--state-${state}`}>
      <div className="class-item_checkbox-area">
        <div
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
