import { createReducer } from 'typesafe-actions';

import { addTodo } from './actions';
import { IState } from './types';

const initialState: IState = {
  active: null,
  byId: {},
};

export default createReducer(initialState).handleAction(addTodo, (state, _action) => state);
