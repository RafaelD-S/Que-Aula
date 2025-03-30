import { ReactNode } from "react";

export interface IWarning {
  children?: ReactNode;
  message: string;
  buttonLabel?: string;
  onClickButton?: () => void;
  disabled?: boolean;
  opened?: boolean;
  isClosable?: boolean;
  type?: "warning" | "info";
}
