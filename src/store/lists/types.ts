import { ActionType } from 'typesafe-actions';

import { ITodoList } from 'models/todoList';
import { WithHash } from 'utils/hashable';

export interface IListsState {
  [id: string]: IListState;
}

export interface IListState {
  local?: ITodoList;
  remote?: WithHash<ITodoList>;
  pending?: WithHash<ITodoList>;
  hasLocalChanges?: boolean;
  hasRemoteChanges?: boolean;
}

export type IListsActionType = ActionType<typeof import('./actions')>;
