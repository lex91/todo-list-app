import { ITodoList } from 'models/todoList';
import { WithHash } from 'utils/hashable';

import { IListsSyncInfo } from './types';
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

export const selectListsSyncInfo = (state: IRootState): IListsSyncInfo =>
  Object.entries(state.lists).reduce(
    (acc, [id, listState]) => {
      if (listState.hasRemoteChanges) {
        acc.conflicts.push(id);
      } else if (listState.hasLocalChanges) {
        acc.unsaved.push(id);
      }

      return acc;
    },
    { conflicts: [], unsaved: [] } as IListsSyncInfo,
  );

export const selectShouldSaveList = (state: IRootState, listId: string): boolean => {
  const dataForId = state.lists[listId];
  return Boolean(
    dataForId && dataForId.hasLocalChanges && !dataForId.hasRemoteChanges && !dataForId.pending,
  );
};
