import React from 'react'
import { IClassesData } from '../../../../types/dataClasses.interface'

export interface IClassesContainer {
  classesData: IClassesData[]
  onClickTag: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    item: IClassesData
  ) => void
  title: string
  semestre: number
  detailed?: boolean
}
