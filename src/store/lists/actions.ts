import { ActionType, createAsyncAction, createStandardAction } from 'typesafe-actions';

import { WithHash } from 'utils/hashable';
import { ITodoList } from 'models/todoList';

const createTodoList = createStandardAction('@todo/lists/createTodoList')<string>();

const saveTodoList = createAsyncAction(
  '@todo/lists/saveTodoList-request',
  '@todo/lists/saveTodoList-success',
  '@todo/lists/saveTodoList-failure',
)<WithHash<ITodoList>, WithHash<ITodoList>, WithHash<ITodoList>>();

const updateRemoteTodoList = createStandardAction('@todo/lists/updateRemoteTodoList')<{
  listId: string;
  remoteState: WithHash<ITodoList>;
}>();

const waitForRemoteTodoList = createStandardAction('@todo/lists/waitForRemoteTodoList')<string>();

const clearListState = createStandardAction('@todo/lists/clearListState')<string>();

const addTodo = createStandardAction('@todo/lists/addTodo')<{
  listId: string;
  todoId: string;
  text: string;
}>();

const deleteTodo = createStandardAction('@todo/lists/deleteTodo')<{
  listId: string;
  todoId: string;
}>();

const toggleTodo = createStandardAction('@todo/lists/toggleTodo')<{
  listId: string;
  todoId: string;
}>();

export const actions = {
  createTodoList,
  saveTodoList,
  updateRemoteTodoList,
  waitForRemoteTodoList,
  clearListState,
  addTodo,
  deleteTodo,
  toggleTodo,
};

export type IActionType = ActionType<typeof actions>;
