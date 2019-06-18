import {
  ActionCreatorsMapObject,
  bindActionCreators as bindActionCreatorsOriginal,
  Dispatch,
} from 'redux';
import { ThunkAction } from 'redux-thunk';

import { IRootAction, IRootState } from 'store';

export type IThunkAction<R = void> = ThunkAction<R, IRootState, undefined, IRootAction>;

export type IBoundActionCreators<M extends ActionCreatorsMapObject<any>> = {
  [N in keyof M]: ReturnType<M[N]> extends IThunkAction<any>
    ? (...args: Parameters<M[N]>) => ReturnType<ReturnType<M[N]>>
    : M[N];
};

export type IBindActionCreatorsWithThunk = <M extends ActionCreatorsMapObject<any>>(
  actionCreators: M,
  dispatch: Dispatch,
) => IBoundActionCreators<M>;

export const bindActionCreators = bindActionCreatorsOriginal as IBindActionCreatorsWithThunk;
