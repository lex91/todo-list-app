import React from 'react';
import { Paper, makeStyles, Theme, List } from '@material-ui/core';

import AddTodo from 'components/AddTodo';
import TodoItem from 'components/TodoItem';
import { ITodoList } from 'models/todoList';

interface IProps {
  list: ITodoList;
  onAdd(text: string): void;
  onToggle(id: string): void;
  onDelete(id: string): void;
}

const TodoListComponent: React.FC<IProps> = ({ list, onAdd, onToggle, onDelete }) => {
  const classes = useStyles();

  const { items } = list.data;

  return (
    <>
      <Paper className={classes.content}>
        <AddTodo onSubmit={onAdd} />
      </Paper>

      <Paper className={classes.content}>
        <List>
          {items.map(({ data: { id, text, isDone } }) => (
            <TodoItem
              key={id}
              text={text}
              isDone={isDone}
              onClick={() => onToggle(id)}
              onDelete={() => onDelete(id)}
            />
          ))}
        </List>
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  actionButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default TodoListComponent;
