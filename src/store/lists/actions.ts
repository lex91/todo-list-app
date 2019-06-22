import { createAsyncAction, createStandardAction } from 'typesafe-actions';

import { WithHash } from 'utils/hashable';
import { ITodoList } from 'models/todoList';

export const createTodoList = createStandardAction('@todo/lists/createTodoList')<string>();

export const saveTodoList = createAsyncAction(
  '@todo/lists/saveTodoList-request',
  '@todo/lists/saveTodoList-success',
  '@todo/lists/saveTodoList-failure',
)<WithHash<ITodoList>, WithHash<ITodoList>, WithHash<ITodoList>>();

export const updateRemoteTodoList = createStandardAction('@todo/lists/updateRemoteTodoList')<
  WithHash<ITodoList>
>();

export const waitForRemoteTodoList = createStandardAction('@todo/lists/waitForRemoteTodoList')<
  string
>();

export const clearListState = createStandardAction('@todo/lists/clearListState')<string>();

export const addTodo = createStandardAction('@todo/lists/addTodo')<{
  listId: string;
  todoId: string;
  text: string;
}>();

export const deleteTodo = createStandardAction('@todo/lists/deleteTodo')<{
  listId: string;
  todoId: string;
}>();

export const toggleTodo = createStandardAction('@todo/lists/toggleTodo')<{
  listId: string;
  todoId: string;
}>();

export const overwriteLocalListState = createStandardAction('@todo/lists/overwriteLocalListState')<
  string
>();

export const overwriteRemoteListState = createStandardAction(
  '@todo/lists/overwriteRemoteListState',
)<string>();
