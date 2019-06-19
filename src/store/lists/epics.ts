import {
  watchList as watchListDb,
  setList as setListDb,
  getList as getListDb,
} from 'services/firebase/database';
import { hash } from 'utils/hashable';
import { IThunkAction } from 'utils/redux';

import { selectLocalTodoList, selectRemoteTodoList } from './selectors';
import { actions } from './actions';

const watchList = (listId: string): IThunkAction<() => void> => dispatch =>
  watchListDb(listId, data => dispatch(actions.updateRemoteTodoList(data)));

const saveList = (listId: string): IThunkAction<Promise<boolean>> => async (dispatch, getState) => {
  let isTransactionSucceeded = false;
  const state = getState();

  const localList = selectLocalTodoList(state, listId);
  if (!localList) {
    return isTransactionSucceeded;
  }

  const remoteList = selectRemoteTodoList(state, listId);
  const prevHash = remoteList ? remoteList._hash : undefined;
  const hashedLocalList = hash(localList);

  dispatch(actions.saveTodoList.request(hashedLocalList));

  // TODO: move try-catch to `database`?
  try {
    isTransactionSucceeded = await setListDb(hashedLocalList, prevHash);
  } catch (error) {
    // Firebase Error, just leave `isTransactionSucceded` in false state
  }

  if (isTransactionSucceeded) {
    dispatch(actions.saveTodoList.success(hashedLocalList));
  } else {
    dispatch(actions.saveTodoList.failure(hashedLocalList));
  }

  return isTransactionSucceeded;
};

const loadList = (listId: string): IThunkAction<Promise<boolean>> => async dispatch => {
  dispatch(actions.waitForRemoteTodoList(listId));

  let result = null;
  // TODO: move try-catch to `database`?
  try {
    result = await getListDb(listId);
  } catch (error) {
    // Firebase Error, just leave `result` in null state
  }

  if (result) {
    dispatch(actions.updateRemoteTodoList(result));
  } else {
    dispatch(actions.clearListState(listId));
  }

  return Boolean(result);
};

export const epics = {
  watchList,
  saveList,
  loadList,
};
