import { ActionType, createStandardAction } from 'typesafe-actions';

const createTodoList = createStandardAction('@todo/lists/createTodoList')<string>();

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
  addTodo,
  deleteTodo,
  toggleTodo,
};

export type IActionType = ActionType<typeof actions>;
