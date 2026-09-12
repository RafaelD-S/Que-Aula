import { useState } from "react";
import { classNames } from "../../../../utils/functions/classNames";
import { IClassTag } from "./classTag.Interface";

export const ClassTag = ({
  selected = false,
  title = "title",
  whichClass,
  loading = false,
  onClick = () => {},
}: IClassTag) => {
  const [isSelected, setIsSelected] = useState(selected);

  const tagClasses = classNames({
    ["form__classes__tag"]: true,
    "form__classes__tag--selected": isSelected,
    shimmer: loading,
  });

  const tagSpanClasses = classNames({
    form__classes__tag__class: true,
    "form__classes__tag__class--selected": isSelected,
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsSelected((prev) => !prev);
    onClick(e);
  };

  return (
    <div className={tagClasses} onClick={handleClick} data-testid="classTag">
      <span className="form__classes__tag__title">{title} </span>
      {whichClass && <span className={tagSpanClasses}>{whichClass}</span>}
    </div>
  );
};
