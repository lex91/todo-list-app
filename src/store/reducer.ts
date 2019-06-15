import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import listsReducer from './lists';
import { IRootAction } from './types';

const reducers = {
  lists: listsReducer,
};

export default combineReducers<StateType<typeof reducers>, IRootAction>(reducers);
