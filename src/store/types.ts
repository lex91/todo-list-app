import { StateType } from 'typesafe-actions';

import reducer from './reducer';
import { IActionType } from './lists';
import { INetworkActionType } from './network';

export type IRootAction = IActionType | INetworkActionType;

export type IRootState = StateType<typeof reducer>;
