import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { appInit } from 'store/epics';
import { bindActionCreators, IBoundActionCreators } from 'utils/redux';

import AppRouter from 'routes/AppRouter';

const actionCreators = { appInit };

interface IOwnProps {}

interface IStateProps {}

type IDispatchProps = IBoundActionCreators<typeof actionCreators>;

type IProps = IOwnProps & IStateProps & IDispatchProps;

const Root: React.FC<IProps> = ({ appInit }) => {
  const [isAppInited, setAppInited] = useState(false);

  useEffect(() => {
    appInit().then(() => {
      setAppInited(true);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return isAppInited ? <AppRouter /> : null;
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(
  null,
  dispatch => bindActionCreators(actionCreators, dispatch),
)(Root);
