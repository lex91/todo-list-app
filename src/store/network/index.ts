import reducer from './reducer';

export { actions } from './actions';
export * from './selectors';
export * from './types';

export type INetworkActionType = import('./actions').IActionType;

export default reducer;
