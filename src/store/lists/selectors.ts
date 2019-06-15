import { ITodoList } from 'models/todoList';

import { IRootState } from '../types';

export const selectLocalTodoList = (state: IRootState, listId: string): ITodoList | undefined => {
  const dataForId = state.lists[listId];
  return dataForId && dataForId.local;
};
