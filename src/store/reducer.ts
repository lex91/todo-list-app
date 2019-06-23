import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import listsReducer from './lists';
import networkReducer from './network';
import authReducer from './auth';
import { IRootAction } from './types';

const reducers = {
  lists: listsReducer,
  network: networkReducer,
  auth: authReducer,
};

export default combineReducers<StateType<typeof reducers>, IRootAction>(reducers);
