import { createReducer } from 'typesafe-actions';

import { registerNetworkFail, registerNetworkSuccess, setOnline } from './actions';
import { INetworkState } from './types';

const initialState: INetworkState = {
  isOnline: true,
  lastNetworkProblemsCount: 0,
};

const MAX_NETWORK_PROBLEMS_COUNT = 5;

export default createReducer(initialState)
  .handleAction(setOnline, (state, { payload: isOnline }) => ({ ...state, isOnline }))
  .handleAction(registerNetworkFail, state => ({
    isOnline: state.isOnline && state.lastNetworkProblemsCount >= MAX_NETWORK_PROBLEMS_COUNT,
    lastNetworkProblemsCount: state.lastNetworkProblemsCount + 1,
  }))
  .handleAction(registerNetworkSuccess, () => ({
    isOnline: true,
    lastNetworkProblemsCount: 0,
  }));
