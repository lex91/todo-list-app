import React from 'react';
import { AppBar, Container, Toolbar } from '@material-ui/core';

interface IProps {
  topBar: React.ReactNode;
  content: React.ReactNode;
}

const AppLayout: React.FC<IProps> = ({ topBar, content }) => (
  <>
    <AppBar color="primary" position="sticky">
      <Container maxWidth="lg">
        <Toolbar>{topBar}</Toolbar>
      </Container>
    </AppBar>

    <Container maxWidth="lg">{content}</Container>
  </>
);

export default AppLayout;
