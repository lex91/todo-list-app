import React from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import RootPage from '../pages/RootPage';
import TodoListPage from '../pages/TodoListPage';
import MergeTodoListPage from '../pages/MergeTodoListPage';
import ExperimentsPage from '../pages/ExperimentsPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/experiments" component={ExperimentsPage} />
          <PrivateRoute path="/" exact component={RootPage} />
          <PrivateRoute path="/:id" exact component={TodoListPage} />
          <PrivateRoute path="/:id/merge" exact component={MergeTodoListPage} />
        </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
