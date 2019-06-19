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

export const selectTrackedListIds = (state: IRootState): string[] => Object.keys(state.lists);

export const selectShouldSaveList = (state: IRootState, listId: string): boolean => {
  const dataForId = state.lists[listId];
  return Boolean(
    dataForId && dataForId.hasLocalChanges && !dataForId.hasRemoteChanges && !dataForId.pending,
  );
};
