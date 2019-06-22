import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { IRootState } from 'store';
import { selectLocalTodoList } from 'store/lists';
import { loadList } from 'store/epics';
import { bindActionCreators, IBoundActionCreators } from 'utils/redux';
import { ITodoList } from 'models/todoList';
import AppLayout from 'components/AppLayout';
import TodoList from 'components/TodoList';

const actionCreators = { loadList };

interface IOwnProps extends RouteComponentProps<{ id: string }> {}

interface IStateProps {
  list?: ITodoList;
}

type IDispatchProps = IBoundActionCreators<typeof actionCreators>;

type IProps = IOwnProps & IStateProps & IDispatchProps;

const TodoListPage: React.FC<IProps> = ({ match, loadList, list }) => {
  const id = match.params.id;

  const [loadFailed, setLoadFailed] = useState(false);

  // Loading only once per id
  useEffect(() => {
    setLoadFailed(false);
    if (!list) {
      (async () => {
        setLoadFailed(!(await loadList(id)));
      })();
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppLayout>
      {list ? (
        <TodoList list={list} />
      ) : (
        // TODO: Add better UI for `loading` and `loadFailed` states
        <Typography variant="h4">{loadFailed ? 'Load failed' : 'List is loading'}</Typography>
      )}
    </AppLayout>
  );
};

export default withRouter(
  connect<IStateProps, IDispatchProps, IOwnProps, IRootState>(
    (state, ownProps) => ({
      list: selectLocalTodoList(state, ownProps.match.params.id),
    }),
    dispatch => bindActionCreators(actionCreators, dispatch),
  )(TodoListPage),
);
