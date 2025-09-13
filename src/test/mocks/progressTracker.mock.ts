import { IProgressTrackerProps } from "../../components/progressTracker/progressTracker.interface";

export const mockProgressTrackerPropsDefault: IProgressTrackerProps = {
  classesAmount: 10,
  checkedAmount: 7,
};

export const mockProgressTrackerPropsEmpty: IProgressTrackerProps = {
  classesAmount: 0,
  checkedAmount: 0,
};

export const mockProgressTrackerPropsZeroProgress: IProgressTrackerProps = {
  classesAmount: 15,
  checkedAmount: 0,
};

export const mockProgressTrackerPropsFullProgress: IProgressTrackerProps = {
  classesAmount: 8,
  checkedAmount: 8,
};

export const mockProgressTrackerPropsPartial: IProgressTrackerProps = {
  classesAmount: 3,
  checkedAmount: 1,
};

export const mockProgressTrackerPropsLarge: IProgressTrackerProps = {
  classesAmount: 100,
  checkedAmount: 73,
};

export const mockProgressTrackerTestCases = [
  {
    name: "default scenario",
    props: mockProgressTrackerPropsDefault,
    expectedPercentage: 70,
  },
  {
    name: "empty classes",
    props: mockProgressTrackerPropsEmpty,
    expectedPercentage: 0,
  },
  {
    name: "zero progress",
    props: mockProgressTrackerPropsZeroProgress,
    expectedPercentage: 0,
  },
  {
    name: "full progress",
    props: mockProgressTrackerPropsFullProgress,
    expectedPercentage: 100,
  },
  {
    name: "partial progress",
    props: mockProgressTrackerPropsPartial,
    expectedPercentage: 33,
  },
  {
    name: "large numbers",
    props: mockProgressTrackerPropsLarge,
    expectedPercentage: 73,
  },
];
