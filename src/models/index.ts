export interface ITodoList {
  id: string;
  items: ITodoListItem[];
}

export interface ITodoListItem {
  id: string;
  text: string;
  isDone: boolean;
}

export const createTodoListItem = (text: string): ITodoListItem => ({
  text,
  isDone: false,
  id: Math.random().toString(), // TODO: use guid?
});
