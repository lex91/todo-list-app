import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { ITodoList } from 'models/todoList';
import { IRootState } from 'store';
import { actions, selectLocalTodoList } from 'store/lists';

import TodoListComponent from './TodoListComponent';

const actionCreators = {
  addTodo: actions.addTodo,
  deleteTodo: actions.deleteTodo,
  toggleTodo: actions.toggleTodo,
};

interface IOwnProps {
  listId: string;
}

interface IStateProps {
  list?: ITodoList;
}

type IDispatchProps = typeof actionCreators;

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

const TodoListContainer: React.FC<IProps> = ({ listId, list, addTodo, deleteTodo, toggleTodo }) => {
  const handleAdd = useCallback((text: string) => addTodo({ listId, todoId: uuid(), text }), [
    listId,
    addTodo,
  ]);

  const handleToggle = useCallback((todoId: string) => toggleTodo({ listId, todoId }), [
    listId,
    toggleTodo,
  ]);

  const handleDelete = useCallback((todoId: string) => deleteTodo({ listId, todoId }), [
    listId,
    deleteTodo,
  ]);

  if (!list) {
    // TODO: add <NoDataComponent>
    return null;
  }

  return (
    <TodoListComponent
      list={list}
      onAdd={handleAdd}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  );
};

export default connect<IStateProps, IDispatchProps, IOwnProps, IRootState>(
  (state, ownProps) => ({
    list: selectLocalTodoList(state, ownProps.listId),
  }),
  actionCreators,
)(TodoListContainer);
