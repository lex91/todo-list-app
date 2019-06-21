import { createReducer } from 'typesafe-actions';

import { actions } from './actions';
import { INetworkState } from './types';

const initialState: INetworkState = {
  isOnline: true,
  lastNetworkProblemsCount: 0,
};

const MAX_NETWORK_PROBLEMS_COUNT = 5;

export default createReducer(initialState)
  .handleAction(actions.setOnline, (state, { payload: isOnline }) => ({ ...state, isOnline }))
  .handleAction(actions.registerNetworkFail, state => ({
    isOnline: state.isOnline && state.lastNetworkProblemsCount >= MAX_NETWORK_PROBLEMS_COUNT,
    lastNetworkProblemsCount: state.lastNetworkProblemsCount + 1,
  }))
  .handleAction(actions.registerNetworkSuccess, () => ({
    isOnline: true,
    lastNetworkProblemsCount: 0,
  }));
