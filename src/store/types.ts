import { StateType } from 'typesafe-actions';

import reducer from './reducer';
import { IListsActionType } from './lists';
import { INetworkActionType } from './network';

export type IRootAction = IListsActionType | INetworkActionType;

export type IRootState = StateType<typeof reducer>;
