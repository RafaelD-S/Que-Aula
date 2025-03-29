export interface IDropdown {
  setNavSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  switchWeekday: React.Dispatch<React.SetStateAction<number>>;
  dropdownItems: string[];
  navSwitch: boolean;
}
