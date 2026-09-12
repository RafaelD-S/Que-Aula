import { useState } from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import { classNames } from "../../../../utils/functions/classNames";
import { IClassListItem } from "./classListItem.interface";

export const ClassListItem = ({
  classCode,
  description,
  whichClass,
  selected = false,
  onClick = () => {},
}: IClassListItem) => {
  const [isSelected, setIsSelected] = useState(selected);

  const classListItemClasses = classNames({
    form__classes__classListItem: true,
    "form__classes__classListItem--selected": isSelected,
  });
  const classListItemTitleClasses = classNames({
    form__classes__classListItem__title: true,
    "form__classes__classListItem__title--selected": isSelected,
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsSelected((prev) => !prev);
    onClick(e);
  };

  return (
    <div className={classListItemClasses} onClick={handleClick} data-testid="class-list-item">
      <Checkbox selected={isSelected} size="large" />
      <div className="form__classes__classListItem__content">
        <h4 className={classListItemTitleClasses}>
          {classCode} <span>{whichClass}</span>
        </h4>
        <p className="form__classes__classListItem__subtitle">{description}</p>
      </div>
    </div>
  );
};
