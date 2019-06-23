import React from 'react';
import { Button } from '@material-ui/core';

interface IProps {
  isAuthenticated: boolean;
  onLogout(): void;
}

const AuthStatusComponent: React.FC<IProps> = ({ isAuthenticated, onLogout }) =>
  isAuthenticated ? (
    <Button variant="contained" color="primary" onClick={onLogout}>
      Logout
    </Button>
  ) : null;

export default AuthStatusComponent;
