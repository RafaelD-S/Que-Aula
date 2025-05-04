export interface IClassItem {
  name?: string; //INF028
  description?: string; //Algoritmos e Lógica de Programação
  prerequisites?: string[]; //INF027
  credit?: string; // 60 - 3
  state?: string; // default, disabled, selected
}

export interface IClassItemProps {
  data: IClassItem;
  onStateChange: (itemName: string | undefined, newState: string) => void;
}
