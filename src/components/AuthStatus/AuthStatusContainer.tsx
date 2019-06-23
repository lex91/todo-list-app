import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'store';
import { selectIsAuthenticated } from 'store/auth';
import { IBoundActionCreators } from 'utils/redux';
import { auth } from 'services/firebase/app';

import AuthStatusComponent from './AuthStatusComponent';

const actionCreators = {};

interface IOwnProps {}

interface IStateProps {
  isAuthenticated: boolean;
}

type IDispatchProps = IBoundActionCreators<typeof actionCreators>;

type IProps = IOwnProps & IStateProps & IDispatchProps;

const AuthStatusContainer: React.FC<IProps> = ({ isAuthenticated }) => {
  const handleLogout = useCallback(() => {
    auth.signOut();
  }, []);

  return <AuthStatusComponent isAuthenticated={isAuthenticated} onLogout={handleLogout} />;
};

export default connect<IStateProps, IDispatchProps, IOwnProps, IRootState>(state => ({
  isAuthenticated: selectIsAuthenticated(state),
}))(AuthStatusContainer);
