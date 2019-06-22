import React from 'react';
import { Wifi, WifiOff } from '@material-ui/icons';
import { Button, makeStyles, Typography } from '@material-ui/core';

interface IProps {
  isOnline: boolean;
  onReconnect(): void;
}

const NetworkStatusComponent: React.FC<IProps> = ({ isOnline, onReconnect }) => {
  const classes = useStyles();

  return isOnline ? (
    <Wifi htmlColor="#00ff00" />
  ) : (
    <Button variant="contained" color="secondary" onClick={onReconnect}>
      <WifiOff />
      <Typography className={classes.buttonText}>reconnect</Typography>
    </Button>
  );
};

const useStyles = makeStyles(theme => ({
  buttonText: {
    marginLeft: theme.spacing(1),
  },
}));

export default NetworkStatusComponent;
