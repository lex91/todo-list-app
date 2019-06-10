import { IRootAction } from './action';

declare module 'typesafe-actions' {
  interface Types {
    RootAction: IRootAction;
  }
}
