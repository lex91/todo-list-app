import { IHashable } from 'utils/hashable';

export type ITodoListItem = IHashable<{
  id: string;
  isDone: boolean;
  text: string;
}>;

export type ITodoList = IHashable<{
  id: string;
  items: ITodoListItem[];
}>;
