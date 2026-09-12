import { classNames } from "../../../../utils/functions/classNames";
import { ClassTag } from "../classTag/classTag";
import { IClassesContainer, IClassesDataTag } from "./classesContainer.interface";

import List from "../../../../assets/list.svg";
import { useEffect, useState } from "react";
import { Switcher } from "../../../../components/switcher/switcher";
import { SubjectFull, useSubjects } from "../../../../api";
import { ClassListItem } from "../classListItem/classListItem";
import Warning from "../../../../components/warning/warning";

export const ClassesContainer = ({ title, semestre, onClickTag = () => {} }: IClassesContainer) => {
  const { data, loading, error } = useSubjects(semestre, ["sections", "courses"]);
  const subjectData = Array.isArray(data) ? (data as SubjectFull[]) : [];
  const [classData, setClassData] = useState<IClassesDataTag[]>([]);

  const [isDetailed, setIsDetailed] = useState(false);

  const tagContainerClasses = classNames({
    ["form__classes__tag__container"]: true,
    ["form__classes__tag__container--detailed"]: isDetailed,
  });

  const handleSwitcherClick = () => {
    setIsDetailed((prev) => !prev);
  };

  useEffect(() => {
    if (loading) return;

    const classData = subjectData.flatMap((subject) =>
      subject.sections.map((item) => ({
        ...item,
        selected: false,
        description: subject.name,
      })),
    );

    setClassData(classData);
  }, [data]);

  if (error)
    return (
      <Warning
        message="Houve um erro em carregar suas aulas."
        opened
        buttonLabel="Tentar Novamente"
        onClickButton={() => location.reload()}
      />
    );

  return (
    <div className="form__classes__container">
      <div className="form__classes__subtitle__container">
        <h4 className="form__classes__subtitle">{title}</h4>
        <div className="form__classes__switcher">
          <Switcher icon={List} onClick={handleSwitcherClick} selected={isDetailed} />
        </div>
      </div>
      <div className={tagContainerClasses}>
        {loading && Array.from({ length: 9 }).map((_, i) => <ClassTag key={i} loading />)}

        {!loading &&
          classData.map((item, i) => {
            const isMultiClass =
              classData.filter((classDataItem) => classDataItem.subjectCode === item.subjectCode)
                .length > 1;
            const subject = data?.find((subjectItem) => subjectItem.code === item.subjectCode);

            if (isDetailed)
              return (
                <ClassListItem
                  key={i}
                  description={item.subjectCode}
                  whichClass={isMultiClass ? item.code : undefined}
                  classCode={subject?.name}
                  onClick={() => onClickTag(item)}
                />
              );
            return (
              <ClassTag
                key={i}
                selected={item.selected}
                title={item.subjectCode}
                whichClass={isMultiClass ? item.code : undefined}
                onClick={() => onClickTag(item)}
              />
            );
          })}
      </div>
    </div>
  );
};
