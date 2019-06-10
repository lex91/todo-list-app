import { ActionType, createStandardAction } from 'typesafe-actions';

import { createTodoListItem } from 'models';

export const addTodo = createStandardAction('@todo/ADD_TODO').map((text: string) => ({
  payload: createTodoListItem(text),
}));

export type IActionType = ActionType<typeof addTodo>;
