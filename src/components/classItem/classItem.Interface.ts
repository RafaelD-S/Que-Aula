export interface IClassItem {
  name?: string;
  description?: string;
  prerequisites?: string[];
  credit?: string;
  state?: string;
}

export interface IClassItemProps {
  data: IClassItem;
  onStateChange: (itemName: string | undefined, newState: string) => void;
}
