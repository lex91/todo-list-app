import React from 'react';
import { Grid, ListItem, Typography } from '@material-ui/core';

interface IProps {
  id: string;
  status: React.ReactNode;
}

const ListStatusItem: React.FC<IProps> = ({ id, status }) => (
  <ListItem component="div" divider>
    <Grid container spacing={1} alignItems="center" justify="space-between">
      <Grid item>
        <Typography variant="h5" display="inline">
          {id}
        </Typography>
      </Grid>
      <Grid item>{status}</Grid>
    </Grid>
  </ListItem>
);

export default ListStatusItem;
