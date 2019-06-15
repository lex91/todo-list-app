import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import RootPage from './pages/RootPage';
import TodoListPage from './pages/TodoListPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/:id" exact component={TodoListPage} />
      <Route path="/" exact component={RootPage} />
    </BrowserRouter>
  );
};

export default AppRouter;
