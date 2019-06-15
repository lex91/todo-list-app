import { createReducer } from 'typesafe-actions';

import { createHashable } from 'utils/hashable';

import { actions } from './actions';
import { IState } from './types';

const initialState: IState = {};

export default createReducer(initialState)
  .handleAction(actions.createTodoList, (state, { payload: id }) => {
    const isListExists = Boolean(state[id]);
    if (isListExists) {
      console.warn('list exists');
      return state;
    }

    return {
      ...state,
      [id]: {
        local: createHashable({ id, items: [] }),
      },
    };
  })
  .handleAction(actions.addTodo, (state, { payload: { listId, todoId, text } }) => {
    const list = state[listId] && state[listId].local;
    if (!list) {
      console.warn('no list');
      return state;
    }

    const items = [
      ...list.data.items,
      createHashable({
        id: todoId,
        text,
        isDone: false,
      }),
    ];

    return {
      ...state,
      [listId]: {
        ...state[listId],
        local: createHashable({
          id: listId,
          items,
        }),
      },
    };
  })
  .handleAction(actions.deleteTodo, (state, { payload: { listId, todoId } }) => {
    const list = state[listId] && state[listId].local;
    if (!list) {
      console.warn('no list');
      return state;
    }

    const items = list.data.items.filter(({ data }) => data.id !== todoId);

    return {
      ...state,
      [listId]: {
        ...state[listId],
        local: createHashable({
          id: listId,
          items,
        }),
      },
    };
  })
  .handleAction(actions.toggleTodo, (state, { payload: { listId, todoId } }) => {
    const list = state[listId] && state[listId].local;
    if (!list) {
      console.warn('no list');
      return state;
    }

    const items = list.data.items.map(item =>
      item.data.id === todoId
        ? createHashable({
            id: item.data.id,
            text: item.data.text,
            isDone: !item.data.isDone,
          })
        : item,
    );

    return {
      ...state,
      [listId]: {
        ...state[listId],
        local: createHashable({
          id: listId,
          items,
        }),
      },
    };
  });
