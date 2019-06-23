import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, RouteProps } from 'react-router';

import { IRootState } from 'store';
import { selectIsAuthenticated } from 'store/auth';
import LoginPage from '../pages/LoginPage';

interface IStateProps {
  isAuthenticated: boolean;
}

interface IDispatchProps {}

interface IOwnProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

interface IProps extends IOwnProps, IStateProps {}

const PrivateRoute: React.FC<IProps> = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <LoginPage />)} />
);

export default connect<IStateProps, IDispatchProps, IOwnProps, IRootState>(state => ({
  isAuthenticated: selectIsAuthenticated(state),
}))(PrivateRoute);
