import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RootPage from '../pages/RootPage';
import TodoListPage from '../pages/TodoListPage';
import MergeTodoListPage from '../pages/MergeTodoListPage';
import ExperimentsPage from '../pages/ExperimentsPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <PrivateRoute path="/:id/merge" exact component={MergeTodoListPage} />
      <PrivateRoute path="/:id" exact component={TodoListPage} />
      <PrivateRoute path="/" exact component={RootPage} />
      {/* FIXME: просто `/experiments` удовлетворяет сразу двум роутам */}
      <Route path="/experiments/1" exact component={ExperimentsPage} />
    </BrowserRouter>
  );
};

export default AppRouter;
