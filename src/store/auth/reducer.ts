import { createReducer } from 'typesafe-actions';

import { setIsAuthenticated } from './actions';
import { IAuthState } from './types';

const initialState: IAuthState = {
  isAuthenticated: false,
};

export default createReducer(initialState).handleAction(
  setIsAuthenticated,
  (state, { payload: isAuthenticated }) => ({ isAuthenticated }),
);
