import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RootPage from '../pages/RootPage';
import TodoListPage from '../pages/TodoListPage';
import MergeTodoListPage from '../pages/MergeTodoListPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <PrivateRoute path="/:id/merge" exact component={MergeTodoListPage} />
      <PrivateRoute path="/:id" exact component={TodoListPage} />
      <PrivateRoute path="/" exact component={RootPage} />
    </BrowserRouter>
  );
};

export default AppRouter;
