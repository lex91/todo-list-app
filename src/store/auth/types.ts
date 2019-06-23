import { ActionType } from 'typesafe-actions';

export interface IAuthState {
  isAuthenticated: boolean;
}

export type IAuthActionType = ActionType<typeof import('./actions')>;
