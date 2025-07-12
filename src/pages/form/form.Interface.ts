export interface IClassTag {
  selected?: boolean;
  title?: string;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
