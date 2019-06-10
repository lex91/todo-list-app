import React from 'react';
import { Paper, makeStyles, Theme, List } from '@material-ui/core';

import AddTodo from 'components/AddTodo';
import TodoItem from 'components/TodoItem';
import { ITodoList } from 'models';

interface IProps {
  list: ITodoList;
}

const TodoList: React.FC<IProps> = ({ list }) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.content}>
        <AddTodo onSubmit={(text: string) => console.log(`add ${text}!`)} />
      </Paper>

      <Paper className={classes.content}>
        <List>
          {list.items.map(({ id, text, isDone }) => (
            <TodoItem
              key={id}
              text={text}
              isDone={isDone}
              onClick={() => console.log(`toggle ${id}!`)}
              onDelete={() => console.log(`delete ${id}!`)}
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

export default TodoList;
