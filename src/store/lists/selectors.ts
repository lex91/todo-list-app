import { ITodoList } from 'models/todoList';
import { WithHash } from 'utils/hashable';

import { IRootState } from '../types';

export const selectLocalTodoList = (state: IRootState, listId: string): ITodoList | undefined => {
  const dataForId = state.lists[listId];
  return dataForId && dataForId.local;
};

export const selectRemoteTodoList = (
  state: IRootState,
  listId: string,
): WithHash<ITodoList> | undefined => {
  const dataForId = state.lists[listId];
  return dataForId && dataForId.remote;
};
