import React from 'react';

import AppLayout from 'components/AppLayout';
import TopBar from 'components/TopBar';
import TodoList from 'components/TodoList';

interface IProps {}

const RootComponent: React.FC<IProps> = () => (
  <AppLayout
    topBar={<TopBar />}
    content={
      <TodoList
        list={{
          id: '123',
          items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({
            id: String(i),
            text: `TODO #${i}`,
            isDone: Boolean(i % 3),
          })),
        }}
      />
    }
  />
);

export default RootComponent;
