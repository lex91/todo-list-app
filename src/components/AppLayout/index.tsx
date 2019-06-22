import React from 'react';
import { AppBar, Container } from '@material-ui/core';

import TopBar from 'components/TopBar';

interface IProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<IProps> = ({ children }) => (
  <>
    <AppBar color="primary" position="sticky">
      <Container maxWidth="lg">
        <TopBar />
      </Container>
    </AppBar>

    <Container maxWidth="lg">{children}</Container>
  </>
);

export default AppLayout;
