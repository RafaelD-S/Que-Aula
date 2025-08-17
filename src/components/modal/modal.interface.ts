import { ReactNode } from "react";

export interface IModal {
  children: ReactNode;
  isClosable?: boolean;
  onOverlayClick?: (e: React.MouseEvent) => void;
}
