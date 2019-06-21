import { ActionType } from 'typesafe-actions';

export interface INetworkState {
  isOnline: boolean;
  lastNetworkProblemsCount: number;
}

export type INetworkActionType = ActionType<typeof import('./actions')>;
