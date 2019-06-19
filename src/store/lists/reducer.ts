import { createReducer } from 'typesafe-actions';

import { createHashable } from 'utils/hashable';

import { actions } from './actions';
import { IListsState } from './types';

const initialState: IListsState = {};

export default createReducer(initialState)
  .handleAction(actions.createTodoList, (state, { payload: id }) => {
    const isListExists = Boolean(state[id]);
    if (isListExists) {
      return state;
    }

    return {
      ...state,
      [id]: {
        local: createHashable({ id, items: [] }),
        hasLocalChanges: true,
      },
    };
  })
  .handleAction(actions.saveTodoList.request, (state, { payload: list }) => {
    const id = list.data.id;
    const listState = state[id];

    if (!listState || !listState.local) {
      return state;
    }

    return {
      ...state,
      [id]: {
        ...listState,
        pending: list,
        hasLocalChanges: false,
      },
    };
  })
  .handleAction(actions.saveTodoList.success, (state, { payload: list }) => {
    const id = list.data.id;
    const listState = state[id];

    if (!listState || !listState.pending) {
      return state;
    }

    return {
      ...state,
      [id]: {
        ...listState,
        pending: undefined,
        remote: list,
      },
    };
  })
  .handleAction(actions.saveTodoList.failure, (state, { payload: list }) => {
    const id = list.data.id;
    const listState = state[id];

    if (!listState || !listState.pending) {
      return state;
    }

    return {
      ...state,
      [id]: {
        ...listState,
        pending: undefined,
        hasLocalChanges: true,
      },
    };
  })
  .handleAction(actions.updateRemoteTodoList, (state, { payload: remoteState }) => {
    const listId = remoteState.data.id;
    const listState = state[listId];
    if (!listState) {
      return state;
    }

    const shouldReplaceLocalState = !listState.hasLocalChanges && !listState.pending;
    const hasRemoteChanges =
      listState.remote &&
      listState.local &&
      !shouldReplaceLocalState &&
      !(
        listState.remote._hash === remoteState._hash ||
        (listState.pending && listState.pending._hash === remoteState._hash) ||
        listState.local._hash === remoteState._hash
      );

    return {
      ...state,
      [listId]: {
        ...listState,
        remote: remoteState,
        hasRemoteChanges,
        local: shouldReplaceLocalState ? remoteState : listState.local,
      },
    };
  })
  .handleAction(actions.waitForRemoteTodoList, (state, { payload: id }) => {
    const isListExists = Boolean(state[id]);
    if (isListExists) {
      return state;
    }

    return {
      ...state,
      [id]: {},
    };
  })
  .handleAction(actions.clearListState, (state, { payload: id }) =>
    Object.entries(state)
      .filter(([key]) => key !== id)
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as IListsState,
      ),
  )
  .handleAction(actions.addTodo, (state, { payload: { listId, todoId, text } }) => {
    const list = state[listId] && state[listId].local;
    if (!list) {
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
        hasLocalChanges: true,
      },
    };
  })
  .handleAction(actions.deleteTodo, (state, { payload: { listId, todoId } }) => {
    const list = state[listId] && state[listId].local;
    if (!list) {
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
        hasLocalChanges: true,
      },
    };
  })
  .handleAction(actions.toggleTodo, (state, { payload: { listId, todoId } }) => {
    const list = state[listId] && state[listId].local;
    if (!list) {
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
        hasLocalChanges: true,
      },
    };
  });
