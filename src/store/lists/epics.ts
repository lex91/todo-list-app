import { watchList as watchListDb, setList as setListDb } from 'services/firebase/database';
import { hash } from 'utils/hashable';
import { IThunkAction } from 'utils/redux';

import { selectLocalTodoList, selectRemoteTodoList } from './selectors';
import { actions } from './actions';

const watchList = (listId: string): IThunkAction<() => void> => dispatch =>
  watchListDb(listId, data =>
    dispatch(actions.updateRemoteTodoList({ listId, remoteState: data })),
  );

const saveList = (listId: string): IThunkAction<Promise<void>> => async (dispatch, getState) => {
  const state = getState();

  const localList = selectLocalTodoList(state, listId);
  if (!localList) {
    return;
  }

  const remoteList = selectRemoteTodoList(state, listId);
  const prevHash = remoteList ? remoteList._hash : undefined;
  const hashedLocalList = hash(localList);

  dispatch(actions.saveTodoList.request(hashedLocalList));

  let isTransactionSucceded = false;
  try {
    isTransactionSucceded = await setListDb(hashedLocalList, prevHash);
  } catch (error) {
    // Firebase Error, just leave `isTransactionSucceded` in false state
  }

  if (isTransactionSucceded) {
    dispatch(actions.saveTodoList.success(hashedLocalList));
  } else {
    dispatch(actions.saveTodoList.failure(hashedLocalList));
  }
};

export const epics = {
  watchList,
  saveList,
};
