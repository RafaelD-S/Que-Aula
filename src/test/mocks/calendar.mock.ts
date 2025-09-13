import { ICalendar, IClasses } from "../../components/calendar/calendar.interface";
import { IClassesData } from "../../types/dataClasses.interface";
import { mockClassesData, mockSingleClassData, mockClassDataWithGreve } from "./classData.mock";

const createDayFromClassData = (classData: IClassesData, day: string): IClasses => ({
  day,
  classes: classData.classes.map(cls => ({
    ...cls,
    weekDay: day,
    greve: classData.greve
  }))
});

const createConflictDay = (day: string, period: string[]): IClasses => ({
  day,
  classes: [
    ...mockClassesData.map(classData => ({
      ...classData.classes[0],
      weekDay: day,
      period
    })),
    {
      ...mockSingleClassData.classes[0],
      weekDay: day,
      period,
      className: "Química",
      classDescription: "Aula de química",
      classroom: "Lab 03"
    }
  ]
});

export const mockDayWithClasses: IClasses = createDayFromClassData(mockSingleClassData, "Segunda");
export const mockDayWithMultipleClasses: IClasses = createDayFromClassData({
  ...mockClassesData[1],
  classes: [...mockSingleClassData.classes, ...mockClassesData[1].classes]
}, "Terça");

export const mockEmptyDay: IClasses = {
  day: "Quarta",
  classes: []
};

export const mockDayWithConflictingClasses: IClasses = createConflictDay("Quinta", ["1", "2"]);

export const mockDayWithExtendedClasses: IClasses = createDayFromClassData({
  ...mockClassesData[1],
  classes: [{
    ...mockClassesData[1].classes[0],
    period: ["3", "4", "5"],
    className: "Banco de Dados",
    classDescription: "Aula de banco de dados"
  }]
}, "Sexta");

export const mockWeekendDay: IClasses = createDayFromClassData(mockSingleClassData, "Sábado");

export const mockCalendarProps: ICalendar = {
  classes: [
    mockDayWithClasses,
    mockDayWithMultipleClasses,
    mockEmptyDay
  ],
  secondaryInfo: "classroom"
};

export const mockCalendarPropsWithTeacher: ICalendar = {
  ...mockCalendarProps,
  secondaryInfo: "teacher"
};

export const mockCalendarPropsWithDescription: ICalendar = {
  ...mockCalendarProps,
  secondaryInfo: "description"
};

export const mockCalendarPropsWithWeekend: ICalendar = {
  classes: [
    mockDayWithClasses,
    mockWeekendDay,
    createDayFromClassData(mockSingleClassData, "Domingo")
  ]
};

export const mockCalendarPropsWithConflicts: ICalendar = {
  classes: [mockDayWithConflictingClasses],
  secondaryInfo: "classroom"
};

export const mockCalendarPropsWithExtended: ICalendar = {
  classes: [mockDayWithExtendedClasses],
  secondaryInfo: "classroom"
};

export const mockCalendarPropsWithGreve: ICalendar = {
  classes: [createDayFromClassData(mockClassDataWithGreve, "Segunda")],
  secondaryInfo: "classroom"
};

export const mockCalendarPropsUnsorted: ICalendar = {
  classes: [{
    day: "Segunda", 
    classes: [
      { ...mockClassesData[1].classes[0], weekDay: "Segunda", period: ["3", "4"] },
      { ...mockSingleClassData.classes[0], weekDay: "Segunda", period: ["1", "2"] },
      { ...mockSingleClassData.classes[0], weekDay: "Segunda", period: ["5", "6"], className: "História" }
    ]
  }],
  secondaryInfo: "classroom"
};

export const mockEmptyCalendarProps: ICalendar = {
  classes: [mockEmptyDay],
  secondaryInfo: "classroom"
};

export const mockMultipleConflicts: ICalendar = {
  classes: [{
    day: "Segunda",
    classes: [
      { weekDay: "Segunda", period: ["1"], teacher: "Prof A", classroom: "Sala 1", className: "Matéria A" },
      { weekDay: "Segunda", period: ["1"], teacher: "Prof B", classroom: "Sala 2", className: "Matéria B" },
      { weekDay: "Segunda", period: ["1"], teacher: "Prof C", classroom: "Sala 3", className: "Matéria C" }
    ]
  }],
  secondaryInfo: "classroom"
};

export const mockGreveProps: ICalendar = {
  classes: [createDayFromClassData(mockClassDataWithGreve, "Segunda")],
  secondaryInfo: "classroom"
};

export const mockUnsortedProps: ICalendar = {
  classes: [{
    day: "Segunda", 
    classes: [
      { weekDay: "Segunda", period: ["3"], teacher: "Prof C", classroom: "Sala 3", className: "História" },
      { weekDay: "Segunda", period: ["1"], teacher: "Prof A", classroom: "Sala 1", className: "Matemática" },
      { weekDay: "Segunda", period: ["2"], teacher: "Prof B", classroom: "Sala 2", className: "Física" }
    ]
  }],
  secondaryInfo: "classroom"
};

export const mockEmptyProps: ICalendar = {
  classes: [],
  secondaryInfo: "classroom"
};

export const mockWithMissingInfo: ICalendar = {
  classes: [{
    day: "Segunda",
    classes: [{
      weekDay: "Segunda",
      period: ["1"],
      teacher: "",
      classroom: "",
      className: "Test Class",
      classDescription: ""
    }]
  }],
  secondaryInfo: "classroom"
};
