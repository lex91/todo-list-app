export interface ITodoList {
  id: string;
  items: ITodoListItem[];
}

export interface ITodoListItem {
  id: string;
  text: string;
  isDone: boolean;
}
