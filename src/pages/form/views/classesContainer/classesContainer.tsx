import { classNames } from '../../../../utils/functions/classNames'
import { ClassTag } from '../classTag/classTag'
import { IClassesContainer } from './classesContainer.interface'

export const ClassesContainer = ({
  classesData,
  onClickTag,
  title,
  semestre,
  detailed = false
}: IClassesContainer) => {
  const tagContainerClasses = classNames({
    ['form__classes__tag__container']: true,
    ['form__classes__tag__container--detailed']: detailed
  })

  return (
    <div className='form__classes__container'>
      <h4 className='form__classes__subtitle'>{title}</h4>
      <div className={tagContainerClasses}>
        {classesData
          .filter(filter => +filter.semester === semestre)
          .map((classData, index) =>
            !classData.multiClass ? (
              <ClassTag
                title={classData.name}
                key={index}
                selected={classData.classes.some(cls => cls.selected)}
                onClick={e => onClickTag(e, classData)}
              />
            ) : (
              classData.classList &&
              classData.classList.map(classInfo => (
                <ClassTag
                  title={`${classData.name} ${classInfo}`}
                  key={classInfo}
                  selected={classData.classes.some(
                    cls => cls.whichClass === classInfo && cls.selected
                  )}
                  onClick={e => onClickTag(e, classData)}
                />
              ))
            )
          )}
      </div>
    </div>
  )
}
