import { StateType } from 'typesafe-actions';

import reducer from './reducer';
import { IListsActionType } from './lists';
import { INetworkActionType } from './network';
import { IAuthActionType } from './auth';

export type IRootAction = IListsActionType | INetworkActionType | IAuthActionType;

export type IRootState = StateType<typeof reducer>;
