import { IClassTag } from "../../pages/form/form.Interface";
import { commonTestData } from "./common.mock";

export const mockClassTagPropsDefault: IClassTag = {
  selected: false,
  title: "title",
  loading: false
};

export const mockClassTagPropsSelected: IClassTag = {
  ...mockClassTagPropsDefault,
  selected: true
};

export const mockClassTagPropsLoading: IClassTag = {
  ...mockClassTagPropsDefault,
  loading: true
};

export const mockClassTagPropsComplete: IClassTag = {
  title: "Complete Test",
  selected: true,
  loading: true
};

export const mockClassTagPropsCustom = (title: string): IClassTag => ({
  ...mockClassTagPropsDefault,
  title
});

export const mockClassTagTitles = commonTestData.classNames;
