import { watchList as watchListDb, setList as setListDb } from 'services/firebase/database';
import { hash } from 'utils/hashable';
import { IThunkAction } from 'utils/redux';

import { actions } from './actions';

const watchList = (listId: string): IThunkAction<() => void> => dispatch =>
  watchListDb(listId, data =>
    dispatch(actions.updateRemoteTodoList({ listId, remoteState: data })),
  );

const saveList = (listId: string): IThunkAction<Promise<void>> => async (dispatch, getState) => {
  const listState = getState().lists[listId];
  if (!listState || !listState.local) {
    return;
  }

  const hashedLocalList = hash(listState.local);
  const prevHash = listState.remote ? listState.remote._hash : undefined;

  dispatch(actions.saveTodoList.request(hashedLocalList));

  try {
    await setListDb(hashedLocalList, prevHash);
  } catch (error) {
    dispatch(actions.saveTodoList.failure(hashedLocalList));
    return;
  }

  dispatch(actions.saveTodoList.success(hashedLocalList));
};

export const epics = {
  watchList,
  saveList,
};
