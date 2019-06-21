import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';

import { createTodoList } from 'store/lists';
import { connect } from 'react-redux';

const actionCreators = { createTodoList };

interface IOwnProps extends RouteComponentProps {}

interface IStateProps {}

type IDispatchProps = typeof actionCreators;

type IProps = IOwnProps & IStateProps & IDispatchProps;

const RootPage: React.FC<IProps> = ({ createTodoList, history }) => {
  useEffect(() => {
    const newId = uuid();
    createTodoList(newId);
    history.replace(`/${newId}`);
  }, [createTodoList, history]);

  return null;
};

export default withRouter(
  connect<IStateProps, IDispatchProps, IOwnProps>(
    null,
    actionCreators,
  )(RootPage),
);
