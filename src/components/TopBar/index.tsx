import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';

interface IProps {}

const TopBar: React.FC<IProps> = () => (
  <Grid container justify="space-between">
    <Grid item>
      <Typography variant="h4">TODO List Application</Typography>
    </Grid>
    <Grid item>
      <Box style={{ display: 'inline-block' }}>
        <Typography>Login, etc</Typography>
      </Box>
    </Grid>
  </Grid>
);

export default TopBar;
