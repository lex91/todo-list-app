import {
  watchList as watchListDb,
  setList as setListDb,
  getList as getListDb,
  isNetworkError,
} from 'services/firebase/database';
import { hash } from 'utils/hashable';
import { IThunkAction } from 'utils/redux';

import {
  updateRemoteTodoList,
  saveTodoList,
  waitForRemoteTodoList,
  clearListState,
  selectLocalTodoList,
  selectRemoteTodoList,
} from './lists';
import { registerNetworkFail, registerNetworkSuccess } from './network';

export const watchList = (listId: string): IThunkAction<() => void> => dispatch =>
  watchListDb(listId, data => dispatch(updateRemoteTodoList(data)));

export const saveList = (listId: string): IThunkAction<Promise<boolean>> => async (
  dispatch,
  getState,
) => {
  let isTransactionSucceeded = false;
  const state = getState();

  const localList = selectLocalTodoList(state, listId);
  if (!localList) {
    return isTransactionSucceeded;
  }

  const remoteList = selectRemoteTodoList(state, listId);
  const prevHash = remoteList ? remoteList._hash : undefined;
  const hashedLocalList = hash(localList);

  dispatch(saveTodoList.request(hashedLocalList));

  try {
    isTransactionSucceeded = await setListDb(hashedLocalList, prevHash);
    dispatch(registerNetworkSuccess());
  } catch (error) {
    if (isNetworkError(error)) {
      dispatch(registerNetworkFail());
    }
  }

  if (isTransactionSucceeded) {
    dispatch(saveTodoList.success(hashedLocalList));
  } else {
    dispatch(saveTodoList.failure(hashedLocalList));
  }

  return isTransactionSucceeded;
};

export const loadList = (listId: string): IThunkAction<Promise<boolean>> => async dispatch => {
  dispatch(waitForRemoteTodoList(listId));

  let result = null;

  try {
    result = await getListDb(listId);
    dispatch(registerNetworkSuccess());
  } catch (error) {
    if (isNetworkError(error)) {
      dispatch(registerNetworkFail());
    }
  }

  if (result) {
    dispatch(updateRemoteTodoList(result));
  } else {
    dispatch(clearListState(listId));
  }

  return Boolean(result);
};

export const appInit = (): IThunkAction<Promise<void>> => async (dispatch, getState) => {
  Object.entries(getState().lists).forEach(([_key, listState]) => {
    if (listState.pending) {
      dispatch(saveTodoList.failure(listState.pending));
    }
  });
};
