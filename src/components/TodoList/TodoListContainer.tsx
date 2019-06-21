import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import { ITodoList } from 'models/todoList';
import { IRootState } from 'store';
import { addTodo, deleteTodo, toggleTodo } from 'store/lists';
import { bindActionCreators, IBoundActionCreators } from 'utils/redux';

import TodoListComponent from './TodoListComponent';

const actionCreators = {
  addTodo,
  deleteTodo,
  toggleTodo,
};

interface IOwnProps {
  list: ITodoList;
}

interface IStateProps {}

type IDispatchProps = IBoundActionCreators<typeof actionCreators>;

interface IProps extends IOwnProps, IStateProps, IDispatchProps {}

const TodoListContainer: React.FC<IProps> = ({ list, addTodo, deleteTodo, toggleTodo }) => {
  const listId = list.data.id;

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
  null,
  dispatch => bindActionCreators(actionCreators, dispatch),
)(TodoListContainer);
