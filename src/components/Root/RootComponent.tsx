import React from 'react';

import AppLayout from 'components/AppLayout';
import TopBar from 'components/TopBar';
import TodoList from 'components/TodoList';
import { store } from 'store';
import { actions } from 'store/lists';

interface IProps {}

store.dispatch(actions.createTodoList('test1'));

const RootComponent: React.FC<IProps> = () => (
  <AppLayout topBar={<TopBar />} content={<TodoList listId="test1" />} />
);

export default RootComponent;
