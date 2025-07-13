export interface IDropdown {
  setNavSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  switchWeekday: (num: number) => void;
  dropdownItems: string[];
  navSwitch: boolean;
}
