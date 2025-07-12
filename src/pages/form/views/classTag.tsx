import { classNames } from "../../../utils/functions/classNames";
import { IClassTag } from "../form.Interface";

export const ClassTag = ({
  selected = false,
  title = "title",
  loading = false,
  onClick = () => {},
}: IClassTag) => {
  const tagClasses = classNames({
    ["modal__classes__tag"]: true,
    "modal__classes__tag--selected": selected,
    shimmer: loading,
  });

  return (
    <div className={tagClasses} onClick={onClick}>
      {title}
    </div>
  );
};
