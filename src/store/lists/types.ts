import { ITodoList } from 'models';

export interface IState {
  active: ITodoList | null;
  byId: { [id: string]: ITodoList };
}
