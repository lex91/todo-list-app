import React from 'react';
import { Typography, Toolbar, Box, makeStyles } from '@material-ui/core';

import NetworkStatus from 'components/NetworkStatus';
import ListsSync from 'components/ListsSync';

interface IProps {}

const TopBar: React.FC<IProps> = () => {
  const classes = useStyles();

  return (
    <Toolbar>
      <Typography variant="h4">TODO List Application</Typography>
      <div className={classes.grow} />
      <Box className={classes.toolbarItem}>
        <ListsSync />
      </Box>
      <Box className={classes.toolbarItem}>
        <NetworkStatus />
      </Box>
      <Box className={classes.toolbarItem}>
        <Typography>Login, etc</Typography>
      </Box>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  toolbarItem: {
    marginLeft: theme.spacing(2),
  },
}));

export default TopBar;
