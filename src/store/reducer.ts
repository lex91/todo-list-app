import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import listsReducer from './lists';
import networkReducer from './network';
import { IRootAction } from './types';

const reducers = {
  lists: listsReducer,
  network: networkReducer,
};

export default combineReducers<StateType<typeof reducers>, IRootAction>(reducers);
