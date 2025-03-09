import { ReactNode } from "react";

export interface IWarning {
  children: ReactNode;
  message: string;
  buttonLabel?: string;
  onClickButton?: () => void;
  disabled?: boolean;
}
