export interface IClassItem {
  name?: string;
  description?: string;
  requiredFor?: string[];
  credit?: string;
  state?: string;
  semester?: number;
}

export interface IClassItemProps {
  data?: IClassItem;
  onStateChange?: (itemName: string | undefined, newState: string) => void;
  loading?: boolean;
}
