import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          TODO
        </Button>
      ) : null}
    </AppLayout>
  );
};

export default withRouter(
  connect<IStateProps, IDispatchProps, IOwnProps, IRootState>((state, ownProps) => ({
    list: selectLocalTodoList(state, ownProps.match.params.id),
  }))(MergeTodoListPage),
);
