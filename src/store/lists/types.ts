import { ITodoList } from 'models/todoList';
import { WithHash } from 'utils/hashable';

export interface IState {
  [id: string]: {
    local?: ITodoList;
    remote?: WithHash<ITodoList>;
    // queued?: ITodoList;
    // pending?: WithHash<ITodoList>;
  };
}
