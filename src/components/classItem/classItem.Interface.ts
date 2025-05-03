export interface IClassItem {
  name?: string; //INF028
  description?: string; //Algoritmos e Lógica de Programação
  prerequisites?: string[]; //INF027
  credit?: string; // 60 - 3
  state?: number; //0 = Default, 1 = Disabled, 2 = Selected
}
