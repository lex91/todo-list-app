import { StateType } from 'typesafe-actions';

import reducer from './reducer';
import { IActionType } from './lists';

export type IRootAction = IActionType;

export type IRootState = StateType<typeof reducer>;
