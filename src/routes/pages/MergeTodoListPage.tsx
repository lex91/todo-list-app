import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Paper, Typography } from '@material-ui/core';

import { IRootState } from 'store';
import { selectLocalTodoList } from 'store/lists';
import { ITodoList } from 'models/todoList';
import AppLayout from 'components/AppLayout';

interface IOwnProps extends RouteComponentProps<{ id: string }> {}

interface IStateProps {
  list?: ITodoList;
}

type IDispatchProps = {};

type IProps = IOwnProps & IStateProps & IDispatchProps;

const MergeTodoListPage: React.FC<IProps> = ({ list, match, history }) => {
  const id = match.params.id;

  useEffect(() => {
    if (!list) {
      history.replace(`/${id}`);
    }
  }, [history, id, list]);

  return (
    <AppLayout>
      {list ? (
        <Paper>
          <Typography variant="h3">This page is under construction :(</Typography>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {
              history.goBack();
            }}
          >
            Go back
          </Button>
        </Paper>
      ) : null}
    </AppLayout>
  );
};

export default withRouter(
  connect<IStateProps, IDispatchProps, IOwnProps, IRootState>((state, ownProps) => ({
    list: selectLocalTodoList(state, ownProps.match.params.id),
  }))(MergeTodoListPage),
);
