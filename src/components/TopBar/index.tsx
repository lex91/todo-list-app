import React from 'react';
import { Typography, Toolbar, Box, makeStyles } from '@material-ui/core';
import NetworkStatus from 'components/NetworkStatus';

interface IProps {}

const TopBar: React.FC<IProps> = () => {
  const classes = useStyles();
  return (
    <Toolbar>
      <Typography variant="h4">TODO List Application</Typography>
      <div className={classes.grow} />
      <Typography>Login, etc</Typography>
      <Box className={classes.networkStatus}>
        <NetworkStatus />
      </Box>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  networkStatus: {
    marginLeft: theme.spacing(2),
  },
}));

export default TopBar;
