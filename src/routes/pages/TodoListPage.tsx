import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AppLayout from 'components/AppLayout';
import TopBar from 'components/TopBar';
import TodoList from 'components/TodoList';

interface IProps extends RouteComponentProps<{ id: string }> {}

const TodoListPage: React.FC<IProps> = ({ match }) => (
  <AppLayout topBar={<TopBar />} content={<TodoList listId={match.params.id} />} />
);

export default TodoListPage;
