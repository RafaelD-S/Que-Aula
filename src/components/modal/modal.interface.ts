import { ReactNode } from "react";

export interface IModal {
  children: ReactNode;
  isClosable?: boolean;
  position?: "absolute" | "fixed";
  onOverlayClick?: (e: React.MouseEvent) => void;
}
